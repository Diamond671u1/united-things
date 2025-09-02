import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-brand-blue text-white relative">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-10" 
            style={{backgroundImage: "url('https://picsum.photos/1600/800?random=99')"}}
        ></div>
        <div className="container mx-auto px-6 py-24 text-center relative z-10">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                Your One-Stop B2B Supply Partner
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                United Things is built on the principle that modern businesses shouldn't waste time coordinating with multiple vendors for basic operational needs. Our centralized sourcing and distribution model ensures streamlined supply, reduced costs, and improved operational efficiency.
            </p>
            <a href="#categories" className="bg-brand-accent text-brand-blue-dark font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105">
                Explore Our Categories
            </a>
        </div>
    </div>
  );
};

export default Hero;
