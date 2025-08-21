import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-2 border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo-horizontal.png"
              alt="LinkVault Logo"
              width={150}
              height={45}
              className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right">
            <p className="text-sm text-secondary font-sans">
              © {currentYear} LinkVault. All rights reserved.
            </p>
            <p className="text-xs text-muted font-sans mt-1">
              Organize your links, unleash your productivity
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-6 pt-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 text-xs text-muted">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Made for productivity</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;