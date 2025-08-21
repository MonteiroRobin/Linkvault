import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500 ease-out"
      onClick={onClose}
    >
      <div 
        className={cn(
          'bg-white rounded-2xl shadow-2xl w-full animate-in fade-in zoom-in-90 slide-in-from-top-8 duration-500 ease-out max-h-[90vh] overflow-y-auto transform transition-all border border-gray-100',
          {
            'max-w-sm': size === 'sm',
            'max-w-md': size === 'md',
            'max-w-2xl': size === 'lg',
          }
        )}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-teal/5 to-teal-light/5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 font-heading">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-all duration-200 touch-manipulation"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-gray-50/30">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;