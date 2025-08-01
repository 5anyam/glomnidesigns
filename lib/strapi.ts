// lib/strapi.ts - Typed Strapi utilities
import { 
    StrapiApiResponse, 
    StrapiDesignResponse, 
    ProductData 
  } from './types';
  
  interface FetchAPIOptions {
    headers?: Record<string, string>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: string;
  }
  
  export const fetchAPI = async <T>(
    path: string, 
    urlParamsObject: Record<string, any> = {}, 
    options: FetchAPIOptions = {}
  ): Promise<T> => {
    try {
      // Merge default and user options
      const mergedOptions: RequestInit = {
        headers: {
          "Content-Type": "application/json",
          ...(process.env.STRAPI_TOKEN && {
            Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
          }),
          ...options.headers,
        },
        method: options.method || 'GET',
        ...(options.body && { body: options.body }),
      };
  
      // Build request URL
      const queryString = new URLSearchParams(urlParamsObject).toString();
      const requestUrl = `${process.env.STRAPI_URL || "http://localhost:1337"}/api${path}${
        queryString ? `?${queryString}` : ""
      }`;
  
      // Trigger API call
      const response = await fetch(requestUrl, mergedOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
  
  // Helper functions with proper typing
  export const getDesigns = async (params: Record<string, any> = {}): Promise<StrapiApiResponse<StrapiDesignResponse[]>> => {
    return fetchAPI<StrapiApiResponse<StrapiDesignResponse[]>>("/design", {
      populate: "deep",
      ...params
    });
  };
  
  export const getDesignBySlug = async (slug: string): Promise<StrapiDesignResponse | null> => {
    try {
      const response = await fetchAPI<StrapiApiResponse<StrapiDesignResponse[]>>("/design", {
        populate: "deep",
        filters: {
          slug: {
            $eq: slug,
          },
        },
      });
      
      return response?.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching design by slug:', error);
      return null;
    }
  };
  
  export const getDesignById = async (id: number): Promise<StrapiApiResponse<StrapiDesignResponse>> => {
    return fetchAPI<StrapiApiResponse<StrapiDesignResponse>>(`/design/${id}`, {
      populate: "deep"
    });
  };
  
  // Transform function with proper typing
  export const transformStrapiData = (strapiData: StrapiDesignResponse): ProductData => {
    const { attributes } = strapiData;
    
    return {
      id: strapiData.id,
      title: attributes.title,
      slug: attributes.slug,
      images: attributes.images?.data?.map(img => 
        `${process.env.STRAPI_URL}${img.attributes.url}`
      ) || [],
      features: attributes.features || [],
      details: {
        layout: attributes.layout || '',
        dimensions: attributes.dimensions || '',
        style: attributes.style || '',
        colors: attributes.colors || { baseUnit: '', wallUnit: '' },
        shutterFinish: attributes.shutter_finish || '',
        countertopMaterial: attributes.countertop_material || '',
        storageFeatures: attributes.storage_features || []
      },
      previousProject: attributes.previous_project?.data ? {
        title: attributes.previous_project.data.attributes.title || '',
        image: attributes.previous_project.data.attributes.featured_image?.data?.attributes?.url 
          ? `${process.env.STRAPI_URL}${attributes.previous_project.data.attributes.featured_image.data.attributes.url}`
          : '/api/placeholder/100/80'
      } : null,
      nextProject: attributes.next_project?.data ? {
        title: attributes.next_project.data.attributes.title || '',
        image: attributes.next_project.data.attributes.featured_image?.data?.attributes?.url
          ? `${process.env.STRAPI_URL}${attributes.next_project.data.attributes.featured_image.data.attributes.url}`
          : '/api/placeholder/100/80'
      } : null,
      description: attributes.description,
      priceRange: attributes.price_range,
      roomType: attributes.room_type as ProductData['roomType']
    };
  };
  
  // Custom hooks for data fetching (optional)
  export const useDesigns = () => {
    // You can implement SWR or React Query here for client-side fetching
    // For now, this is just a placeholder structure
  };
  
  // Error handling utilities
  export class StrapiError extends Error {
    constructor(
      message: string,
      public statusCode?: number,
      public details?: any
    ) {
      super(message);
      this.name = 'StrapiError';
    }
  }
  
  export const handleStrapiError = (error: any): StrapiError => {
    if (error instanceof StrapiError) {
      return error;
    }
    
    return new StrapiError(
      error.message || 'An unknown error occurred',
      error.statusCode,
      error.details
    );
  };