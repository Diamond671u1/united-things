import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CategoryCard from './components/CategoryCard';
import ChatAssistant from './components/ChatAssistant';
import JanitorialPage from './pages/JanitorialPage';
import StationeryPage from './pages/StationeryPage';
import PackagingPage from './pages/PackagingPage';
import FoodAndBeveragePage from './pages/FoodAndBeveragePage';
import SearchResultsPage from './pages/SearchResultsPage';
import { CATEGORIES, ALL_PRODUCTS } from './constants';
import type { Product } from './types';

type Page = 'home' | 'janitorial' | 'stationery' | 'packaging' | 'food-and-beverage' | 'search';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (path?: string) => {
    if (path === 'janitorial') {
      setActivePage('janitorial');
      window.scrollTo(0, 0);
    } else if (path === 'stationery') {
      setActivePage('stationery');
      window.scrollTo(0, 0);
    } else if (path === 'packaging') {
      setActivePage('packaging');
      window.scrollTo(0, 0);
    } else if (path === 'food-and-beverage') {
      setActivePage('food-and-beverage');
      window.scrollTo(0, 0);
    } else {
      setActivePage('home');
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setActivePage('home');
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const results = ALL_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery)
    );
    setSearchQuery(query);
    setSearchResults(results);
    setActivePage('search');
    window.scrollTo(0, 0);
  };
  
  const renderHomePage = () => (
    <>
      <Hero />
      <section id="categories" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">Our Categories</h2>
          <p className="text-center text-gray-600 mb-10">Supplying all your business needs under one roof.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {CATEGORIES.map(category => (
              <CategoryCard key={category.name} category={category} onClick={handleNavigate} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-brand-blue text-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Partner with United things</h2>
            <p className="max-w-3xl mx-auto mb-8">
                We streamline your procurement process with reliable delivery, competitive pricing, and a vast product catalog. Focus on your business, we'll handle the supplies.
            </p>
            <a href="#categories" className="bg-brand-accent text-brand-blue-dark font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition duration-300">
                Browse Categories
            </a>
        </div>
      </section>
    </>
  );

  return (
    <div className="bg-brand-gray min-h-screen font-sans text-brand-text">
      <Header onNavigate={() => handleNavigate()} onSearch={handleSearch} />
      <main>
        {activePage === 'home' && renderHomePage()}
        {activePage === 'janitorial' && <JanitorialPage onBack={() => handleNavigate()} />}
        {activePage === 'stationery' && <StationeryPage onBack={() => handleNavigate()} />}
        {activePage === 'packaging' && <PackagingPage onBack={() => handleNavigate()} />}
        {activePage === 'food-and-beverage' && <FoodAndBeveragePage onBack={() => handleNavigate()} />}
        {activePage === 'search' && <SearchResultsPage query={searchQuery} results={searchResults} onBack={() => handleNavigate()} />}
      </main>
      <ChatAssistant />
      <Footer />
    </div>
  );
};

export default App;
