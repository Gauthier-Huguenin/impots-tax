declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { BlogPostMetadata } from "@/lib/blog";

  export const metadata: BlogPostMetadata;
  const MDXContent: ComponentType;
  export default MDXContent;
}
