'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { MemopediaPageView } from './MemopediaPageView';
import { MemopediaSearchBar } from './MemopediaSearchBar';
import { MemopediaTreeNav } from './MemopediaTreeNav';
import styles from './MemopediaViewer.module.css';
import { useMemopediaQuery } from '@/hooks/useMemopediaQuery';

interface MemopediaViewerProps {
  personaId: string;
}

export default function MemopediaViewer({ personaId }: MemopediaViewerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    isLoadingPage,
    isLoadingTree,
    pageContent,
    searchQuery,
    searchResults,
    selectedPageId,
    setSearchQuery,
    setSelectedPageId,
    tree,
  } = useMemopediaQuery(personaId);

  useEffect(() => {
    const initialPage = searchParams.get('page');
    const initialQuery = searchParams.get('q');
    if (initialPage) setSelectedPageId(initialPage);
    if (initialQuery) setSearchQuery(initialQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedPageId) params.set('page', selectedPageId);
    else params.delete('page');

    if (searchQuery) params.set('q', searchQuery);
    else params.delete('q');

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams, searchQuery, selectedPageId]);

  if (isLoadingTree || !tree) {
    return <div className={styles.emptyState}>ナレッジベースを読み込み中...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <MemopediaSearchBar onQueryChange={setSearchQuery} query={searchQuery} />
        <MemopediaTreeNav
          onSelectPage={setSelectedPageId}
          searchResults={searchResults}
          selectedPageId={selectedPageId}
          tree={tree}
        />
      </div>
      <div className={styles.contentArea}>
        <MemopediaPageView content={pageContent} isLoading={isLoadingPage} selectedPageId={selectedPageId} />
      </div>
    </div>
  );
}
