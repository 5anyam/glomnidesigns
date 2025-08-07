// lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elegant-charity-710d3644d3.strapiapp.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Types
export interface Design {
  id: number;
  title: string;
  description?: string;
  tags: string;
  images?: Array<{
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  }>;
  featured_image?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  price_range?: string;
  style?: 'modern' | 'traditional' | 'contemporary' | 'minimalist' | 'luxury';
  area_size?: number;
  location?: string;
  completion_time?: string;
  is_featured?: boolean;
  slug: string;
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
    type: 'home_interior' | 'office_interior';
  }>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: 'home_interior' | 'office_interior';
  description?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

export interface Portfolio {
  id: number;
  name: string;
  slug: string;
  description?: string;
  area?: string;
  location?: string;
  images?: Array<{
    id: number;
    url: string;
    alternativeText?: string;
  }>;
  featured_image?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
}

// API Functions
export const designAPI = {
  // Get all designs
  getDesigns: async (params?: any) => {
    const response = await api.get('/designs', { params });
    return response.data;
  },

  // Get featured designs
  getFeaturedDesigns: async () => {
    const response = await api.get('/designs/featured');
    return response.data;
  },

  // Get designs by category
  getDesignsByCategory: async (categorySlug: string) => {
    const response = await api.get(`/designs/category/${categorySlug}`);
    return response.data;
  },

  // Search designs
  searchDesigns: async (params: any) => {
    const response = await api.get('/designs/search', { params });
    return response.data;
  },

  // Get single design
  getDesign: async (id: number) => {
    const response = await api.get(`/designs/${id}`);
    return response.data;
  },
  getDesignBySlug: async (slug: string) => {
    const response = await api.get(`/designs/slug/${slug}`);
    return response.data;
  }
};

export const categoryAPI = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get categories by type
  getCategoriesByType: async (type: 'home_interior' | 'office_interior') => {
    const response = await api.get(`/categories/type/${type}`);
    return response.data;
  },
};

export const portfolioAPI = {
  // Get all portfolios
  getPortfolios: async () => {
    const response = await api.get('/portfolios');
    return response.data;
  },

  // Search portfolios
  searchPortfolios: async (params: any) => {
    const response = await api.get('/portfolios/search', { params });
    return response.data;
  },
};
