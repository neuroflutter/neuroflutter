import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  project: {
    basePath: "/studio",
  },
  deployment: {
    autoUpdates: false,
  },
  vite: (config) => ({
    ...config,
    // The built dashboard is served from neuroflutter.com/studio, so every
    // asset and lazily-loaded chunk must be addressed from there too.
    base: "/studio/",
  }),
});
