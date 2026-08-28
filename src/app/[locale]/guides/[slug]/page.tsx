import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPostBySlug, getPublishedPosts } from "@/db/queries";

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const t = await getTranslations("Guides");
  const others = (await getPublishedPosts(4)).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24 pt-8">
        <Container>
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>

          <article className="mx-auto mt-6 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              {post.tag}
            </span>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
            )}

            {post.image && (
              <div className="mt-8 overflow-hidden rounded-[2rem] border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} className="w-full object-cover" />
              </div>
            )}

            {post.content && (
              <div className="mt-8 whitespace-pre-line text-base leading-relaxed text-foreground/90">
                {post.content}
              </div>
            )}
          </article>
        </Container>

        {/* More guides */}
        {others.length > 0 && (
          <Container className="pt-20">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t("more")}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`/guides/${p.slug}`}
                  className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-foreground group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
