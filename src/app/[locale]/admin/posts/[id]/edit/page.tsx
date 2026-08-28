import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getPostById } from "@/db/queries";
import { updatePost } from "@/lib/actions";
import { PostForm, type PostInitial } from "@/components/admin/post-form";

export const dynamic = "force-dynamic";

export default async function EditPost({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const postId = Number(id);
  if (!Number.isInteger(postId)) notFound();

  const post = await getPostById(postId);
  if (!post) notFound();

  const initial: PostInitial = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    tag: post.tag,
    image: post.image ?? "",
    published: post.published,
    sortOrder: post.sortOrder,
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to guides
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
        Edit: {post.title}
      </h1>
      <div className="mt-6">
        <PostForm
          action={updatePost.bind(null, postId)}
          initial={initial}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
