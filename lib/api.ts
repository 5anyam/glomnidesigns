// lib/api.ts - Fixed Version
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://elegant-charity-710d3644d3.strapiapp.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interfaces remain the same
export interface Interior {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  featured_image?: {
    url: string;
    alternativeText?: string;
  };
  gallery_images?: Array<{
    url: string;
    alternativeText?: string;
  }>;
  service_category?: {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    color?: string;
  };
  starting_price?: number;
  price_range?: string;
  duration?: string;
  features?: string[];
  process_steps?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  is_featured?: boolean;
  is_popular?: boolean;
  order_position?: number;
  meta_title?: string;
  meta_description?: string;
}

export interface InteriorCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  services?: Interior[];
}

export interface Design {
  id: number;
  name: string;
  description: string;
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
  description: string;
  image?: { url: string; };
  type?: string;
}

// ✅ FIXED: Interior API using consistent axios
export const interiorAPI = {
  async getAll() {
    try {
      const { data } = await api.get('/services?populate=*'); // Changed to correct endpoint
      return {
        success: true,
        data: data.data || data || []
      };
    } catch (error) {
      console.error('Interior API Error:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to load interior services'
      };
    }
  },

  async getFeatured() {
    try {
      const { data } = await api.get('/services/featured/list');
      return {
        success: true,
        data: data.data || []
      };
    } catch (error) {
      console.error('Featured API Error:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to load featured services'
      };
    }
  },

  async getBySlug(slug: string) {
    try {
      const { data } = await api.get(`/services/slug/${slug}`);
      return {
        success: true,
        data: data.data || null
      };
    } catch (error) {
      console.error('Slug API Error:', error);
      return {
        success: false,
        data: null,
        error: 'Service not found'
      };
    }
  }
};

export const interiorCategoryAPI = {
  async getAll() {
    try {
      const { data } = await api.get('/service-categories?populate=*');
      return {
        success: true,
        data: data.data || []
      };
    } catch (error) {
      console.error('Category API Error:', error);
      return {
        success: false,
        data: [],
        error: 'Failed to load service categories'
      };
    }
  }
};

// ✅ FIXED: Design API with correct endpoints
export const designAPI = {
  // Get all designs - FIXED endpoint
  async getAll() {
    try {
      const { data } = await api.get('/designs?populate=*'); // ✅ Changed from /design-ideas to /designs
      console.log('✅ Designs API Response:', data);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('❌ Designs API Error:', error);
      return { success: false, data: [], error: 'Failed to fetch designs' };
    }
  },

  // Get design by slug - FIXED
  async getBySlug(slug: string) {
    try {
      const { data } = await api.get(`/designs?filters[slug][$eq]=${slug}&populate=*`);
      console.log('✅ Design by slug response:', data);
      const designs = data.data || data || [];
      const design = designs.find((d: Design) => d.slug === slug) || designs[0] || null;
      return { success: true, data: design };
    } catch (error) {
      console.error('❌ Design by slug error:', error);
      return { success: false, data: null, error: 'Design not found' };
    }
  },

  // Get designs by category - FIXED
  async getByCategory(categorySlug: string) {
    try {
      const { data } = await api.get(`/designs?filters[categories][slug][$eq]=${categorySlug}&populate=*`);
      console.log('✅ Category designs response:', data);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('❌ Category designs error:', error);
      return { success: false, data: [], error: 'Failed to fetch category designs' };
    }
  },

  // Search designs - FIXED
  async search(query: string) {
    try {
      const { data } = await api.get(`/designs?filters[title][$containsi]=${query}&populate=*`);
      console.log('✅ Search designs response:', data);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('❌ Search error:', error);
      return { success: false, data: [], error: 'Search failed' };
    }
  }
};

// ✅ FIXED: Category API
export const categoryAPI = {
  async getAll() {
    try {
      const { data } = await api.get('/categories?populate=*');
      console.log('✅ Categories API Response:', data);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('❌ Categories API Error:', error);
      return { success: false, data: [], error: 'Failed to fetch categories' };
    }
  }
};

// ✅ FIXED: Portfolio API
export const portfolioAPI = {
  async getAll() {
    try {
      const { data } = await api.get('/portfolios?populate=*');
      console.log('✅ Portfolios API Response:', data);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('❌ Portfolios API Error:', error);
      return { success: false, data: [], error: 'Failed to fetch portfolios' };
    }
  }
};
