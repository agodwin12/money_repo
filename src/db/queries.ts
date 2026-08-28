import { and, or, eq, ilike, desc, asc, gte, lte, gt } from "drizzle-orm";
import { db } from "./index";
import { categories, products, posts, orders, contactMessages } from "./schema";
import type { Category, Product, Post, Order, OrderItem, ContactMessage } from "./schema";

export type ProductVM = {
  id: number;
  slug: string;
  name: string;
  description: string;
  /** Price in dollars. */
  price: number;
  image: string | null;
  rating: number;
  reviews: number;
  badge: string | null;
  stock: number;
  featured: boolean;
  status: string;
  category: {
    id: number;
    slug: string;
    name: string;
    kind: string;
    tint: string;
  };
};

type Row = Product & { category: Category };

function toVM(row: Row): ProductVM {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: row.priceCents / 100,
    image: row.image,
    rating: row.ratingTenths / 10,
    reviews: row.reviews,
    badge: row.badge,
    stock: row.stock,
    featured: row.featured,
    status: row.status,
    category: {
      id: row.category.id,
      slug: row.category.slug,
      name: row.category.name,
      kind: row.category.kind,
      tint: row.category.tint,
    },
  };
}

/** All categories, ordered for display. */
export async function getCategories(): Promise<Category[]> {
  return db.query.categories.findMany({
    orderBy: (c) => [asc(c.sortOrder), asc(c.name)],
  });
}

/** Products for the homepage — featured first, falls back to latest active. */
export async function getFeaturedProducts(limit = 8): Promise<ProductVM[]> {
  const featured = await db.query.products.findMany({
    where: (p) => and(eq(p.status, "active"), eq(p.featured, true)),
    with: { category: true },
    orderBy: (p) => [desc(p.createdAt)],
    limit,
  });
  if (featured.length >= 4) return featured.map(toVM);

  const latest = await db.query.products.findMany({
    where: (p) => eq(p.status, "active"),
    with: { category: true },
    orderBy: (p) => [desc(p.featured), desc(p.createdAt)],
    limit,
  });
  return latest.map(toVM);
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

/** Storefront catalog with category, search, price, stock, and sort filters. */
export async function getStoreProducts(opts: {
  categorySlug?: string;
  q?: string;
  /** Price bounds in dollars. */
  min?: number;
  max?: number;
  inStock?: boolean;
  sort?: SortKey;
} = {}): Promise<ProductVM[]> {
  const { categorySlug, q, min, max, inStock, sort = "featured" } = opts;

  let categoryId: number | undefined;
  if (categorySlug && categorySlug !== "all") {
    const cat = await db.query.categories.findFirst({
      where: (c) => eq(c.slug, categorySlug),
    });
    if (!cat) return [];
    categoryId = cat.id;
  }

  const rows = await db.query.products.findMany({
    where: (p) => {
      const conds = [eq(p.status, "active")];
      if (categoryId) conds.push(eq(p.categoryId, categoryId));
      if (q && q.trim()) {
        const term = `%${q.trim()}%`;
        conds.push(or(ilike(p.name, term), ilike(p.description, term))!);
      }
      if (typeof min === "number") conds.push(gte(p.priceCents, Math.round(min * 100)));
      if (typeof max === "number") conds.push(lte(p.priceCents, Math.round(max * 100)));
      if (inStock) conds.push(gt(p.stock, 0));
      return and(...conds);
    },
    with: { category: true },
    orderBy: (p) => {
      switch (sort) {
        case "price-asc":
          return [asc(p.priceCents)];
        case "price-desc":
          return [desc(p.priceCents)];
        case "rating":
          return [desc(p.ratingTenths)];
        default:
          return [desc(p.featured), desc(p.createdAt)];
      }
    },
  });

  return rows.map(toVM);
}

export async function getProductBySlug(slug: string): Promise<ProductVM | null> {
  const row = await db.query.products.findFirst({
    where: (p) => eq(p.slug, slug),
    with: { category: true },
  });
  return row ? toVM(row as Row) : null;
}

/** Other active products in the same category (excludes the given product). */
export async function getRelatedProducts(
  categoryId: number,
  excludeId: number,
  limit = 4
): Promise<ProductVM[]> {
  const rows = await db.query.products.findMany({
    where: (p) => and(eq(p.status, "active"), eq(p.categoryId, categoryId)),
    with: { category: true },
    orderBy: (p) => [desc(p.featured), desc(p.createdAt)],
  });
  return rows.filter((r) => r.id !== excludeId).slice(0, limit).map((r) => toVM(r as Row));
}

/* ---------- Admin (all statuses) ---------- */

export async function getAllProducts(): Promise<ProductVM[]> {
  const rows = await db.query.products.findMany({
    with: { category: true },
    orderBy: (p) => [desc(p.createdAt)],
  });
  return rows.map(toVM);
}

export async function getProductById(id: number): Promise<Row | null> {
  const row = await db.query.products.findFirst({
    where: (p) => eq(p.id, id),
    with: { category: true },
  });
  return (row as Row) ?? null;
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const row = await db.query.categories.findFirst({
    where: (c) => eq(c.id, id),
  });
  return row ?? null;
}

/* ---------- contact messages (admin inbox) ---------- */

export async function getContactMessages(): Promise<ContactMessage[]> {
  return db.query.contactMessages.findMany({
    orderBy: (m) => [desc(m.createdAt)],
  });
}

/* ---------- posts (guides & insights) ---------- */

/** Published guides for the homepage. */
export async function getPublishedPosts(limit = 3): Promise<Post[]> {
  return db.query.posts.findMany({
    where: (p) => eq(p.published, true),
    orderBy: (p) => [asc(p.sortOrder), desc(p.createdAt)],
    limit,
  });
}

export async function getAllPosts(): Promise<Post[]> {
  return db.query.posts.findMany({
    orderBy: (p) => [asc(p.sortOrder), desc(p.createdAt)],
  });
}

export async function getPostById(id: number): Promise<Post | null> {
  const row = await db.query.posts.findFirst({ where: (p) => eq(p.id, id) });
  return row ?? null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const row = await db.query.posts.findFirst({ where: (p) => eq(p.slug, slug) });
  return row ?? null;
}

/* ---------- orders (admin) ---------- */

export type OrderWithItems = Order & { items: OrderItem[] };

export async function getAllOrders(): Promise<OrderWithItems[]> {
  const rows = await db.query.orders.findMany({
    with: { items: true },
    orderBy: (o) => [desc(o.createdAt)],
  });
  return rows as OrderWithItems[];
}

export async function getOrdersCount(): Promise<{ total: number; pending: number }> {
  const rows = await db.select({ status: orders.status }).from(orders);
  return {
    total: rows.length,
    pending: rows.filter((r) => r.status === "pending").length,
  };
}

/** Count of products per category id (for admin + delete guards). */
export async function getProductCountByCategory(): Promise<Record<number, number>> {
  const rows = await db.select({ categoryId: products.categoryId }).from(products);
  const map: Record<number, number> = {};
  for (const r of rows) map[r.categoryId] = (map[r.categoryId] ?? 0) + 1;
  return map;
}
