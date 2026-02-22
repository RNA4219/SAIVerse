import { ChevronDown, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import { MemopediaPage, MemopediaSearchResult, MemopediaTree } from '@/lib/memory/memopediaTypes';

import styles from './MemopediaViewer.module.css';

interface MemopediaTreeNavProps {
  searchResults: MemopediaSearchResult[];
  selectedPageId: string | null;
  tree: MemopediaTree;
  onSelectPage: (pageId: string) => void;
}

export function MemopediaTreeNav({ searchResults, selectedPageId, tree, onSelectPage }: MemopediaTreeNavProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const hasSearch = searchResults.length > 0;

  const categories = useMemo(() => ([
    { key: 'people' as const, label: '人物 / People' },
    { key: 'terms' as const, label: '用語 / Terms' },
    { key: 'plans' as const, label: '計画 / Plans' },
  ]), []);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderNode = (page: MemopediaPage) => {
    const hasChildren = page.children.length > 0;
    const expanded = expandedIds.has(page.id);

    return (
      <div key={page.id}>
        <button className={`${styles.pageItem} ${selectedPageId === page.id ? styles.active : ''}`} onClick={() => onSelectPage(page.id)}>
          {hasChildren ? (
            <span className={styles.chevron} onClick={(event) => { event.stopPropagation(); toggleExpand(page.id); }}>
              {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </span>
          ) : (
            <span style={{ display: 'inline-block', width: 16 }} />
          )}
          <span>{page.title}</span>
        </button>
        {expanded && hasChildren ? <div className={styles.pageChildren}>{page.children.map(renderNode)}</div> : null}
      </div>
    );
  };

  if (hasSearch) {
    return (
      <div className={styles.treeContainer}>
        {searchResults.map(({ page, category }) => (
          <button className={`${styles.pageItem} ${selectedPageId === page.id ? styles.active : ''}`} key={page.id} onClick={() => onSelectPage(page.id)}>
            <span>[{category}] {page.title}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.treeContainer}>
      {categories.map((category) => (
        <div key={category.key}>
          <div className={styles.categoryTitle}>{category.label}</div>
          {tree[category.key].map(renderNode)}
        </div>
      ))}
    </div>
  );
}
