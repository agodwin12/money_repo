import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { createPost } from "@/lib/actions";
import { PostForm } from "@/components/admin/post-form";

export const dynamic = "force-dynamic";

export default async function NewPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to guides
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">New guide</h1>
      <div className="mt-6">
        <PostForm action={createPost} submitLabel="Create guide" />
      </div>
    </div>
  );
}
