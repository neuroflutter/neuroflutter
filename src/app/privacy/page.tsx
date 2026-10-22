import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How NeuroFlutter handles the personal information you give us through the mailing list, contributor proposals and enquiries.",
  alternates: { canonical: "/privacy/" },
};

/** Shown at the top of the notice. Update when the notice itself changes. */
const lastUpdated = "20 October 2026";

export default function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="What we collect, and what we do with it."
        intro="How NeuroFlutter handles personal information when you visit the website, join the mailing list, propose an article or get in touch."
      />

      <section className="mx-auto max-w-[44rem] px-6 pb-24">
        <div className="prose-nf">
          <p className="text-[0.92rem] text-ink-soft">
            Last updated: {lastUpdated}
          </p>

          <h2>1. About NeuroFlutter</h2>
          <p>
            NeuroFlutter is a neuroscience publication and collaborative
            learning initiative founded by Hala Al Masri. It is not a registered
            company: it is operated by its founder as an individual, and Hala Al
            Masri is the data controller for the personal information described
            in this notice.
          </p>
          <p>
            We are committed to respecting your privacy and being transparent
            about how your personal information is collected, used and
            protected. This notice explains how we handle personal information
            when you visit our website, subscribe to our mailing list, contact
            us or submit a proposal to NeuroFlutter Learn.
          </p>
          <p>
            For privacy-related questions, please contact{" "}
            <a href="mailto:neuroflutter@outlook.com">neuroflutter@outlook.com</a>
            . Our website is <a href="https://neuroflutter.com">neuroflutter.com</a>.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Mailing-list information</h3>
          <p>
            When you subscribe, we collect your email address and the date you
            consented. Kit, the service we use to manage the mailing list, also
            records your subscription status, whether you confirmed your
            address, and whether our emails were opened or their links clicked.
          </p>

          <h3>Contributor information</h3>
          <p>
            When you propose an article, we collect what you choose to send us.
            That normally includes your name, email address, your proposed
            article title, the neuroscience topic and type of article, a summary
            of your idea, and — if you provide them — your affiliation, a short
            biography and any relevant links or references.
          </p>
          <p>
            If your work is accepted for publication, we will also collect the
            author information you want shown alongside it: your biography,
            professional role, research interests and any links you choose to
            share.
          </p>

          <h3>Enquiries and correspondence</h3>
          <p>
            When you email us, we keep your message, your contact details and
            our correspondence with you so that we can reply and keep track of
            the discussion.
          </p>

          <h3>Technical information</h3>
          <p>
            The website is served by Netlify, which processes limited technical
            information in order to deliver the site and keep it secure —
            including your IP address, your browser and device type, and the
            pages requested. We do not use this information to identify or
            profile individual visitors.
          </p>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To send newsletters and NeuroFlutter updates to people who have subscribed.</li>
            <li>To review article proposals.</li>
            <li>To communicate with prospective and existing contributors.</li>
            <li>To manage editorial decisions and publication arrangements.</li>
            <li>To publish author information where you have agreed to it.</li>
            <li>To respond to questions and enquiries.</li>
            <li>To maintain the website&apos;s functionality and security.</li>
            <li>To meet applicable legal obligations.</li>
          </ul>
          <p>
            Proposing an article does not subscribe you to our emails. We will
            not add contributors to the mailing list without their separate
            consent.
          </p>

          <h2>4. Our Legal Basis for Processing</h2>
          <p>
            Under the UK General Data Protection Regulation we must have a
            lawful basis for using personal information. Depending on the
            activity, ours are:
          </p>
          <h3>Consent</h3>
          <p>
            We rely on your consent to send you NeuroFlutter newsletters and
            updates. You can withdraw it at any time using the unsubscribe link
            in any of our emails, or by contacting us.
          </p>
          <h3>Legitimate interests</h3>
          <p>
            We rely on legitimate interests to reply to enquiries, to assess
            article proposals that have been sent to us voluntarily, to manage
            editorial correspondence and to keep the website secure. Our
            interests are in running a responsible neuroscience publication and
            communicating with the people who write for it; we take your rights
            into account when we rely on this basis, and you can object to it.
          </p>
          <h3>Contract</h3>
          <p>
            Where we agree terms with a contributor, we process their
            information as necessary to manage that agreement and publish their
            work.
          </p>
          <h3>Legal obligations</h3>
          <p>
            We may process or keep certain information where the law requires
            it.
          </p>

          <h2>5. Newsletter Subscriptions</h2>
          <p>
            If you join the NeuroFlutter mailing list, we use your information
            to send occasional updates: newly published articles, opportunities
            to contribute to NeuroFlutter Learn, and NeuroFlutter news and
            announcements. You can unsubscribe at any time, and we never sell or
            rent your address.
          </p>
          <p>
            Subscriptions are managed and emails are sent by{" "}
            <a href="https://kit.com">Kit</a>, an email marketing platform,
            which stores subscriber information on our behalf. Kit&apos;s own
            privacy information is at{" "}
            <a href="https://kit.com/privacy">kit.com/privacy</a>.
          </p>
          <p>
            We keep your subscription for as long as you remain subscribed. If
            you unsubscribe, we keep the minimum record needed to make sure we
            do not email you again.
          </p>

          <h2>6. Contributor Submissions and Published Biographies</h2>
          <p>
            When you propose an article, we use what you send to review your
            idea and reply to you. Proposing does not guarantee publication.
          </p>
          <p>
            The proposal form on our Contribute page is not yet connected to a
            submission service, so at the moment proposals reach us by email. If
            that changes, we will name the provider in this notice before the
            form goes live.
          </p>
          <p>
            If your contribution is accepted, we will agree the final article,
            your author credit and your biography with you before it is
            published. A published author profile may include your name, role,
            affiliation, biography, research interests and any links you have
            chosen to share, and it stays available for as long as your work
            remains published, subject to your data protection rights and
            anything we have agreed with you.
          </p>
          <p>
            To correct something published about you, or to discuss it, email{" "}
            <a href="mailto:neuroflutter@outlook.com">neuroflutter@outlook.com</a>.
          </p>

          <h2>7. How We Share and Store Information</h2>
          <p>
            We use a small number of service providers to run the website and
            our mailing list. They process personal information on our behalf,
            for the purposes described in this notice and nothing else:
          </p>
          <ul>
            <li>
              <strong>Netlify</strong> hosts the website and serves its pages
              (technical and security information).
            </li>
            <li>
              <strong>Kit</strong> manages mailing-list subscriptions and sends
              our emails (subscriber information).
            </li>
            <li>
              <strong>Microsoft</strong> provides the Outlook mailbox that
              receives our enquiries and article proposals (your messages and
              contact details).
            </li>
          </ul>
          <p>
            We do not use analytics or advertising services, and we do not sell
            or rent contributor or subscriber information to anyone. Access to
            submissions and subscriber information is limited to NeuroFlutter&apos;s
            editorial work, and we take reasonable steps to keep it secure.
          </p>

          <h2>8. International Data Transfers</h2>
          <p>
            Netlify and Kit are based in the United States, and Microsoft
            operates internationally, so some of your personal information is
            processed outside the United Kingdom.
          </p>
          <p>
            Where that happens, we rely on the data protection terms each
            provider publishes for its own international transfers rather than
            on arrangements of our own. If you would like the current details of
            the safeguards that apply to a particular provider, email{" "}
            <a href="mailto:neuroflutter@outlook.com">neuroflutter@outlook.com</a>{" "}
            and we will point you to them.
          </p>

          <h2>9. How Long We Keep Your Information</h2>
          <ul>
            <li>
              <strong>Mailing-list subscriptions:</strong> while you remain
              subscribed, plus the minimum record needed to honour an
              unsubscribe.
            </li>
            <li>
              <strong>Proposals we do not publish:</strong> normally up to 12
              months after we have given you a final answer, then deleted.
            </li>
            <li>
              <strong>Contributor correspondence:</strong> normally up to 12
              months after the discussion has finished, unless there is a reason
              to keep it longer.
            </li>
            <li>
              <strong>Published author information:</strong> for as long as the
              work remains published.
            </li>
            <li>
              <strong>Technical and security information:</strong> according to
              the retention periods of our hosting provider.
            </li>
          </ul>

          <h2>10. Your Data Protection Rights</h2>
          <p>Depending on the circumstances, you have the right to:</p>
          <ul>
            <li>Ask for a copy of the personal information we hold about you.</li>
            <li>Ask us to correct anything inaccurate.</li>
            <li>Ask us to delete your information.</li>
            <li>Ask us to restrict how we use it.</li>
            <li>Object to certain uses of it.</li>
            <li>Ask us to transfer it to you or someone else, where that applies.</li>
            <li>Withdraw your consent where we rely on consent.</li>
          </ul>
          <p>
            You can object to the use of your personal information for direct
            marketing at any time. To make any of these requests, email{" "}
            <a href="mailto:neuroflutter@outlook.com">neuroflutter@outlook.com</a>.
          </p>
          <p>
            You also have the right to complain to the Information
            Commissioner&apos;s Office, the UK&apos;s data protection regulator,
            at <a href="https://ico.org.uk">ico.org.uk</a>.
          </p>

          <h2>11. Cookies and Website Analytics</h2>
          <p>
            This website sets no cookies of its own, and we use no analytics,
            advertising or tracking services.
          </p>
          <p>
            The mailing-list signup on our home page is provided by Kit. Kit&apos;s
            script is currently loaded on every page of the site, and it stores
            a single identifier — named <code>ckid</code> — in your browser&apos;s
            local storage so that it can recognise the signup form and the
            visitor using it. Nothing else is stored on your device, and that
            identifier is not used for advertising.
          </p>

          <h2>12. Updates to This Notice</h2>
          <p>
            We may update this notice when our services, the technology we use
            or our data-handling practices change. When we do, we will change
            the date shown at the top of this page.
          </p>

          <h2>13. Contact</h2>
          <p>
            NeuroFlutter
            <br />
            Email:{" "}
            <a href="mailto:neuroflutter@outlook.com">neuroflutter@outlook.com</a>
            <br />
            Website: <a href="https://neuroflutter.com">neuroflutter.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
