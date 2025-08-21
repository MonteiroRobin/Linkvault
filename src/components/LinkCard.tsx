import React, { useState } from 'react';
import { ExternalLink, Edit, Trash2, Calendar, Globe, Star, GripVertical } from 'lucide-react';
import { Link } from '@/lib/types';
import { formatDate, truncateText } from '@/lib/utils';
import Button from './ui/Button';
import Tag from './ui/Tag';

export interface LinkCardProps {
  link: Link;
  tags: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isDraggable?: boolean;
}

const LinkCard: React.FC<LinkCardProps> = ({
  link,
  tags,
  onEdit,
  onDelete,
  onToggleFavorite,
  isDraggable = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleVisit = () => {
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const handleEdit = () => {
    onEdit(link);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      onDelete(link.id);
    }
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(link.id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', link.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isDraggable) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isDraggable) return;
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId !== link.id) {
      // This will be handled by the parent component
      const event = new CustomEvent('reorderLinks', {
        detail: { draggedId, targetId: link.id }
      });
      window.dispatchEvent(event);
    }
  };

  const linkTags = link.tags
    .map(tagName => tags.find(tag => tag.name === tagName))
    .filter(Boolean) as Array<{
      id: string;
      name: string;
      color: string;
    }>;

  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-200 animate-fadeIn touch-manipulation ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${link.isFavorite ? 'ring-2 ring-yellow-400/20 bg-yellow-50/30' : ''}`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          {isDraggable && (
            <div className="cursor-move text-gray-400 hover:text-gray-600">
              <GripVertical className="w-4 h-4" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              {link.favicon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={link.favicon}
                  alt=""
                  className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate leading-tight">
                {link.title}
              </h3>
              {link.isFavorite && (
                <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
              )}
            </div>
            
            <div className="flex items-center text-xs sm:text-sm text-gray-500 space-x-1">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{link.domain || new URL(link.url).hostname}</span>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Actions */}
        <div className="flex items-start space-x-1 ml-2 sm:ml-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleFavorite}
            className={`p-1.5 sm:p-2 touch-manipulation ${
              link.isFavorite 
                ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
            }`}
            title={link.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${link.isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVisit}
            className="p-1.5 sm:p-2 touch-manipulation"
            title="Visit link"
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="p-1.5 sm:p-2 touch-manipulation"
            title="Edit link"
          >
            <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="p-1.5 sm:p-2 text-red-600 hover:text-red-700 hover:bg-red-50 touch-manipulation"
            title="Delete link"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* URL */}
      <div className="mb-3">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm break-all hover:underline"
        >
          {truncateText(link.url, 60)}
        </a>
      </div>

      {/* Description */}
      {link.description && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            {link.description}
          </p>
        </div>
      )}

      {/* Tags */}
      {linkTags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {linkTags.map((tag) => (
              <Tag
                key={tag.id}
                name={tag.name}
                color={tag.color}
                size="sm"
              />
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>Added on {formatDate(link.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-4">
          {link.tags.length > 0 && (
            <span>{link.tags.length} tag{link.tags.length !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkCard;