'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/lib/types';
import { useLinks } from '@/hooks/useLinks';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import LinkCard from '@/components/LinkCard';
import LinkForm from '@/components/LinkForm';
import Footer from '@/components/Footer';
import Modal from '@/components/ui/Modal';

export default function HomePage() {
  const {
    links,
    allLinks,
    tags,
    allTags,
    searchQuery,
    selectedTags,
    sortBy,
    sortOrder,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    addLink,
    updateLink,
    deleteLink,
    toggleTagSelection,
    clearFilters,
    exportData,
    importData,
    toggleFavorite,
    reorderLinks,
  } = useLinks();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | undefined>();

  const handleAddLink = () => {
    setIsAddModalOpen(true);
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = (data: import('@/lib/types').LinkFormData) => {
    addLink(data);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (data: import('@/lib/types').LinkFormData) => {
    if (editingLink) {
      updateLink(editingLink.id, data);
      setIsEditModalOpen(false);
      setEditingLink(undefined);
    }
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingLink(undefined);
  };

  const handleImport = (data: string) => {
    const result = importData(data);
    if (result.success) {
      alert(`Import successful! ${result.linksCount} links and ${result.tagsCount} tags imported.`);
    } else {
      alert(`Import error: ${result.error}`);
    }
  };

  const handleExport = () => {
    return exportData();
  };

  // Listen for drag & drop reorder events
  useEffect(() => {
    const handleReorderLinks = (event: CustomEvent) => {
      const { draggedId, targetId } = event.detail;
      reorderLinks(draggedId, targetId);
    };

    window.addEventListener('reorderLinks', handleReorderLinks as EventListener);
    return () => {
      window.removeEventListener('reorderLinks', handleReorderLinks as EventListener);
    };
  }, [reorderLinks]);

  return (
    <div className="min-h-screen bg-primary">
      {/* Header/Sidebar */}
      <Header
        linkCount={allLinks.length}
        onAddLink={handleAddLink}
        onImport={handleImport}
        onExport={handleExport}
      />

      {/* Main Layout */}
      <div className="lg:pl-56">
        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={setSortBy}
          onSortOrderChange={setSortOrder}
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={toggleTagSelection}
          onClearFilters={clearFilters}
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Empty State */}
        {allLinks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No links yet
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start organizing your favorite links by adding your first link. 
              Use tags to categorize them and find them easily.
            </p>
            <button
              onClick={handleAddLink}
              className="inline-flex items-center px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 font-medium touch-manipulation"
            >
              Add your first link
            </button>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {links.length} link{links.length !== 1 ? 's' : ''} displayed
                {links.length !== allLinks.length && ` of ${allLinks.length}`}
              </p>
            </div>

            {/* Links Grid */}
            {links.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {links.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    tags={allTags}
                    onEdit={handleEditLink}
                    onDelete={deleteLink}
                    onToggleFavorite={toggleFavorite}
                    isDraggable={sortBy === 'custom'}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 mb-4">
                  No links match your search criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-teal hover:text-teal/80 font-medium touch-manipulation"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
        </main>
      </div>

      {/* Add Link Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={handleAddCancel}
        title="Add new link"
        size="lg"
      >
        <LinkForm
          existingTags={allTags}
          onSubmit={handleAddSubmit}
          onCancel={handleAddCancel}
        />
      </Modal>

      {/* Edit Link Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleEditCancel}
        title="Edit link"
        size="lg"
      >
        <LinkForm
          link={editingLink}
          existingTags={allTags}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
        />
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
}
