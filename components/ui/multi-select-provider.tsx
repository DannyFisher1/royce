// FILE: components/ui/multi-select-provider.tsx
// --------------------------------------------------------------------------------
"use client";

import { ProviderSummary } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface MultiSelectProviderProps {
    providers: ProviderSummary[];
    selectedSlugs: string[];
    onSelectionChange: (slugs: string[]) => void;
}

export function MultiSelectProvider({ providers, selectedSlugs, onSelectionChange }: MultiSelectProviderProps) {

    const handleCheckedChange = (checked: boolean | 'indeterminate', slug: string) => {
        if (checked === true) {
            onSelectionChange([...selectedSlugs, slug]);
        } else {
            onSelectionChange(selectedSlugs.filter(s => s !== slug));
        }
    };

    return (
        <div>
            <Label className="text-base font-semibold mb-3 block">Select Providers to Compare:</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {providers.map((provider) => (
                    <div key={provider.slug} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-accent transition-colors">
                        <Checkbox
                            id={provider.slug}
                            checked={selectedSlugs.includes(provider.slug)}
                            onCheckedChange={(checked) => handleCheckedChange(checked, provider.slug)}
                        />
                         <Label htmlFor={provider.slug} className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                             {provider.logo && <Image src={provider.logo} alt="" width={16} height={16} className="object-contain rounded-sm" />}
                             {provider.name}
                         </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}