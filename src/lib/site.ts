export const site = {
  name: "NeuroFlutter",
  tagline: "Transforming minds, stage by stage.",
  /** One-line entity description, reused in metadata and structured data. */
  description:
    "NeuroFlutter is a neuroscience publication and platform, sharing accessible writing, research perspectives and illustration about the brain.",
  /** Short form for structured data. */
  shortDescription:
    "NeuroFlutter is a neuroscience publication and platform.",
  /** The apex domain is canonical: www.neuroflutter.com redirects to it. */
  url: "https://neuroflutter.com",
  email: "neuroflutter@outlook.com",
  nav: [
    { label: "About", href: "/about/" },
    { label: "Learn", href: "/learn/" },
    { label: "Contribute", href: "/contribute/" },
  ],
  social: [
    {
      label: "Email",
      href: "mailto:neuroflutter@outlook.com",
      icon: "/icons/icon-mail.webp",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/neuroflutter/",
      icon: "/icons/icon-instagram.webp",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/neuroflutter",
      icon: "/icons/icon-linkedin.webp",
    },
  ],
  /** Mailing list runs on Resend; the signup posts to /api/subscribe. */
  newsletterProvider: "Resend",
  /** Official profiles, used for schema.org sameAs. */
  sameAs: [
    "https://www.instagram.com/neuroflutter/",
    "https://www.linkedin.com/company/neuroflutter",
  ],
};
