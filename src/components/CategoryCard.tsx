import React from 'react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: (path?: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div onClick={() => onClick(category.path)} className="group flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 cursor-pointer active:scale-95">
      <div className="text-brand-blue group-hover:text-brand-accent transition-colors duration-300">
        {category.icon}
      </div>
      <h3 className="mt-4 font-semibold text-center text-brand-text">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
