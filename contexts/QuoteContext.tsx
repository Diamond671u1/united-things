
import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Product, QuoteItem } from '../types';

interface QuoteContextType {
  quoteItems: QuoteItem[];
  addToQuote: (product: Product, quantity: number) => void;
  removeFromQuote: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearQuote: () => void;
  itemCount: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const addToQuote = (product: Product, quantity: number) => {
    setQuoteItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromQuote = (productId: number) => {
    setQuoteItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(productId);
    } else {
      setQuoteItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const itemCount = quoteItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <QuoteContext.Provider
      value={{
        quoteItems,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        clearQuote,
        itemCount,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
