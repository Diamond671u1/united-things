import React from 'react';
import { FOOD_AND_BEVERAGE_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

interface FoodAndBeveragePageProps {
  onBack: () => void;
}

const FoodAndBeveragePage: React.FC<FoodAndBeveragePageProps> = ({ onBack }) => {
  return (
    <div className="bg-white">
        <div className="container mx-auto px-6 py-12">
            <button 
                onClick={onBack} 
                className="mb-8 text-brand-blue hover:underline text-lg font-semibold"
            >
                &larr; Back to Home
            </button>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-brand-blue">Food & Beverage Supplies</h1>
                <p className="text-gray-600 mt-2">Quality ingredients and supplies for your kitchen.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {FOOD_AND_BEVERAGE_PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default FoodAndBeveragePage;
