import { buildMemopediaTree } from './buildMemopediaTree';
import { MemopediaCategory, MemopediaPage, RawMemopediaPage, RawMemopediaTree } from './memopediaTypes';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Memopedia API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function flattenPages(pages: RawMemopediaPage[], parentId: string | null = null): Omit<MemopediaPage, 'children'>[] {
  return pages.flatMap((page) => {
    const normalized: Omit<MemopediaPage, 'children'> = {
      ...page,
      parent_id: parentId,
    };
    const children = flattenPages(page.children ?? [], page.id);
    return [normalized, ...children];
  });
}

function normalizeCategory(pages: RawMemopediaPage[]): MemopediaPage[] {
  return buildMemopediaTree(flattenPages(pages));
}

export async function fetchMemopediaTree(personaId: string) {
  const rawTree = await request<RawMemopediaTree>(`/api/people/${personaId}/memopedia/tree`);
  const categories: MemopediaCategory[] = ['people', 'terms', 'plans'];
  return categories.reduce((acc, category) => {
    acc[category] = normalizeCategory(rawTree[category] ?? []);
    return acc;
  }, {} as Record<MemopediaCategory, MemopediaPage[]>);
}

export async function fetchMemopediaPage(personaId: string, pageId: string) {
  return request<{ content: string }>(`/api/people/${personaId}/memopedia/pages/${pageId}`);
}
