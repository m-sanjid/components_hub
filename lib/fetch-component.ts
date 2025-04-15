import { Component } from "@/types";

export async function fetchComponentBySlug(slug: string): Promise<Component> {
  const res = await fetch(`/api/components/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch component');
  const data = await res.json();

  return data;
}