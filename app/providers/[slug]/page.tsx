// FILE: royce/app/providers/[slug]/page.tsx (NEW SERVER COMPONENT)
import { getProviderData, getAllProviderSlugs, getProviderSummaries } from "@/lib/data";
import { notFound } from "next/navigation";
import ProviderClientPage from "./ProviderClientPage"; // Import the client component
import type { ProviderEvidence, ProviderSummary } from "@/lib/types";

// Keep generateStaticParams here if using SSG
export async function generateStaticParams() {
  const slugs = getAllProviderSlugs();
  return slugs.map((slug) => ({ slug }));
}

// This is now an async Server Component
export default async function ProviderDetailPage({ params: { slug } }: { params: { slug: string } }) {
  // Fetch data on the SERVER
  const providerData = getProviderData(slug);
  const summaries = getProviderSummaries();
  const providerSummary = summaries.find(p => p.slug === slug) || null;

  // Handle not found on the SERVER
  if (!providerData || !providerSummary) {
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