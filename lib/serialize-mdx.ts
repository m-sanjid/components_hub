
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export async function serializeMdx(code: string) {
  return await serialize(code, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
  });
}
