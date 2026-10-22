import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import SetupTool from "./tools/SetupTool";

/**
 * The NeuroFlutter editorial dashboard.
 *
 * Project id and dataset are public identifiers, not secrets — they appear in
 * the website's HTML too. Who may read and write is controlled by the people
 * invited to the Sanity project, not by anything in this file.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "neuroflutter",
  title: "NeuroFlutter",
  projectId,
  dataset,
  // The Studio is served from neuroflutter.com/studio.
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2026-01-01" }),
    {
      name: "neuroflutter-setup",
      tools: [
        {
          name: "setup",
          title: "Set up",
          component: SetupTool,
        },
      ],
    },
  ],
  schema: { types: schemaTypes },
  document: {
    // Site settings is a single document, so it should not be duplicated or
    // deleted by accident.
    actions: (prev, { schemaType }) =>
      schemaType === "siteSettings"
        ? prev.filter(({ action }) => action !== "duplicate" && action !== "delete")
        : prev,
  },
});
