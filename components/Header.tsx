
import React, { useState, useEffect } from 'react';
import { useQuote } from '../contexts/QuoteContext';
import QuoteModal from './QuoteModal';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { HamburgerIcon } from './icons/HamburgerIcon';
import { CloseIcon } from './icons/CloseIcon';
import { SearchIcon } from './icons/SearchIcon';

interface HeaderProps {
  onNavigate: (page: 'home') => void;
  onSearch: (query: string) => void;
}


const Header: React.FC<HeaderProps> = ({ onNavigate, onSearch }) => {
  const { itemCount } = useQuote();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    setIsMobileMenuOpen(false);
  }
  
  const handleNavClick = (target: 'home' | 'categories' | 'about' | 'contact') => {
    if (target === 'home' || target === 'categories') {
       onNavigate('home');
    }
    setIsMobileMenuOpen(false);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
    setIsMobileMenuOpen(false); // Close menu on search
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-brand-blue">
            <a href="#" onClick={handleLogoClick}>United things</a>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#categories" onClick={() => handleNavClick('categories')} className="text-gray-600 hover:text-brand-blue transition duration-300">Categories</a>
            <a href="#" onClick={() => handleNavClick('about')} className="text-gray-600 hover:text-brand-blue transition duration-300">About Us</a>
            <a href="#" onClick={() => handleNavClick('contact')} className="text-gray-600 hover:text-brand-blue transition duration-300">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-full py-2 pl-4 pr-10 w-56 lg:w-64 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-gray-800 bg-white"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue" aria-label="Search">
                    <SearchIcon />
                </button>
            </form>

            <button onClick={() => setIsModalOpen(true)} className="relative text-brand-blue hover:text-brand-blue-dark transition duration-300 active:scale-90">
              <ShoppingCartIcon />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-accent text-brand-blue-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

             {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-brand-blue hover:text-brand-blue-dark transition duration-300 active:scale-90">
                {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
         <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center p-6 md:hidden">
            <nav className="flex flex-col items-center space-y-8 text-2xl">
              <a href="#categories" onClick={() => handleNavClick('categories')} className="text-brand-text hover:text-brand-blue transition duration-300">Categories</a>
              <a href="#" onClick={() => handleNavClick('about')} className="text-brand-text hover:text-brand-blue transition duration-300">About Us</a>
              <a href="#" onClick={() => handleNavClick('contact')} className="text-brand-text hover:text-brand-blue transition duration-300">Contact</a>
            </nav>
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative mt-8 w-full max-w-sm">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-full py-3 px-5 w-full focus:outline-none focus:ring-2 focus:ring-brand-blue/50 text-gray-800 bg-white"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-blue" aria-label="Search">
                    <SearchIcon />
                </button>
            </form>
         </div>
      )}

      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
