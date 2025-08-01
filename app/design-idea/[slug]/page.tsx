// app/design/[slug]/page.tsx - App Router version
import ProductDetailPage from '../../../components/ProductDetailsPage';
import { 
  ProductData, 
  StrapiApiResponse, 
  StrapiDesignResponse 
} from '../../../lib/types';

// Server Component (no "use client" directive)
async function getDesignData(slug: string): Promise<{ productData?: ProductData; error?: string }> {
  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/design?filters[slug][$eq]=${slug}&populate=deep`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      // Add revalidation if needed
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!response.ok) {
      return { error: 'Design not found' };
    }

    const data: StrapiApiResponse<StrapiDesignResponse[]> = await response.json();
    
    if (!data.data || data.data.length === 0) {
      return { error: 'Design not found' };
    }
    
    const productData = transformStrapiData(data.data[0]);
    return { productData };
  } catch (error) {
    console.error('Error fetching design data:', error);
    return { error: 'Failed to load design data' };
  }
}

// Helper function to transform Strapi data structure
const transformStrapiData = (strapiData: StrapiDesignResponse): ProductData => {
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
    } : null
  };
};

// Main page component
export default async function DesignDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { productData, error } = await getDesignData(params.slug);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return <ProductDetailPage />;
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { productData } = await getDesignData(params.slug);
  
  return {
    title: productData?.title || 'Design Not Found',
    description: `View details for ${productData?.title || 'this design'}`,
  };
}