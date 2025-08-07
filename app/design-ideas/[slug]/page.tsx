"use client"
import { use } from 'react';
import DesignDetailClient from './DesignDetailClient';

export default function DetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <DesignDetailClient slug={slug} />;
}
