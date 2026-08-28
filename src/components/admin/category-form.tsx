import { Link } from "@/i18n/navigation";
import { ImageUpload } from "@/components/admin/image-upload";

export type CategoryInitial = {
  name: string;
  slug: string;
  kind: string;
  tint: string;
  image: string;
  sortOrder: number;
};

const KINDS = ["counter", "detector", "coin", "scale", "pen", "multi"];
const TINTS = ["blue", "lavender", "mint", "peach"];

const labelCls = "block text-sm font-medium text-foreground";
const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

export function CategoryForm({
  action,
  initial,
  submitLabel,
  compact = false,
}: {
  action: (formData: FormData) => Promise<void>;
  initial?: CategoryInitial;
  submitLabel: string;
  compact?: boolean;
}) {
  const v =
    initial ?? { name: "", slug: "", kind: "counter", tint: "blue", image: "", sortOrder: 0 };

  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelCls}>
          Name *
        </label>
        <input id="name" name="name" required defaultValue={v.name} className={inputCls} />
      </div>
      <div>
        <label htmlFor="slug" className={labelCls}>
          Slug (optional)
        </label>
        <input
          id="slug"
          name="slug"
          defaultValue={v.slug}
          placeholder="auto"
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="kind" className={labelCls}>
          Illustration
        </label>
        <select id="kind" name="kind" defaultValue={v.kind} className={inputCls}>
          {KINDS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="tint" className={labelCls}>
          Card tint
        </label>
        <select id="tint" name="tint" defaultValue={v.tint} className={inputCls}>
          {TINTS.map((tn) => (
            <option key={tn} value={tn}>
              {tn}
            </option>
          ))}
        </select>
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

      <div className="sm:col-span-2">
        <ImageUpload
          name="image"
          defaultValue={v.image}
          folder="categories"
          label="Category image"
          hint="Shown on the storefront category cards. Leave empty to use the illustration."
        />
      </div>

      <div className="flex items-end gap-3 sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          {submitLabel}
        </button>
        {!compact && (
          <Link
            href="/admin/categories"
            className="inline-flex items-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}
