import { useCallback, useEffect, useMemo, useState } from 'react';

import { fetchMemopediaPage, fetchMemopediaTree } from '@/lib/memory/memopediaClient';
import { MemopediaPage, MemopediaSearchResult, MemopediaTree } from '@/lib/memory/memopediaTypes';

function flatten(pages: MemopediaPage[]): MemopediaPage[] {
  return pages.flatMap((page) => [page, ...flatten(page.children)]);
}

export function useMemopediaQuery(personaId: string) {
  const [tree, setTree] = useState<MemopediaTree | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [isLoadingTree, setIsLoadingTree] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const loadTree = useCallback(async () => {
    setIsLoadingTree(true);
    try {
      const nextTree = await fetchMemopediaTree(personaId);
      setTree(nextTree);
    } finally {
      setIsLoadingTree(false);
    }
  }, [personaId]);

  useEffect(() => {
    loadTree();
  }, [loadTree]);

  useEffect(() => {
    if (!selectedPageId) {
      setPageContent('');
      return;
    }

    const loadPage = async () => {
      setIsLoadingPage(true);
      try {
        const page = await fetchMemopediaPage(personaId, selectedPageId);
        setPageContent(page.content);
      } finally {
        setIsLoadingPage(false);
      }
    };

    loadPage();
  }, [personaId, selectedPageId]);

  const searchResults = useMemo<MemopediaSearchResult[]>(() => {
    if (!tree || !searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();

    return (Object.keys(tree) as Array<keyof MemopediaTree>).flatMap((category) => {
      return flatten(tree[category])
        .filter((page) => {
          return [page.title, page.summary, page.keywords.join(' ')].join(' ').toLowerCase().includes(q);
        })
        .map((page) => ({ page, category }));
    });
  }, [searchQuery, tree]);

  return {
    isLoadingPage,
    isLoadingTree,
    pageContent,
    searchQuery,
    searchResults,
    selectedPageId,
    setSearchQuery,
    setSelectedPageId,
    tree,
  };
}
