// lib/api.ts - Updated Version with Category Slug Support
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

// ✅ Interior API using consistent axios
export const interiorAPI = {
  async getAll() {
    try {
      const { data } = await api.get('/services?populate=*');
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

// ✅ Enhanced Design API with all required methods
export const designAPI = {
  // Get all designs
  async getAll() {
    try {
      const { data } = await api.get('/designs?populate=*');
      console.log('✅ Designs API Response:', data);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('❌ Designs API Error:', error);
      return { success: false, data: [], error: 'Failed to fetch designs' };
    }
  },

  // Get design by slug
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

  // Get designs by category slug
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

  // Search designs
  async search(query: string) {
    try {
      const { data } = await api.get(`/designs?filters[name][$containsi]=${query}&populate=*`);
      console.log('✅ Search designs response:', data);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('❌ Search error:', error);
      return { success: false, data: [], error: 'Search failed' };
    }
  }
};

// ✅ Enhanced Category API with getBySlug method
export const categoryAPI = {
  // Get all categories
  async getAll() {
    try {
      const { data } = await api.get('/categories?populate=*');
      console.log('✅ Categories API Response:', data);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error('❌ Categories API Error:', error);
      return { success: false, data: [], error: 'Failed to fetch categories' };
    }
  },

  // ✅ NEW: Get category by slug
  async getBySlug(slug: string) {
    try {
      const { data } = await api.get(`/categories?filters[slug][$eq]=${slug}&populate=*`);
      console.log('✅ Category by slug response:', data);
      const categories = data.data || data || [];
      const category = categories.find((c: Category) => c.slug === slug) || categories[0] || null;
      return { success: true, data: category };
    } catch (error) {
      console.error('❌ Category by slug error:', error);
      return { success: false, data: null, error: 'Category not found' };
    }
  },

  // ✅ NEW: Get category with designs count
  async getCategoryWithCount(slug: string) {
    try {
      // Get category info
      const categoryResult = await this.getBySlug(slug);
      if (!categoryResult.success) {
        return categoryResult;
      }

      // Get designs count for this category
      const designsResult = await designAPI.getByCategory(slug);
      const designCount = designsResult.success ? designsResult.data.length : 0;

      return {
        success: true,
        data: {
          ...categoryResult.data,
          designCount
        }
      };
    } catch (error) {
      console.error('❌ Category with count error:', error);
      return { success: false, data: null, error: 'Failed to load category data' };
    }
  }
};

// ✅ Portfolio API
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
  },

  // ✅ NEW: Get portfolio by slug
  async getBySlug(slug: string) {
    try {
      const { data } = await api.get(`/portfolios?filters[slug][$eq]=${slug}&populate=*`);
      console.log('✅ Portfolio by slug response:', data);
      const portfolios = data.data || data || [];
      const portfolio = portfolios.find((p: any) => p.slug === slug) || portfolios[0] || null;
      return { success: true, data: portfolio };
    } catch (error) {
      console.error('❌ Portfolio by slug error:', error);
      return { success: false, data: null, error: 'Portfolio not found' };
    }
  }
};

// ✅ NEW: Generic API helper for custom queries
export const apiHelper = {
  // Custom query builder
  async customQuery(endpoint: string, filters?: Record<string, any>, populate = '*') {
    try {
      let url = `/${endpoint}`;
      const params = new URLSearchParams();

      if (populate) {
        params.append('populate', populate);
      }

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (typeof value === 'object') {
            Object.entries(value).forEach(([operator, val]) => {
              params.append(`filters[${key}][${operator}]`, String(val));
            });
          } else {
            params.append(`filters[${key}]`, String(value));
          }
        });
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const { data } = await api.get(url);
      console.log(`✅ Custom query response for ${endpoint}:`, data);
      return { success: true, data: data.data || data || [] };
    } catch (error) {
      console.error(`❌ Custom query error for ${endpoint}:`, error);
      return { success: false, data: [], error: 'Query failed' };
    }
  },

  // Get entries with pagination
  async getPaginated(endpoint: string, page = 1, pageSize = 25, filters?: Record<string, any>) {
    try {
      const params = new URLSearchParams({
        'pagination[page]': String(page),
        'pagination[pageSize]': String(pageSize),
        populate: '*'
      });

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          params.append(`filters[${key}]`, String(value));
        });
      }

      const { data } = await api.get(`/${endpoint}?${params.toString()}`);
      console.log(`✅ Paginated response for ${endpoint}:`, data);
      
      return {
        success: true,
        data: data.data || [],
        meta: data.meta || {}
      };
    } catch (error) {
      console.error(`❌ Pagination error for ${endpoint}:`, error);
      return { success: false, data: [], meta: {}, error: 'Pagination failed' };
    }
  }
};

// ✅ Export default api instance for custom usage
export default api;
