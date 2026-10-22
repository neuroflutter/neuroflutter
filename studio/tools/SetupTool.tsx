import { useCallback, useMemo, useState } from "react";
import { Box, Button, Card, Flex, Heading, Stack, Text } from "@sanity/ui";
import { useClient } from "sanity";
import legacy from "../legacy-content.json";
import { CATEGORY_TITLES } from "../schemas/category";

type Line = { text: string; tone: "default" | "positive" | "critical" };

const SITE_FALLBACK = "https://neuroflutter.com";

/** Stable ids, so running the import twice never creates duplicates. */
const categoryId = (title: string) =>
  `category-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
const authorId = (id: string) => `author-${id}`;
const articleId = (slug: string) => `article-${slug}`;

export default function SetupTool() {
  const client = useClient({ apiVersion: "2026-01-01" });
  const [lines, setLines] = useState<Line[]>([]);
  const [running, setRunning] = useState(false);

  const say = useCallback(
    (text: string, tone: Line["tone"] = "default") =>
      setLines((prev) => [...prev, { text, tone }]),
    [],
  );

  // When the Studio is served from the website itself, the illustrations are
  // on the same origin and fetch just works.
  const assetBase = useMemo(() => {
    if (typeof window === "undefined") return SITE_FALLBACK;
    return window.location.origin.includes("localhost")
      ? SITE_FALLBACK
      : window.location.origin;
  }, []);

  const run = useCallback(async () => {
    setRunning(true);
    setLines([]);
    try {
      /* ---------------------------------------------------- categories */
      say("Creating the six Learn categories…");
      for (let i = 0; i < CATEGORY_TITLES.length; i++) {
        const title = CATEGORY_TITLES[i];
        await client.createIfNotExists({
          _id: categoryId(title),
          _type: "category",
          title,
          slug: { _type: "slug", current: title.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
          order: i + 1,
        });
      }
      say(`${CATEGORY_TITLES.length} categories ready.`, "positive");

      /* ------------------------------------------------------- authors */
      for (const a of legacy.authors) {
        say(`Creating contributor profile: ${a.name}…`);
        await client.createIfNotExists({
          _id: authorId(a.id),
          _type: "author",
          name: a.name,
          // Keeps the existing page address /authors/hala/ exactly as it is.
          slug: { _type: "slug", current: a.id },
          role: a.role,
          affiliation: a.affiliation || undefined,
          bio: a.bio,
          researchInterests: a.researchInterests,
          links: a.links.map((l, i) => ({ _key: `link${i}`, _type: "link", ...l })),
        });
      }
      say(`${legacy.authors.length} contributor profile(s) ready.`, "positive");

      /* ------------------------------------------------------ articles */
      for (const art of legacy.articles) {
        const existing = await client.fetch(`*[_id == $id][0]._id`, { id: articleId(art.slug) });
        if (existing) {
          say(`"${art.title}" is already in Sanity — left untouched.`);
          continue;
        }

        say(`Uploading the image for "${art.title}"…`);
        const res = await fetch(`${assetBase}${art.imagePath}`);
        if (!res.ok) throw new Error(`Could not download ${art.imagePath} (${res.status})`);
        const blob = await res.blob();
        const asset = await client.assets.upload("image", blob, {
          filename: art.imagePath.split("/").pop(),
        });

        say(`Creating "${art.title}"…`);
        await client.createIfNotExists({
          _id: articleId(art.slug),
          _type: "article",
          title: art.title,
          slug: { _type: "slug", current: art.slug },
          standfirst: art.standfirst,
          kind: art.kind,
          category: { _type: "reference", _ref: categoryId(art.category) },
          author: { _type: "reference", _ref: authorId(art.authorId) },
          publishedAt: art.publishedAt,
          readingMinutes: art.readingMinutes,
          mainImage: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
            alt: art.imageAlt,
            credit: art.imageCredit || undefined,
          },
          featured: art.featured,
          body: art.body,
          references: art.references.map((r, i) => ({
            _key: `ref${i}`,
            _type: "citation",
            ...r,
          })),
          editorial: { status: "approved", submittedVia: "direct" },
        });
        say(`"${art.title}" created.`, "positive");
      }

      say("Done. Everything above is now editable under Articles.", "positive");
      say(
        "The website will show the Sanity version of these articles the next time it is rebuilt. The text and addresses are identical, so nothing visible changes.",
      );
    } catch (error) {
      say(`Stopped: ${(error as Error).message}`, "critical");
      say("Nothing was half-written — run it again once the problem is fixed.");
    } finally {
      setRunning(false);
    }
  }, [client, say, assetBase]);

  return (
    <Box padding={5} style={{ maxWidth: 760 }}>
      <Stack space={5}>
        <Stack space={3}>
          <Heading size={3}>Set up</Heading>
          <Text muted size={1}>
            One-off jobs. You will probably use this page once and never again.
          </Text>
        </Stack>

        <Card padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Heading size={1}>Bring the existing website content into Sanity</Heading>
            <Text size={1} muted>
              Creates the six Learn categories, your contributor profile, and the two
              articles already published on neuroflutter.com — with their images and
              their existing web addresses. After this you can edit them here instead
              of in code.
            </Text>
            <Text size={1} muted>
              Safe to press more than once: anything that already exists is left alone.
            </Text>
            <Flex>
              <Button
                text={running ? "Working…" : "Import existing content"}
                tone="primary"
                disabled={running}
                onClick={run}
              />
            </Flex>
          </Stack>
        </Card>

        {lines.length > 0 && (
          <Card padding={4} radius={2} tone="transparent">
            <Stack space={3}>
              {lines.map((l, i) => (
                <Text key={i} size={1} muted={l.tone === "default"}>
                  {l.tone === "positive" ? "✓ " : l.tone === "critical" ? "✕ " : "· "}
                  {l.text}
                </Text>
              ))}
            </Stack>
          </Card>
        )}

        <Card padding={4} radius={2} tone="transparent">
          <Stack space={3}>
            <Heading size={1}>Where things appear</Heading>
            <Text size={1} muted>
              Live site: neuroflutter.com
            </Text>
            <Text size={1} muted>
              Publishing an article here does not change the live site on its own —
              the site rebuilds itself a minute or two afterwards, then the article
              appears.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
