"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { categories, products, posts } from "@/db/schema";

/* ---------- helpers ---------- */

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "item";
}

async function uniqueProductSlug(base: string, excludeId?: number): Promise<string> {
  let slug = base;
  let n = 1;
  // Loop until no other product uses this slug.
  while (true) {
    const existing = await db.query.products.findFirst({
      where: (p) => (excludeId ? and(eq(p.slug, slug), ne(p.id, excludeId)) : eq(p.slug, slug)),
    });
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

async function uniqueCategorySlug(base: string, excludeId?: number): Promise<string> {
  let slug = base;
  let n = 1;
  while (true) {
    const existing = await db.query.categories.findFirst({
      where: (c) => (excludeId ? and(eq(c.slug, slug), ne(c.id, excludeId)) : eq(c.slug, slug)),
    });
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

function num(v: FormDataEntryValue | null, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function str(v: FormDataEntryValue | null): string {
  return (v ?? "").toString().trim();
}

async function uniquePostSlug(base: string, excludeId?: number): Promise<string> {
  let slug = base;
  let n = 1;
  while (true) {
    const existing = await db.query.posts.findFirst({
      where: (p) => (excludeId ? and(eq(p.slug, slug), ne(p.id, excludeId)) : eq(p.slug, slug)),
    });
    if (!existing) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

function revalidateStore() {
  revalidatePath("/[locale]", "layout");
  revalidatePath("/[locale]/products", "page");
  revalidatePath("/admin/products");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/posts");
}

/* ---------- products ---------- */

export async function createProduct(formData: FormData) {
  const name = str(formData.get("name"));
  if (!name) throw new Error("Name is required");
  const categoryId = num(formData.get("categoryId"));
  if (!categoryId) throw new Error("Category is required");

  const slug = await uniqueProductSlug(slugify(str(formData.get("slug")) || name));
  const badge = str(formData.get("badge"));

  await db.insert(products).values({
    slug,
    name,
    description: str(formData.get("description")),
    priceCents: Math.round(num(formData.get("price")) * 100),
    categoryId,
    image: str(formData.get("image")) || null,
    ratingTenths: Math.round(num(formData.get("rating"), 4.5) * 10),
    reviews: Math.round(num(formData.get("reviews"))),
    badge: badge === "new" || badge === "bestseller" ? badge : null,
    stock: Math.round(num(formData.get("stock"))),
    featured: formData.get("featured") === "on",
    status: str(formData.get("status")) === "draft" ? "draft" : "active",
  });

  revalidateStore();
  redirect("/admin/products");
}

export async function updateProduct(id: number, formData: FormData) {
  const name = str(formData.get("name"));
  if (!name) throw new Error("Name is required");
  const categoryId = num(formData.get("categoryId"));
  if (!categoryId) throw new Error("Category is required");

  const slug = await uniqueProductSlug(slugify(str(formData.get("slug")) || name), id);
  const badge = str(formData.get("badge"));

  await db
    .update(products)
    .set({
      slug,
      name,
      description: str(formData.get("description")),
      priceCents: Math.round(num(formData.get("price")) * 100),
      categoryId,
      image: str(formData.get("image")) || null,
      ratingTenths: Math.round(num(formData.get("rating"), 4.5) * 10),
      reviews: Math.round(num(formData.get("reviews"))),
      badge: badge === "new" || badge === "bestseller" ? badge : null,
      stock: Math.round(num(formData.get("stock"))),
      featured: formData.get("featured") === "on",
      status: str(formData.get("status")) === "draft" ? "draft" : "active",
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));

  revalidateStore();
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));
  revalidateStore();
  revalidatePath("/admin/products");
}

/* ---------- categories ---------- */

export async function createCategory(formData: FormData) {
  const name = str(formData.get("name"));
  if (!name) throw new Error("Name is required");
  const slug = await uniqueCategorySlug(slugify(str(formData.get("slug")) || name));

  await db.insert(categories).values({
    slug,
    name,
    kind: str(formData.get("kind")) || "counter",
    tint: str(formData.get("tint")) || "blue",
    image: str(formData.get("image")) || null,
    sortOrder: Math.round(num(formData.get("sortOrder"))),
  });

  revalidateStore();
  redirect("/admin/categories");
}

export async function updateCategory(id: number, formData: FormData) {
  const name = str(formData.get("name"));
  if (!name) throw new Error("Name is required");
  const slug = await uniqueCategorySlug(slugify(str(formData.get("slug")) || name), id);

  await db
    .update(categories)
    .set({
      slug,
      name,
      kind: str(formData.get("kind")) || "counter",
      tint: str(formData.get("tint")) || "blue",
      image: str(formData.get("image")) || null,
      sortOrder: Math.round(num(formData.get("sortOrder"))),
    })
    .where(eq(categories.id, id));

  revalidateStore();
  redirect("/admin/categories");
}

export async function deleteCategory(id: number) {
  // Deleting a category cascades to its products (FK onDelete: cascade).
  await db.delete(categories).where(eq(categories.id, id));
  revalidateStore();
  revalidatePath("/admin/categories");
}

/* ---------- posts (guides & insights) ---------- */

export async function createPost(formData: FormData) {
  const title = str(formData.get("title"));
  if (!title) throw new Error("Title is required");
  const slug = await uniquePostSlug(slugify(str(formData.get("slug")) || title));

  await db.insert(posts).values({
    slug,
    title,
    excerpt: str(formData.get("excerpt")),
    content: str(formData.get("content")),
    tag: str(formData.get("tag")) || "Guide",
    image: str(formData.get("image")) || null,
    published: formData.get("published") === "on",
    sortOrder: Math.round(num(formData.get("sortOrder"))),
  });

  revalidateStore();
  redirect("/admin/posts");
}

export async function updatePost(id: number, formData: FormData) {
  const title = str(formData.get("title"));
  if (!title) throw new Error("Title is required");
  const slug = await uniquePostSlug(slugify(str(formData.get("slug")) || title), id);

  await db
    .update(posts)
    .set({
      slug,
      title,
      excerpt: str(formData.get("excerpt")),
      content: str(formData.get("content")),
      tag: str(formData.get("tag")) || "Guide",
      image: str(formData.get("image")) || null,
      published: formData.get("published") === "on",
      sortOrder: Math.round(num(formData.get("sortOrder"))),
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id));

  revalidateStore();
  redirect("/admin/posts");
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
  revalidateStore();
  revalidatePath("/admin/posts");
}
