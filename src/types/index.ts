export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  description: string;
  stock: number;
  isFlashDeal?: boolean;
  isTrending?: boolean;
  tags?: string[];
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image: string;
  itemCount?: number;
  description?: string;
}

export interface Story {
  id: string;
  title: string;
  thumbnail: string;
  bannerImage: string;
  tagline: string;
  discountNote: string;
  categoryId: string;
  featuredProductId?: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  ctaText: string;
  image: string;
  link: string;
  bgGradient?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  id: string;
  label: string;
  recipient: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'discount' | 'flash' | 'system';
}
