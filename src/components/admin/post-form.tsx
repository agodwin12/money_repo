import { Link } from "@/i18n/navigation";
import { ImageUpload } from "@/components/admin/image-upload";

export type PostInitial = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tag: string;
  image: string;
  published: boolean;
  sortOrder: number;
};

const EMPTY: PostInitial = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  tag: "Guide",
  image: "",
  published: true,
  sortOrder: 0,
};

const labelCls = "block text-sm font-medium text-foreground";
const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

export function PostForm({
  action,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: PostInitial;
  submitLabel: string;
}) {
  const v = initial ?? EMPTY;

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className={labelCls}>
            Title *
          </label>
          <input id="title" name="title" required defaultValue={v.title} className={inputCls} />
        </div>

        <div>
          <label htmlFor="tag" className={labelCls}>
            Tag
          </label>
          <input
            id="tag"
            name="tag"
            defaultValue={v.tag}
            placeholder="Guide, Security, Maintenance…"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="slug" className={labelCls}>
            Slug (optional)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={v.slug}
            placeholder="auto-generated"
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="excerpt" className={labelCls}>
            Excerpt (shown on homepage)
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            defaultValue={v.excerpt}
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="content" className={labelCls}>
            Content (optional, full article)
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            defaultValue={v.content}
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          <ImageUpload
            name="image"
            defaultValue={v.image}
            folder="posts"
            label="Cover image"
            hint="Upload from your computer or phone. Leave empty to use a default illustration."
          />
        </div>

        <div>
          <label htmlFor="sortOrder" className={labelCls}>
            Sort order
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={v.sortOrder}
            className={inputCls}
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              defaultChecked={v.published}
              className="h-4 w-4 rounded border-border text-primary focus:ring-ring/30"
            />
            <span className="text-sm font-medium text-foreground">
              Published (visible on homepage)
            </span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/posts"
          className="inline-flex items-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
