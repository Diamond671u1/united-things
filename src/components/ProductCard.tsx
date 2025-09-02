import React, { useState } from 'react';
import type { Product } from '../types';
import { useQuote } from '../contexts/QuoteContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToQuote } = useQuote();
  const [added, setAdded] = useState(false);

  const handleAddToQuote = () => {
    addToQuote(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="overflow-hidden h-56">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-brand-text flex-grow">{product.name}</h3>
        <p className="text-gray-600 mt-2 text-sm ">{product.description}</p>
        <div className="mt-4">
          <p className="text-xl font-bold text-brand-blue">₹{product.price.toFixed(2)}</p>
          <p className="text-xs text-gray-500">Incl. GST</p>
        </div>
        <button
          onClick={handleAddToQuote}
          className={`mt-4 w-full font-bold py-2 px-4 rounded-md transition-all duration-300 active:scale-95 ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-brand-blue text-white hover:bg-brand-blue-dark'
          }`}
        >
          {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
