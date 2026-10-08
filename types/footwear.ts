export type ProductCategory = 
  | 'Sneakers'
  | 'Formal Shoes'
  | 'Casual Shoes'
  | 'Boots'
  | 'Loafers'
  | 'Sports Shoes'
  | 'Sandals';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage?: string;
  additionalImages: string[];
  colors: ProductColor[];
  sizes: number[]; // US sizes e.g. 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12
  description: string;
  features: string[];
  materials: string;
  careInstructions: string;
  badge?: 'NEW' | 'SALE' | 'BEST SELLER' | 'LIMITED EDITION';
  inStock: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // composed key
  product: Product;
  size: number;
  color: ProductColor;
  quantity: number;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  itemCount: number;
  image: string;
  tagline: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  productName: string;
}

export interface FilterState {
  category: string;
  sizes: number[];
  colors: string[];
  priceRange: [number, number];
  brand: string[];
  minRating: number;
  availability: 'all' | 'in_stock';
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price_asc' | 'price_desc' | 'best_rated';
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'upi' | 'cod' | 'netbanking';
}
