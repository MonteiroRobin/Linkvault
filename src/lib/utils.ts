import { clsx, type ClassValue } from 'clsx';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

export function formatUrl(url: string): string {
  if (!url) return '';
  
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  
  return url;
}

export function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(formatUrl(url));
    return urlObj.hostname.replace('www.', '');
  } catch {
    return '';
  }
}

export function getFaviconUrl(url: string): string {
  const domain = getDomainFromUrl(url);
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=32` : '';
}

export function generateId(): string {
  return uuidv4();
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

const colors = [
  '#3B82F6', // blue
  '#EF4444', // red
  '#10B981', // green
  '#F59E0B', // yellow
  '#8B5CF6', // purple
  '#F97316', // orange
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#84CC16', // lime
  '#F43F5E', // rose
];

export function getRandomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}