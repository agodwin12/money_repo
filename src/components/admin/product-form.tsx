import { Link } from "@/i18n/navigation";
import type { Category } from "@/db/schema";
import { ImageUpload } from "@/components/admin/image-upload";

export type ProductInitial = {
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: number | "";
  image: string;
  rating: number;
  reviews: number;
  badge: string;
  stock: number;
  featured: boolean;
  status: string;
};

const EMPTY: ProductInitial = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  categoryId: "",
  image: "",
  rating: 4.5,
  reviews: 0,
  badge: "",
  stock: 0,
  featured: false,
  status: "active",
};

const labelCls = "block text-sm font-medium text-foreground";
const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

export function ProductForm({
  action,
  categories,
  initial,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  categories: Category[];
  initial?: ProductInitial;
  submitLabel: string;
}) {
  const v = initial ?? EMPTY;

  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelCls}>
            Product name *
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
            placeholder="auto-generated from name"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="categoryId" className={labelCls}>
            Category *
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={v.categoryId === "" ? "" : String(v.categoryId)}
            className={inputCls}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className={labelCls}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={v.description}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="price" className={labelCls}>
            Price (EUR) *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={v.price}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="stock" className={labelCls}>
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={v.stock}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="rating" className={labelCls}>
            Rating (0–5)
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            defaultValue={v.rating}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="reviews" className={labelCls}>
            Reviews count
          </label>
          <input
            id="reviews"
            name="reviews"
            type="number"
            min="0"
            defaultValue={v.reviews}
            className={inputCls}
          />
        </div>

        <div className="sm:col-span-2">
          <ImageUpload
            name="image"
            defaultValue={v.image}
            label="Product image"
            hint="Upload from your computer or phone. Leave empty to use the category illustration."
          />
        </div>

        <div>
          <label htmlFor="badge" className={labelCls}>
            Badge
          </label>
          <select id="badge" name="badge" defaultValue={v.badge} className={inputCls}>
            <option value="">None</option>
            <option value="new">New</option>
            <option value="bestseller">Best seller</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className={labelCls}>
            Status
          </label>
          <select id="status" name="status" defaultValue={v.status} className={inputCls}>
            <option value="active">Active (visible)</option>
            <option value="draft">Draft (hidden)</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={v.featured}
              className="h-4 w-4 rounded border-border text-primary focus:ring-ring/30"
            />
            <span className="text-sm font-medium text-foreground">
              Featured on homepage
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
          href="/admin/products"
          className="inline-flex items-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
