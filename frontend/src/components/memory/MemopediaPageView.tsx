import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';

import SaiverseLink from '../SaiverseLink';
import styles from './MemopediaViewer.module.css';

interface MemopediaPageViewProps {
  content: string;
  isLoading: boolean;
  selectedPageId: string | null;
}

export function MemopediaPageView({ content, isLoading, selectedPageId }: MemopediaPageViewProps) {
  if (!selectedPageId) {
    return <div className={styles.emptyState}>ページを選択してください</div>;
  }
  if (isLoading) {
    return <div className={styles.emptyState}>読み込み中...</div>;
  }

  return (
    <div className={styles.contentBody}>
      <ReactMarkdown
        components={{
          a: ({ children, href = '' }) => <SaiverseLink href={href}>{children}</SaiverseLink>,
        }}
        urlTransform={(url) => (url.startsWith('/#') ? url : defaultUrlTransform(url))}
      >
        {content || '*内容がありません*'}
      </ReactMarkdown>
    </div>
  );
}
