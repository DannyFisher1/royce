// FILE: royce/app/providers/[slug]/page.tsx (NEW SERVER COMPONENT)
import { getProviderData, getAllProviderSlugs, getProviderSummaries } from "@/lib/data";
import { notFound } from "next/navigation";
import ProviderClientPage from "./ProviderClientPage"; // Import the client component
import type { ProviderEvidence, ProviderSummary } from "@/lib/types";

// Define the expected props structure explicitly for this dynamic page
// Using a unique name to avoid potential global conflicts
interface DynamicProviderPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined }; // Include optional searchParams
}

// Keep generateStaticParams here if using SSG
export async function generateStaticParams(): Promise<{ slug: string }[]> { // Add explicit return type
  const slugs = getAllProviderSlugs();

  // Add more robust checking and filtering for slugs
  if (!Array.isArray(slugs)) {
      console.warn("generateStaticParams in page.tsx: getAllProviderSlugs did not return an array.");
      return [];
  }

  const validSlugs = slugs
      .map(slug => String(slug)) // Ensure slugs are strings
      .filter(slug => slug && slug.trim() !== ''); // Filter out empty or invalid slugs

  if (validSlugs.length === 0) {
      console.warn("generateStaticParams in page.tsx: No valid slugs found after filtering.");
  }

  return validSlugs.map((slug) => ({ slug }));
}


// Use the explicitly defined type for the props parameter
export default async function ProviderDetailPage({ params }: DynamicProviderPageProps) {
  const { slug } = params;

  // Basic Slug Validation
  if (typeof slug !== 'string' || !slug) {
    console.error("ProviderDetailPage: Invalid slug received:", slug);
    notFound();
  }

  // Add logging before fetching
  console.log(`ProviderDetailPage: Attempting to fetch data for slug: "${slug}"`);

  // Fetch data on the SERVER
  const providerData = getProviderData(slug);
  const summaries = getProviderSummaries();
  const providerSummary = summaries.find(p => p.slug === slug) || null;

  // Handle not found on the SERVER
  if (!providerData || !providerSummary) {
    console.log(`ProviderDetailPage: Data could not be found for slug: "${slug}"`);
    notFound();
  }

  // Log success before rendering client component
  console.log(`ProviderDetailPage: Data found for slug: "${slug}". Rendering client page.`);

  // Render the Client Component and pass data as props
  return (
    <ProviderClientPage
        slug={slug} // Pass slug if needed client-side
        initialProviderData={providerData}
        initialProviderSummary={providerSummary}
    />
  );
}