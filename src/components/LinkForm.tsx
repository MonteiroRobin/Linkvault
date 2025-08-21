import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link, LinkFormData } from '@/lib/types';
import { isValidUrl } from '@/lib/utils';
import Button from './ui/Button';
import Input from './ui/Input';
import Tag from './ui/Tag';

export interface LinkFormProps {
  link?: Link;
  existingTags: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  onSubmit: (data: LinkFormData) => void;
  onCancel: () => void;
}

const LinkForm: React.FC<LinkFormProps> = ({
  link,
  existingTags,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<LinkFormData>({
    title: '',
    url: '',
    tags: [],
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title,
        url: link.url,
        tags: [...link.tags],
        description: link.description || '',
      });
    }
  }, [link]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'URL is not valid';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleExistingTagSelect = (tagName: string) => {
    if (!formData.tags.includes(tagName)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagName],
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const suggestedTags = existingTags
    .filter(tag => !formData.tags.includes(tag.name))
    .slice(0, 10);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* URL Field */}
      <Input
        label="URL *"
        type="url"
        value={formData.url}
        onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
        placeholder="https://example.com"
        error={errors.url}
        required
      />

      {/* Title Field */}
      <Input
        label="Title *"
        type="text"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        placeholder="Link title"
        error={errors.title}
        required
      />

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Optional link description..."
          rows={3}
          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal resize-none touch-manipulation"
        />
      </div>

      {/* Tags Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Tags
        </label>

        {/* Add New Tag */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a tag..."
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleAddTag}
            disabled={!newTag.trim() || formData.tags.includes(newTag.trim())}
            className="px-3 sm:px-4 w-full sm:w-auto touch-manipulation"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Current Tags */}
        {formData.tags.length > 0 && (
          <div>
            <div className="text-sm text-gray-600 mb-2">Selected tags:</div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tagName) => {
                const existingTag = existingTags.find(tag => tag.name === tagName);
                return (
                  <Tag
                    key={tagName}
                    name={tagName}
                    color={existingTag?.color || '#3B82F6'}
                    removable
                    onRemove={() => handleRemoveTag(tagName)}
                    size="sm"
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Suggested Tags */}
        {suggestedTags.length > 0 && (
          <div>
            <div className="text-sm text-gray-600 mb-2">Suggested tags:</div>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <Tag
                  key={tag.id}
                  name={tag.name}
                  color={tag.color}
                  clickable
                  onSelect={() => handleExistingTagSelect(tag.name)}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full sm:w-auto touch-manipulation"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto touch-manipulation"
        >
          {link ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default LinkForm;