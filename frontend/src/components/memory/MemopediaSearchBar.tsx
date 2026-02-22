import styles from './MemopediaViewer.module.css';

interface MemopediaSearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function MemopediaSearchBar({ query, onQueryChange }: MemopediaSearchBarProps) {
  return (
    <div className={styles.sidebarHeader}>
      <input
        className={styles.searchInput}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="検索（タイトル・概要・キーワード）"
        value={query}
      />
    </div>
  );
}
