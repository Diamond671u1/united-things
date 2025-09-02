
import React from 'react';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface SearchResultsPageProps {
  query: string;
  results: Product[];
  onBack: () => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ query, results, onBack }) => {
  return (
    <div className="bg-white min-h-[calc(100vh-200px)]">
      <div className="container mx-auto px-6 py-12">
        <button
          onClick={onBack}
          className="mb-8 text-brand-blue hover:underline text-lg font-semibold"
        >
          &larr; Back to Home
        </button>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-brand-blue">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600 mt-2">{results.length} product(s) found.</p>
        </div>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No products found matching your search. Try a different keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
