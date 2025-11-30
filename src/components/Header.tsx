import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { Menu, X } from 'lucide-react';
interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}
export function Header({
  searchValue,
  onSearchChange
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight">
              TechMate
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Price Comparison
            </p>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchBar value={searchValue} onChange={onSearchChange} placeholder="Search for products..." />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">
              Deals
            </a>
            <a href="#" className="text-sm font-medium hover:text-gray-600 transition-colors">
              Categories
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar value={searchValue} onChange={onSearchChange} placeholder="Search products..." />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="lg:hidden py-4 border-t border-gray-200 animate-fadeIn">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-base font-medium py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Deals
              </a>
              <a href="#" className="text-base font-medium py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Categories
              </a>
            </nav>
          </div>}
      </div>
    </header>;
}