export type MemopediaCategory = 'people' | 'terms' | 'plans';

export interface MemopediaPage {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  vividness: string;
  is_trunk: boolean;
  is_important: boolean;
  parent_id: string | null;
  children: MemopediaPage[];
}

export type MemopediaTree = Record<MemopediaCategory, MemopediaPage[]>;

export interface MemopediaSearchResult {
  page: MemopediaPage;
  category: MemopediaCategory;
}

export interface RawMemopediaPage {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  vividness: string;
  is_trunk: boolean;
  is_important: boolean;
  children?: RawMemopediaPage[];
}

export type RawMemopediaTree = Record<MemopediaCategory, RawMemopediaPage[]>;
