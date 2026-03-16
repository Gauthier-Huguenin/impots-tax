export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://impots.tax",
  domain: "impots.tax",
  social: {
    github: "https://github.com/gauthier-huguenin/impots-tax",
    x: "https://x.com/leploutos",
  },
} as const;
