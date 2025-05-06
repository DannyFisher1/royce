// FILE: royce/app/providers/page.tsx
// --------------------------------------------------------------------------------
// No "use client" here - this is a Server Component again

import { getProviderSummaries } from "@/lib/data";
// Import the new client component
import { ProvidersList } from "@/components/providers-list"; 
import { Button } from "@/components/ui/button"; // Keep for Compare button link if needed outside list
import { GitCompareArrows } from "lucide-react"; // Keep for Compare button link
import Link from "next/link"; // Keep for Compare button link

export default function ProvidersOverviewPage() {
    // Fetch data on the server
    const allProviders = getProviderSummaries();

    // Handle case where data fetching fails or returns empty
    if (!allProviders || allProviders.length === 0) {
        return (
            <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center text-center py-10">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">No Provider Data Found</h1>
                    <p className="text-muted-foreground">Could not load the AI provider summaries.</p>
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

            {/* Optional: Keep Compare button outside the list if desired */}
            <div className="mb-4 flex justify-center dark:text-white"> {/* Adjusted for dark mode */}
                <Link href="/compare">
                    <Button size="sm" className="bg-primary text-black dark:bg-white dark:text-black hover:opacity-90">
                        <GitCompareArrows className="mr-2 h-4 w-4" />
                        Compare Providers
                    </Button>
                </Link>
            </div>

            {/* Render the Client Component with data */}
            <ProvidersList initialProviders={allProviders} />

             {/* Temp display to show data is fetched */}
             {/* <pre>{JSON.stringify(allProviders.slice(0,1), null, 2)}</pre> */}

        </section>
    );
}