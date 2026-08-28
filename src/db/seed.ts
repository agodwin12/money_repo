import { config } from "dotenv";
config({ path: ".env.local" });

// Dynamic imports so dotenv runs before the db client reads DATABASE_URL.
async function main() {
  const { db } = await import("./index");
  const { categories, products, posts } = await import("./schema");

  console.log("Clearing existing data…");
  await db.delete(products);
  await db.delete(categories);
  await db.delete(posts);

  console.log("Seeding categories…");
  const cats = await db
    .insert(categories)
    .values([
      { slug: "bill-counters", name: "Bill counters", kind: "counter", tint: "blue", sortOrder: 1 },
      { slug: "counterfeit-detectors", name: "Counterfeit detectors", kind: "detector", tint: "lavender", sortOrder: 2 },
      { slug: "coin-sorters", name: "Coin sorters", kind: "coin", tint: "mint", sortOrder: 3 },
      { slug: "counting-scales", name: "Counting scales", kind: "scale", tint: "peach", sortOrder: 4 },
      { slug: "multi-currency", name: "Multi-currency", kind: "counter", tint: "blue", sortOrder: 5 },
      { slug: "detector-pens", name: "Detector pens", kind: "pen", tint: "peach", sortOrder: 6 },
    ])
    .returning();

  const bySlug = Object.fromEntries(cats.map((c) => [c.slug, c.id])) as Record<string, number>;

  console.log("Seeding products…");
  await db.insert(products).values([
    {
      slug: "billcount-pro-x1",
      name: "BillCount Pro X1",
      description:
        "Mixed-denomination bill counter with value counting, batching and jam detection. Counts up to 1,000 notes per minute.",
      priceCents: 45900,
      categoryId: bySlug["bill-counters"],
      ratingTenths: 49,
      reviews: 214,
      badge: "bestseller",
      stock: 32,
      featured: true,
    },
    {
      slug: "detectguard-uvmg",
      name: "DetectGuard UV+MG",
      description:
        "Compact UV and magnetic counterfeit detector. Verifies notes, passports and IDs in a single pass.",
      priceCents: 12900,
      categoryId: bySlug["counterfeit-detectors"],
      ratingTenths: 48,
      reviews: 168,
      stock: 54,
      featured: true,
    },
    {
      slug: "coinsort-3000",
      name: "CoinSort 3000",
      description:
        "High-speed coin counter and sorter that batches, rolls and bags coins automatically.",
      priceCents: 38900,
      categoryId: bySlug["coin-sorters"],
      ratingTenths: 47,
      reviews: 92,
      stock: 18,
      featured: true,
    },
    {
      slug: "scalecount-s2",
      name: "ScaleCount S2",
      description:
        "Precision money-counting scale for notes and coins. Weighs stacks for instant totals.",
      priceCents: 25900,
      categoryId: bySlug["counting-scales"],
      ratingTenths: 46,
      reviews: 74,
      stock: 27,
      featured: true,
    },
    {
      slug: "vaultmaster-5000",
      name: "VaultMaster 5000",
      description:
        "Bank-grade currency counter with UV, magnetic and infrared detection, value counting across 50 currencies, and a full printed report.",
      priceCents: 89900,
      categoryId: bySlug["bill-counters"],
      ratingTenths: 50,
      reviews: 51,
      badge: "new",
      stock: 9,
      featured: true,
    },
    {
      slug: "multicurrency-pro",
      name: "MultiCurrency Pro",
      description:
        "Multi-currency value counter that recognises and totals mixed notes from 50+ currencies.",
      priceCents: 64900,
      categoryId: bySlug["multi-currency"],
      ratingTenths: 48,
      reviews: 133,
      stock: 21,
      featured: true,
    },
    {
      slug: "pocketcount-mini",
      name: "PocketCount Mini",
      description:
        "Portable, battery-powered bill counter for markets, events and mobile tills.",
      priceCents: 19900,
      categoryId: bySlug["bill-counters"],
      ratingTenths: 45,
      reviews: 61,
      stock: 63,
    },
    {
      slug: "flashcheck-pen",
      name: "FlashCheck Pen",
      description:
        "Pocket UV counterfeit detector pen — instant verification anywhere, sold in packs.",
      priceCents: 1900,
      categoryId: bySlug["detector-pens"],
      ratingTenths: 44,
      reviews: 302,
      stock: 240,
    },
  ]);

  console.log("Seeding guides…");
  await db.insert(posts).values([
    {
      slug: "how-to-choose-the-right-bill-counter",
      title: "How to choose the right bill counter",
      excerpt:
        "Value counting, denomination detection, batching — the features that actually matter for your volume.",
      tag: "Buying guide",
      published: true,
      sortOrder: 1,
    },
    {
      slug: "5-ways-counterfeit-notes-slip-through",
      title: "5 ways counterfeit notes slip through",
      excerpt:
        "And how UV + magnetic + infrared verification closes each gap at the point of sale.",
      tag: "Security",
      published: true,
      sortOrder: 2,
    },
    {
      slug: "keep-your-counter-accurate-for-years",
      title: "Keep your counter accurate for years",
      excerpt:
        "A simple monthly cleaning routine that prevents jams and keeps counts reliable.",
      tag: "Maintenance",
      published: true,
      sortOrder: 3,
    },
  ]);

  const count = await db.$count(products);
  const postCount = await db.$count(posts);
  console.log(`Done. ${cats.length} categories, ${count} products, ${postCount} guides.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
