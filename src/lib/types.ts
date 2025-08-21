export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  tags: string[];
  createdAt: Date;
  description?: string;
  favicon?: string;
  domain?: string;
  isFavorite?: boolean;
  customOrder?: number;
}

export interface AppState {
  links: Link[];
  tags: Tag[];
  searchQuery: string;
  selectedTags: string[];
  sortBy: 'title' | 'date' | 'url' | 'custom' | 'favorites';
  sortOrder: 'asc' | 'desc';
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  editingLink?: Link;
}

export type SortBy = 'title' | 'date' | 'url' | 'custom' | 'favorites';
export type SortOrder = 'asc' | 'desc';

export interface LinkFormData {
  title: string;
  url: string;
  tags: string[];
  description?: string;
}

export interface FilterOptions {
  searchQuery: string;
  selectedTags: string[];
  sortBy: SortBy;
  sortOrder: SortOrder;
}