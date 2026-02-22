import { MemopediaPage } from './memopediaTypes';

type FlatPage = Omit<MemopediaPage, 'children'>;

export function buildMemopediaTree(pages: FlatPage[]): MemopediaPage[] {
  const map = new Map<string, MemopediaPage>();
  const roots: MemopediaPage[] = [];

  pages.forEach((page) => {
    map.set(page.id, { ...page, children: [] });
  });

  map.forEach((page) => {
    if (!page.parent_id) {
      roots.push(page);
      return;
    }

    const parent = map.get(page.parent_id);
    if (!parent) {
      roots.push(page);
      return;
    }

    parent.children.push(page);
  });

  return roots;
}
