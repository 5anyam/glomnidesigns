// lib/queries.ts

const baseUrl = "https://cms.proshala.com";
import { ExtendedPost, Category, Author } from "@/lib/types";

const revalidateTime: number = 43200; // half day in seconds

// Define the Post interface with slug and modified properties
interface Post {
  id: number;
  slug: string;  // Add slug property
  modified: string;  // Add modified property (string to handle the date string format)
  title: string;
  content: string;
  // Add other properties specific to your posts
}


export async function getAllPosts(
  pageNumber: number = 1,
  perPage: number = 100,
  searchTerm: string = '',
  categories: number = 0
): Promise<{ posts: ExtendedPost[]; totalPages: number }> {
  const params = new URLSearchParams({
    per_page: perPage.toString(),
    page: pageNumber.toString(),
    search: searchTerm,
    _embed: 'true',
  });

  if (categories !== 0) {
    params.set("categories", categories.toString());
  }

  const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts?${params.toString()}`, {
    next: {
      revalidate: revalidateTime,
    },
  });

  const posts = await response.json();
  const totalPages = parseInt(response.headers.get("X-WP-TotalPages") ?? "1");

  return { posts, totalPages };
}

export async function getPostBySlug(slug: string): Promise<ExtendedPost | null> {
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts?_embed=true&slug=${slug}`, {
    next: {
      revalidate: revalidateTime,
    },
  });
  const post = await response.json();
  return post[0];
}

export async function getAuthorById(id: number): Promise<Author | null> {
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/users/${id}`);
  const author: Author = await response.json();
  return author;
}

export async function getCategoriesByIds(ids: number[]): Promise<Category[]> {
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories?include=${ids.join(",")}`);
  const categories: Category[] = await response.json();
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${slug}`);
  const data = await res.json();
  return data[0] || null;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories`);
  const data = await response.json();
  return data;
}

// Get posts by category ID
export async function getPostsByCategory(categoryId: number, limit: number = 3): Promise<Post[]> {
  const res = await fetch(
    `${baseUrl}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${limit}&_embed`
  );

  if (!res.ok) {
    console.error("Failed to fetch posts by category", await res.text());
    return [];
  }

  const posts: Post[] = await res.json();
  return posts;
}

export async function getAllCategories() {
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/categories?per_page=100`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}