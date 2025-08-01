export const fetchAPI = async (path, urlParamsObject = {}, options = {}) => {
    try {
      // Merge default and user options
      const mergedOptions = {
        headers: {
          "Content-Type": "application/json",
          ...(process.env.STRAPI_TOKEN && {
            Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
          }),
        },
        ...options,
      };
  
      // Build request URL
      const queryString = new URLSearchParams(urlParamsObject).toString();
      const requestUrl = `${process.env.STRAPI_URL || "http://localhost:1337"}/api${path}${
        queryString ? `?${queryString}` : ""
      }`;
  
      // Trigger API call
      const response = await fetch(requestUrl, mergedOptions);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
  
  // Helper functions
  export const getDesigns = async (params = {}) => {
    return fetchAPI("/designs", {
      populate: "deep",
      ...params
    });
  };
  
  export const getDesignBySlug = async (slug) => {
    const designs = await fetchAPI("/design", {
      populate: "deep",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    });
    
    return designs?.data?.[0] || null;
  };
  
  export const getDesignById = async (id) => {
    return fetchAPI(`/design/${id}`, {
      populate: "deep"
    });
  };
  