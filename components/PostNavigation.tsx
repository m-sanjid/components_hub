import Link from "next/link";
import MotionDiv from "@/components/MotionDiv";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface NavItem {
  slug: string;
  title: string;
}

interface PostNavigationProps {
  prevPost: NavItem | null;
  nextPost: NavItem | null;
  basePath: "components" | "blog" | "templates";
}

export default function PostNavigation({
  prevPost,
  nextPost,
  basePath,
}: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12 border-t pt-8 sm:mt-16 sm:pt-12"
      aria-label="Post navigation"
    >
      <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
        {prevPost ? (
          <Link
            href={`/${basePath}/${prevPost.slug}`}
            className="group bg-background/50 hover:border-primary/20 hover:bg-muted/50 flex flex-1 items-center gap-3 rounded-lg border p-4 transition-all duration-200"
          >
            <IconArrowLeft className="bg-primary/5 text-muted-foreground group-hover:text-foreground size-6 shrink-0 rounded-md border p-1 backdrop-blur-md transition-all duration-200 ease-in-out group-hover:-translate-x-1" />
            <div className="flex flex-col overflow-hidden">
              <span className="text-muted-foreground text-xs no-underline">
                Previous
              </span>
              <span className="text-foreground group-hover:text-primary flex flex-wrap text-sm font-medium">
                {prevPost.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block sm:flex-1" />
        )}

        {nextPost && (
          <Link
            href={`/${basePath}/${nextPost.slug}`}
            className="group bg-background/50 hover:border-primary/20 hover:bg-muted/50 flex flex-1 items-center justify-end gap-3 rounded-lg border p-4 text-right transition-all duration-200"
          >
            <div className="flex flex-col overflow-hidden">
              <span className="text-muted-foreground text-xs">Next</span>
              <span className="text-foreground group-hover:text-primary flex flex-wrap text-sm font-medium">
                {nextPost.title}
              </span>
            </div>
            <IconArrowRight className="bg-primary/5 text-muted-foreground group-hover:text-foreground size-6 shrink-0 rounded-md border p-1 backdrop-blur-md transition-all duration-200 ease-in-out group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </MotionDiv>
  );
}
