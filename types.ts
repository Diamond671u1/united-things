
export interface Category {
  name: string;
  icon: React.ReactNode;
  path?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
}