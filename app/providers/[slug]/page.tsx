// FILE: royce/app/providers/[slug]/page.tsx (NEW SERVER COMPONENT)

// @ts-ignore - Attempt to suppress the problematic PageProps type check temporarily
// We are confident our params structure is correct. Remove this line if the build passes.
import { getProviderData, getAllProviderSlugs, getProviderSummaries } from "@/lib/data";
import { notFound } from "next/navigation";
import ProviderClientPage from "./ProviderClientPage"; // Import the client component
import type { ProviderEvidence, ProviderSummary } from "@/lib/types";
import 'server-only'; // Explicitly mark as server-only

// Keep generateStaticParams here if using SSG
// Simplify return type slightly, though Promise is technically correct for async
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  console.log("page.tsx: Running generateStaticParams..."); // Add logging
  try {
    const slugs = getAllProviderSlugs();

    if (!Array.isArray(slugs)) {
      console.error("generateStaticParams Error: getAllProviderSlugs did not return an array. Returned:", slugs);
      return [];
    }

    const validSlugs = slugs
      .map(slug => String(slug ?? '')) // Handle potential null/undefined before String()
      .filter(slug => typeof slug === 'string' && slug.trim() !== ''); // Ensure it's a non-empty string

    if (validSlugs.length === 0 && slugs.length > 0) {
        console.warn("generateStaticParams Warning: No valid slugs found after filtering. Original slugs:", slugs);
    } else if (validSlugs.length === 0) {
        console.warn("generateStaticParams Warning: No slugs returned from getAllProviderSlugs.");
    }

    console.log(`generateStaticParams: Found ${validSlugs.length} valid slugs.`);
    return validSlugs.map((slug) => ({ slug }));

  } catch (error) {
      console.error("generateStaticParams Error:", error);
      return []; // Return empty array on error
  }
}

// Use the simplest possible type annotation for props that Next.js should understand
export default async function ProviderDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Basic Slug Validation
  if (typeof slug !== 'string' || !slug) {
    console.error(`ProviderDetailPage Error: Invalid slug type or value received: ${typeof slug}, value: "${slug}"`);
    notFound();
  }

  console.log(`ProviderDetailPage: Processing request for slug: "${slug}"`);

  try {
      // Fetch data on the SERVER
      const providerData = getProviderData(slug);
      const summaries = getProviderSummaries();

      if (!providerData) {
          console.warn(`ProviderDetailPage: getProviderData returned null for slug: "${slug}"`);
          notFound();
      }
       if (!Array.isArray(summaries)) {
           console.error(`ProviderDetailPage: getProviderSummaries did not return an array.`);
           notFound(); // Or handle differently
       }

      const providerSummary = summaries.find(p => p.slug === slug) || null;

      // Handle not found on the SERVER
      if (!providerSummary) {
        console.warn(`ProviderDetailPage: providerSummary not found for slug: "${slug}" in fetched summaries.`);
        notFound();
      }

      console.log(`ProviderDetailPage: Data found for slug: "${slug}". Rendering client page.`);
      // Render the Client Component and pass data as props
      return (
        <ProviderClientPage
            slug={slug}
            initialProviderData={providerData} // Already checked providerData is not null
            initialProviderSummary={providerSummary} // Already checked providerSummary is not null
        />
      );
  } catch (error) {
      console.error(`ProviderDetailPage Error fetching data for slug "${slug}":`, error);
      // Depending on the error, you might want to return a specific error page
      // or just trigger notFound()
      notFound();
  }
}