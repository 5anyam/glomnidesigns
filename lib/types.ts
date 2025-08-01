// types/product.ts
export interface Feature {
  icon: string;
  title: string;
}

export interface Colors {
  baseUnit: string;
  wallUnit: string;
}

export interface ProjectReference {
  title: string;
  image: string;
}

export interface ProductDetails {
  layout: string;
  dimensions: string;
  style: string;
  colors: Colors;
  shutterFinish: string;
  countertopMaterial: string;
  storageFeatures: string[];
}



export interface ProductData {
  id: number;
  title: string;
  slug?: string;
  images: string[];
  features: Feature[];
  details: ProductDetails;
  previousProject: ProjectReference | null;
  nextProject: ProjectReference | null;
  description?: string;
  priceRange?: string;
  roomType?: 'kitchen' | 'bedroom' | 'living-room' | 'bathroom' | 'office' | 'dining-room';
}

// Strapi API response types
export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
  };
}

export interface StrapiImageResponse {
  data: StrapiImage[];
}

export interface StrapiSingleImageResponse {
  data: StrapiImage;
}

export interface StrapiDesignAttributes {
  title: string;
  slug: string;
  layout: string;
  dimensions: string;
  style: string;
  colors: Colors;
  shutter_finish: string;
  countertop_material: string;
  storage_features: string[];
  features: Feature[];
  description?: string;
  price_range?: string;
  room_type?: string;
  images: StrapiImageResponse;
  featured_image?: StrapiSingleImageResponse;
  previous_project?: {
    data: {
      id: number;
      attributes: {
        title: string;
        slug: string;
        featured_image?: StrapiSingleImageResponse;
      };
    };
  };
  next_project?: {
    data: {
      id: number;
      attributes: {
        title: string;
        slug: string;
        featured_image?: StrapiSingleImageResponse;
      };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiDesignResponse {
  id: number;
  attributes: StrapiDesignAttributes;
}

export interface StrapiApiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Props interfaces
export interface ProductDetailPageProps {
  productData: ProductData;
}

export interface DesignPageProps {
  productData: ProductData;
  error?: string;
}