// lib/extract-preview.ts

export function extractComponentPreview(source: string): string | null {
  const match = source.match(/export function Preview\s*\(\)\s*{[\s\S]*?^}/m);

  if (!match) return null;

  return `
import React from 'react';
${match[0]}
export default Preview;
  `.trim();
}
