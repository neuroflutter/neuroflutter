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
  /**
   * Kit (kit.com) form action URL, taken from the form's HTML embed code.
   * Looks like https://app.kit.com/forms/<form-id>/subscriptions
   * While it is empty the signup stays visibly inactive rather than
   * silently discarding addresses.
   */
  newsletterEndpoint:
    process.env.NEXT_PUBLIC_KIT_FORM_ACTION ??
    "https://app.kit.com/forms/10064287/subscriptions",
  /** From the Kit embed code. Both are public identifiers, not secrets. */
  kitFormId: "10064287",
  kitFormUid: "294836c225",
  newsletterProvider: "Kit",
  /** Official profiles, used for schema.org sameAs. */
  sameAs: [
    "https://www.instagram.com/neuroflutter/",
    "https://www.linkedin.com/company/neuroflutter",
  ],
};
