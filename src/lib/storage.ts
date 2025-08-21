import { Link, Tag } from './types';

const LINKS_STORAGE_KEY = 'linkvault_links';
const TAGS_STORAGE_KEY = 'linkvault_tags';

export const saveLinks = (links: Link[]): void => {
  try {
    const serializedLinks = JSON.stringify(links);
    localStorage.setItem(LINKS_STORAGE_KEY, serializedLinks);
  } catch (error) {
    console.error('Error saving links to localStorage:', error);
  }
};

export const loadLinks = (): Link[] => {
  try {
    const serializedLinks = localStorage.getItem(LINKS_STORAGE_KEY);
    if (serializedLinks === null) {
      return [];
    }
    const links = JSON.parse(serializedLinks) as (Link & { createdAt: string })[];
    return links.map((link) => ({
      ...link,
      createdAt: new Date(link.createdAt)
    }));
  } catch (error) {
    console.error('Error loading links from localStorage:', error);
    return [];
  }
};

export const saveTags = (tags: Tag[]): void => {
  try {
    const serializedTags = JSON.stringify(tags);
    localStorage.setItem(TAGS_STORAGE_KEY, serializedTags);
  } catch (error) {
    console.error('Error saving tags to localStorage:', error);
  }
};

export const loadTags = (): Tag[] => {
  try {
    const serializedTags = localStorage.getItem(TAGS_STORAGE_KEY);
    if (serializedTags === null) {
      return [];
    }
    return JSON.parse(serializedTags);
  } catch (error) {
    console.error('Error loading tags from localStorage:', error);
    return [];
  }
};

export const exportData = (): string => {
  const links = loadLinks();
  const tags = loadTags();
  return JSON.stringify({ links, tags }, null, 2);
};

export const importData = (data: string): { links: Link[], tags: Tag[] } => {
  try {
    const parsed = JSON.parse(data) as { links?: (Link & { createdAt: string })[], tags?: Tag[] };
    const links = parsed.links?.map((link) => ({
      ...link,
      createdAt: new Date(link.createdAt)
    })) || [];
    const tags = parsed.tags || [];
    return { links, tags };
  } catch (error) {
    console.error('Error parsing import data:', error);
    throw new Error('Invalid data format');
  }
};

export const clearAllData = (): void => {
  try {
    localStorage.removeItem(LINKS_STORAGE_KEY);
    localStorage.removeItem(TAGS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};