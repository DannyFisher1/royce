// FILE: royce/app/providers/page.tsx
// --------------------------------------------------------------------------------
import { getProviderSummaries } from "@/lib/data";
import { ProviderCard } from "@/components/provider-card";
import { Button } from "@/components/ui/button"; // Import Button
import { GitCompareArrows, ListFilter, ArrowDownUp } from "lucide-react"; // Import icons
import Link from "next/link"; // Import Link for Compare button

// This page can remain a Server Component as interaction (filtering/sorting) is not yet implemented.
export default function ProvidersOverviewPage() {
    // Fetch data on the server
    const providers = getProviderSummaries();

    // Handle case where data fetching fails or returns empty
    if (!providers || providers.length === 0) {
        return (
            <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center text-center py-10">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">No Provider Data Found</h1>
                    <p className="text-muted-foreground">Could not load the AI provider summaries.</p>
                    {/* Optional: Add a retry or back button */}
                </div>
            </div>
        );
    }

    return (
        <section className="container mx-auto max-w-7xl py-10 lg:py-16">

            {/* Page Title & Intro */}
            <header className="mb-8 lg:mb-12 text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-3">
                    AI Providers Overview
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explore and compare safety profiles across leading AI models. Click a card to view the detailed dossier.
                </p>
            </header>

             {/* Action Bar */}
             <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border rounded-lg bg-card shadow-sm">
                 {/* Left Side: Compare Action */}
                 <Link href="/compare" passHref legacyBehavior>
                     <Button size="sm">
                         <GitCompareArrows className="mr-2 h-4 w-4" />
                         Compare Providers
                     </Button>
                     {/* TODO: Add logic later to enable this button based on selection */}
                     {/* <span className="text-xs text-muted-foreground ml-2">(Select cards to compare)</span> */}
                 </Link>

                 {/* Right Side: Filter/Sort Placeholders */}
                 <div className="flex items-center gap-2">
                     <Button variant="outline" size="sm" disabled className="cursor-not-allowed">
                         <ListFilter className="mr-2 h-4 w-4" /> Filter
                     </Button>
                     <Button variant="outline" size="sm" disabled className="cursor-not-allowed">
                         <ArrowDownUp className="mr-2 h-4 w-4" /> Sort By: Score
                     </Button>
                 </div>
             </div>

            {/* Provider Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {/* Map over providers and render the already redesigned ProviderCard */}
                {providers.map((provider) => (
                    <ProviderCard key={provider.slug} provider={provider} />
                ))}
            </div>

        </section>
    );
}