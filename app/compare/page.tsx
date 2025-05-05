// FILE: royce/app/compare/page.tsx
// --------------------------------------------------------------------------------
// REMOVED: "use client";

import { getProviderSummaries } from "@/lib/data"; // Keep data fetching here
// REMOVED client-side imports: useState, useEffect, useMemo
// REMOVED type imports used only in client logic: PillarScores
// REMOVED client UI/animation imports: Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Image, Badge, motion, AnimatePresence, XCircle, Info
// Keep server-only type imports if needed: ProviderSummary
import type { ProviderSummary } from "@/lib/types";
import { CompareProvider } from "@/app/compare/CompareProvider"; // Import the new client component
// REMOVED: MultiSelectProvider, ProviderCompareChart imports (will be in client component)

// Make the function async for server-side data fetching
export default async function CompareProvidersPage() {
    // REMOVED: all useState hooks (allProviders, selectedSlugs, isLoading)

    // Fetch data directly on the server
    let allProviders: ProviderSummary[] = [];
    let fetchError = false;
    try {
        allProviders = getProviderSummaries();
    } catch (error) {
        console.error("Failed to load provider summaries on server:", error);
        fetchError = true;
        // Handle error state appropriately - maybe render an error message or fallback
    }

    // REMOVED: useEffect for fetching data
    // REMOVED: useMemo hooks (selectedProviders, chartData, providerNamesForChart)
    // REMOVED: Animation variants

    // REMOVED: isLoading check

    if (fetchError) {
        // Optionally render a specific error page or component
        return (
            <section className="container mx-auto max-w-7xl py-10 lg:py-16 text-center">
                <h1 className="text-2xl font-semibold text-destructive">Error Loading Providers</h1>
                <p className="text-muted-foreground mt-2">Could not fetch provider data. Please try again later.</p>
            </section>
        );
    }

    // Render the client component and pass the fetched data as a prop
    return (
        <CompareProvider initialProviders={allProviders} />
    );

    /*
    // REMOVED ALL JSX RENDERING LOGIC - moved to CompareProvider.tsx
    return (
        <section className="container mx-auto max-w-7xl py-10 lg:py-16">
             ... header ...
             ... Provider Selection (MultiSelectProvider) ...
             ... Comparison Area (AnimatePresence, motion.div) ...
                 ... Overview section ...
                 ... Pillar Scores Comparison section (ProviderCompareChart) ...
                 ... Compliance Badges section ...
                 ... Analysis Summaries section ...
                 ... Clear Selection Button ...
             ... Placeholder Area (motion.div) ...
        </section>
    );
    */
}