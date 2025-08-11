// lib/api.ts - Completely New Approach
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elegant-charity-710d3644d3.strapiapp.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Simple Types
export interface Design {
  id: number;
  title: string;
  description?: string;
  tags?: string | string[];
  featured_image?: { url: string; alternativeText?: string };
  images?: Array<{ url: string; alternativeText?: string }>;
  price_range?: string;
  style?: string;
  area_size?: number;
  location?: string;
  completion_time?: string;
  is_featured?: boolean;
  slug: string;
  categories?: Array<{ id: number; name: string; slug: string }>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  type?: string;
}

// Simple API Functions
export const designAPI = {
  // Get all designs
  async getAll() {
    try {
      const { data } = await api.get('/designs?populate=*');
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, data: [], error: 'Failed to fetch designs' };
    }
  },

  // Get design by slug
  async getBySlug(slug: string) {
    try {
      const { data } = await api.get(`/designs?filters[slug][$eq]=${slug}&populate=*`);
      const designs = data.data || data || [];
      const design = designs.find((d: Design) => d.slug === slug) || designs[0] || null;
      return { success: true, data: design };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, data: null, error: 'Design not found' };
    }
  },

  // Get designs by category
  async getByCategory(categorySlug: string) {
    try {
      const { data } = await api.get(`/designs?filters[categories][slug][$eq]=${categorySlug}&populate=*`);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, data: [], error: 'Failed to fetch category designs' };
    }
  },

  // Search designs
  async search(query: string) {
    try {
      const { data } = await api.get(`/designs?filters[title][$containsi]=${query}&populate=*`);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, data: [], error: 'Search failed' };
    }
  }
};

export const categoryAPI = {
  async getAll() {
    try {
      const { data } = await api.get('/categories?populate=*');
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, data: [], error: 'Failed to fetch categories' };
    }
  }
};

// Simple Portfolio API
export const portfolioAPI = {
  async getAll() {
    try {
      const { data } = await api.get('/portfolios?populate=*');
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, data: [], error: 'Failed to fetch portfolios' };
    }
  }
};
