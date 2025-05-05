// FILE: royce/app/providers/[slug]/page.tsx (NEW SERVER COMPONENT)
import { getProviderData, getAllProviderSlugs, getProviderSummaries } from "@/lib/data";
import { notFound } from "next/navigation";
import ProviderClientPage from "./ProviderClientPage"; // Import the client component
import type { ProviderEvidence, ProviderSummary } from "@/lib/types";

// Remove the custom PageProps type definition
// type PageProps = {
//   params: { slug: string };
//   searchParams?: { [key: string]: string | string[] | undefined };
// };

// Keep generateStaticParams here if using SSG
export async function generateStaticParams() {
  const slugs = getAllProviderSlugs();
  if (!slugs || slugs.length === 0) {
      console.warn("generateStaticParams: No slugs found.");
      return [];
  }
  return slugs.map((slug) => {
      if (typeof slug !== 'string') {
          console.warn(`generateStaticParams: Found non-string slug: ${slug}`);
          // Handle appropriately, maybe filter out or convert
          return { slug: String(slug) }; // Example: convert to string
      }
      return { slug };
  });
}


// Remove the explicit PageProps type annotation and let TypeScript infer
export default async function ProviderDetailPage({ params }: { params: { slug: string } }) {
  // params should be correctly inferred as { slug: string } by Next.js
  const { slug } = params;

  // --- Basic Slug Validation ---
  if (typeof slug !== 'string' || !slug) {
    console.error("Invalid slug received:", slug);
    notFound(); // Treat invalid slug as not found
  }
  // --------------------------

  // Fetch data on the SERVER
  const providerData = getProviderData(slug);
  const summaries = getProviderSummaries();
  const providerSummary = summaries.find(p => p.slug === slug) || null;

  // Handle not found on the SERVER
  if (!providerData || !providerSummary) {
    console.log(`Data not found for slug: ${slug}`);
    notFound(); // Use the Next.js notFound function
  }

  // Render the Client Component and pass data as props
  return (
    <ProviderClientPage
        slug={slug} // Pass slug if needed client-side
        initialProviderData={providerData}
        initialProviderSummary={providerSummary}
    />
  );
}