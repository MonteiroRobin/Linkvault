import React from 'react';
import { Search, ChevronUp, ChevronDown, X } from 'lucide-react';
import { SortBy, SortOrder } from '@/lib/types';
import Input from './ui/Input';
import Button from './ui/Button';
import Tag from './ui/Tag';

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortBy) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  tags: Array<{
    id: string;
    name: string;
    color: string;
    count: number;
  }>;
  selectedTags: string[];
  onTagToggle: (tagName: string) => void;
  onClearFilters: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderChange,
  tags,
  selectedTags,
  onTagToggle,
  onClearFilters,
}) => {
  const hasActiveFilters = searchQuery.trim() !== '' || selectedTags.length > 0;

  const sortOptions = [
    { value: 'date' as SortBy, label: 'Date' },
    { value: 'title' as SortBy, label: 'Title' },
    { value: 'url' as SortBy, label: 'URL' },
    { value: 'favorites' as SortBy, label: 'Favorites' },
    { value: 'custom' as SortBy, label: 'Custom' },
  ];

  return (
    <div className="bg-white border-b-2 border-gray-100 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Ligne principale: Search + Sort + Clear */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 mb-3">
          {/* Search Input - Prend plus de place sur desktop */}
          <div className="relative flex-1 lg:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search your links..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 pr-4 h-9 text-sm"
            />
          </div>

          {/* Sort Controls - Compacts */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Sort:</span>
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onSortChange(option.value)}
                className="px-2 py-1 text-xs h-7"
              >
                {option.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1.5 h-7"
              title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortOrder === 'asc' ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </Button>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center space-x-1 text-gray-600 px-2 py-1 h-7 text-xs"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </Button>
          )}
        </div>

        {/* Tags - Ligne séparée, plus compacte */}
        {tags.length > 0 && (
          <div className="space-y-2">
            {/* Active filters d'abord si il y en a */}
            {selectedTags.length > 0 && (
              <div className="bg-teal/5 rounded-md p-2 border border-teal/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-teal">Active ({selectedTags.length}):</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map((tagName) => {
                    const tag = tags.find(t => t.name === tagName);
                    return tag ? (
                      <Tag
                        key={tagName}
                        name={tag.name}
                        color={tag.color}
                        selected
                        removable
                        onRemove={() => onTagToggle(tagName)}
                        size="sm"
                      />
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            {/* Tous les tags disponibles */}
            <div>
              <span className="text-xs font-medium text-gray-600 mb-1 block">
                Tags ({tags.length}):
              </span>
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                {tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    name={tag.name}
                    color={tag.color}
                    count={tag.count}
                    selected={selectedTags.includes(tag.name)}
                    clickable
                    onSelect={() => onTagToggle(tag.name)}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;