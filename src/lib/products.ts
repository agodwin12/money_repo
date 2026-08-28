export type ProductKind = "counter" | "detector" | "coin" | "scale" | "pen";
export type CategoryKey = ProductKind | "multi";
export type Tint = "blue" | "lavender" | "mint" | "peach";

export interface Product {
  id: string;
  name: string;
  /** Price in EUR. */
  price: number;
  /** Illustration variant used until a real photo is dropped in. */
  kind: ProductKind;
  /** i18n key under Products.cat for the category label. */
  category: CategoryKey;
  tint: Tint;
  rating: number;
  reviews: number;
  /** Optional real image path, e.g. "/images/products/billcount-pro.jpg". Falls back to illustration. */
  image?: string;
  /** Marks the product as new/featured. */
  badge?: "new" | "bestseller";
}

// Demo catalog — swap names, prices and images for your real products anytime.
export const products: Product[] = [
  {
    id: "billcount-pro-x1",
    name: "BillCount Pro X1",
    price: 459,
    kind: "counter",
    category: "counter",
    tint: "blue",
    rating: 4.9,
    reviews: 214,
    badge: "bestseller",
  },
  {
    id: "detectguard-uvmg",
    name: "DetectGuard UV+MG",
    price: 129,
    kind: "detector",
    category: "detector",
    tint: "lavender",
    rating: 4.8,
    reviews: 168,
  },
  {
    id: "coinsort-3000",
    name: "CoinSort 3000",
    price: 389,
    kind: "coin",
    category: "coin",
    tint: "mint",
    rating: 4.7,
    reviews: 92,
  },
  {
    id: "scalecount-s2",
    name: "ScaleCount S2",
    price: 259,
    kind: "scale",
    category: "scale",
    tint: "peach",
    rating: 4.6,
    reviews: 74,
  },
  {
    id: "vaultmaster-5000",
    name: "VaultMaster 5000",
    price: 899,
    kind: "counter",
    category: "counter",
    tint: "lavender",
    rating: 5.0,
    reviews: 51,
    badge: "new",
  },
  {
    id: "multicurrency-pro",
    name: "MultiCurrency Pro",
    price: 649,
    kind: "counter",
    category: "multi",
    tint: "blue",
    rating: 4.8,
    reviews: 133,
  },
  {
    id: "pocketcount-mini",
    name: "PocketCount Mini",
    price: 199,
    kind: "counter",
    category: "counter",
    tint: "mint",
    rating: 4.5,
    reviews: 61,
  },
  {
    id: "flashcheck-pen",
    name: "FlashCheck Pen",
    price: 19,
    kind: "pen",
    category: "pen",
    tint: "peach",
    rating: 4.4,
    reviews: 302,
  },
];
