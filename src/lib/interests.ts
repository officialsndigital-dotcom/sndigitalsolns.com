import { products } from "@/content/products";
import { servicesFor, verticals } from "@/content/services";
import type { Vertical } from "@/content/types";

const order: Vertical[] = ["development", "marketing", "pr"];

/** Options for the "I'm interested in" select, grouped by vertical. */
export const serviceInterests = [
  ...order.flatMap((v) => servicesFor(v).map((s) => ({ value: `${v}/${s.slug}`, label: s.name, group: verticals[v].name }))),
  ...products.map((p) => ({ value: `product/${p.slug}`, label: p.name, group: "Products" })),
];

export const productInterests = products.map((p) => ({ value: `product/${p.slug}`, label: `${p.name} (${p.category})` }));
