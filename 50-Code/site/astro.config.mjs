import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// Vercel's serverless adapter receives the public Host via trusted forwarded
// headers. Whitelisting Vercel preview hosts lets Astro reconstruct the real
// request origin and keeps its built-in CSRF origin check enabled.
export default defineConfig({
  output: "static",
  adapter: vercel(),
  trailingSlash: "always",
  security: {
    checkOrigin: true,
    allowedDomains: [{ hostname: "*.vercel.app", protocol: "https" }],
  },
});
