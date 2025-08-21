import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TagProps {
  name: string;
  color: string;
  count?: number;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  size?: 'sm' | 'md';
  removable?: boolean;
  clickable?: boolean;
}

const Tag: React.FC<TagProps> = ({
  name,
  color,
  count,
  selected = false,
  onSelect,
  onRemove,
  size = 'md',
  removable = false,
  clickable = false,
}) => {
  const handleClick = () => {
    if (clickable && onSelect) {
      onSelect();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-all duration-200',
        {
          'px-2.5 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
          'cursor-pointer hover:opacity-80': clickable,
          'ring-2 ring-offset-2 ring-blue-500': selected,
        }
      )}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        borderColor: color,
        border: `1px solid ${color}40`,
      }}
      onClick={handleClick}
    >
      <span className="truncate max-w-32">
        {name}
      </span>
      
      {count !== undefined && (
        <span 
          className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full"
          style={{ backgroundColor: `${color}30` }}
        >
          {count}
        </span>
      )}

      {removable && onRemove && (
        <button
          onClick={handleRemove}
          className="ml-1.5 p-0.5 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

export default Tag;