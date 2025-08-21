import React, { useRef } from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import Image from 'next/image';
import Button from './ui/Button';

export interface HeaderProps {
  linkCount: number;
  onAddLink: () => void;
  onImport: (data: string) => void;
  onExport: () => string;
}

const Header: React.FC<HeaderProps> = ({
  linkCount,
  onAddLink,
  onImport,
  onExport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = onExport();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkvault-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          onImport(content);
        } catch {
          alert('Error importing file');
        }
      };
      reader.readAsText(file);
    }
    // Reset input value to allow importing the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm border-b-2 border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo and Count */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              <div className="flex items-center flex-shrink-0">
                <Image
                  src="/logo-horizontal.png"
                  alt="LinkVault Logo"
                  width={250}
                  height={75}
                  className="h-10 sm:h-12 w-auto"
                  priority
                />
              </div>
              <div className="hidden xs:block ml-2 sm:ml-4 text-xs sm:text-sm text-secondary font-sans font-normal truncate">
                {linkCount} link{linkCount !== 1 ? 's' : ''} saved
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleImport}
                className="flex items-center space-x-1 p-2 sm:px-3"
                title="Import links"
              >
                <Upload className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                className="flex items-center space-x-1 p-2 sm:px-3"
                title="Export links"
              >
                <Download className="w-4 h-4" />
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={onAddLink}
                className="flex items-center space-x-1 px-2 sm:px-4"
                title="Add new link"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden xs:inline text-sm">Add</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Hidden file input for import */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-56 lg:bg-white lg:shadow-lg lg:border-r-2 lg:border-gray-100 lg:z-20 lg:flex-col">
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col items-center space-y-3">
            <Image
              src="/logo-horizontal.png"
              alt="LinkVault Logo"
              width={240}
              height={75}
              className="h-14 w-auto"
              priority
            />
            <div className="text-xs text-secondary font-sans font-normal">
              {linkCount} link{linkCount !== 1 ? 's' : ''} saved
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex-1 p-4 space-y-3">
          <Button
            variant="primary"
            size="md"
            onClick={onAddLink}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add New Link</span>
          </Button>

          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleImport}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm">Import</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </Button>
          </div>
        </div>

        {/* Hidden file input for import */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </aside>
    </>
  );
};

export default Header;