import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, Tag, LinkFormData, SortBy, SortOrder } from '@/lib/types';
import { generateId, getRandomColor, getDomainFromUrl, getFaviconUrl, formatUrl } from '@/lib/utils';
import { saveLinks, loadLinks, saveTags, loadTags } from '@/lib/storage';

export function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    const loadedLinks = loadLinks();
    const loadedTags = loadTags();
    setLinks(loadedLinks);
    setTags(loadedTags);
  }, []);

  useEffect(() => {
    saveLinks(links);
  }, [links]);

  useEffect(() => {
    saveTags(tags);
  }, [tags]);

  const addLink = useCallback((linkData: LinkFormData) => {
    const formattedUrl = formatUrl(linkData.url);
    const domain = getDomainFromUrl(formattedUrl);
    const favicon = getFaviconUrl(formattedUrl);

    const newLink: Link = {
      id: generateId(),
      title: linkData.title || domain || formattedUrl,
      url: formattedUrl,
      tags: linkData.tags,
      createdAt: new Date(),
      description: linkData.description,
      domain,
      favicon,
      isFavorite: false,
      customOrder: Date.now(),
    };

    const newTags: Tag[] = linkData.tags
      .filter(tagName => !tags.some(tag => tag.name === tagName))
      .map(tagName => ({
        id: generateId(),
        name: tagName,
        color: getRandomColor(),
      }));

    setLinks(prev => [newLink, ...prev]);
    setTags(prev => [...prev, ...newTags]);

    return newLink;
  }, [tags]);

  const updateLink = useCallback((id: string, linkData: LinkFormData) => {
    const formattedUrl = formatUrl(linkData.url);
    const domain = getDomainFromUrl(formattedUrl);
    const favicon = getFaviconUrl(formattedUrl);

    setLinks(prev => prev.map(link => 
      link.id === id 
        ? {
            ...link,
            title: linkData.title || domain || formattedUrl,
            url: formattedUrl,
            tags: linkData.tags,
            description: linkData.description,
            domain,
            favicon,
          }
        : link
    ));

    const newTags: Tag[] = linkData.tags
      .filter(tagName => !tags.some(tag => tag.name === tagName))
      .map(tagName => ({
        id: generateId(),
        name: tagName,
        color: getRandomColor(),
      }));

    if (newTags.length > 0) {
      setTags(prev => [...prev, ...newTags]);
    }
  }, [tags]);

  const deleteLink = useCallback((id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  }, []);

  const deleteTag = useCallback((id: string) => {
    const tagToDelete = tags.find(tag => tag.id === id);
    if (!tagToDelete) return;

    setTags(prev => prev.filter(tag => tag.id !== id));
    setLinks(prev => prev.map(link => ({
      ...link,
      tags: link.tags.filter(tagName => tagName !== tagToDelete.name)
    })));
    setSelectedTags(prev => prev.filter(tagName => tagName !== tagToDelete.name));
  }, [tags]);

  const filteredAndSortedLinks = useMemo(() => {
    let filtered = links;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(link =>
        link.title.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (link.description && link.description.toLowerCase().includes(query))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(link =>
        selectedTags.every(tagName => link.tags.includes(tagName))
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'url':
          comparison = a.url.localeCompare(b.url);
          break;
        case 'favorites':
          comparison = (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
          if (comparison === 0) {
            comparison = a.createdAt.getTime() - b.createdAt.getTime();
          }
          break;
        case 'custom':
          comparison = (a.customOrder || 0) - (b.customOrder || 0);
          break;
        case 'date':
        default:
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [links, searchQuery, selectedTags, sortBy, sortOrder]);

  const getTagsWithCount = useMemo(() => {
    return tags.map(tag => ({
      ...tag,
      count: links.filter(link => link.tags.includes(tag.name)).length
    })).sort((a, b) => b.count - a.count);
  }, [tags, links]);

  const toggleTagSelection = useCallback((tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName)
        ? prev.filter(name => name !== tagName)
        : [...prev, tagName]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify({ links, tags }, null, 2);
  }, [links, tags]);

  const importData = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data);
      const importedLinks = parsed.links?.map((link: Link & { createdAt: string }) => ({
        ...link,
        createdAt: new Date(link.createdAt)
      })) || [];
      const importedTags = parsed.tags || [];
      
      setLinks(importedLinks);
      setTags(importedTags);
      
      return { success: true, linksCount: importedLinks.length, tagsCount: importedTags.length };
    } catch (error) {
      console.error('Error importing data:', error);
      return { success: false, error: 'Invalid data format' };
    }
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id 
        ? { ...link, isFavorite: !link.isFavorite }
        : link
    ));
  }, []);

  const reorderLinks = useCallback((draggedId: string, targetId: string) => {
    setLinks(prev => {
      const draggedIndex = prev.findIndex(link => link.id === draggedId);
      const targetIndex = prev.findIndex(link => link.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newLinks = [...prev];
      const [draggedLink] = newLinks.splice(draggedIndex, 1);
      newLinks.splice(targetIndex, 0, draggedLink);
      
      // Update custom order
      return newLinks.map((link, index) => ({
        ...link,
        customOrder: index
      }));
    });
    
    // Switch to custom sort when reordering
    setSortBy('custom');
  }, []);

  const clearAllData = useCallback(() => {
    setLinks([]);
    setTags([]);
    setSearchQuery('');
    setSelectedTags([]);
  }, []);

  return {
    links: filteredAndSortedLinks,
    allLinks: links,
    tags: getTagsWithCount,
    allTags: tags,
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
    deleteTag,
    toggleTagSelection,
    clearFilters,
    exportData,
    importData,
    clearAllData,
    toggleFavorite,
    reorderLinks,
  };
}