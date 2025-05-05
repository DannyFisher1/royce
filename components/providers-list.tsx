"use client";

import { useState, useMemo } from "react";
import { ProviderSummary } from "@/lib/types";
import { ProviderCard } from "./provider-card";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from "./ui/dropdown-menu";
import { ListFilter, ArrowDownUp, X } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProvidersListProps {
  initialProviders: ProviderSummary[];
}

export function ProvidersList({ initialProviders }: ProvidersListProps) {
  const [providers] = useState<ProviderSummary[]>(initialProviders || []);
  const [sortConfig, setSortConfig] = useState<{
    field: keyof ProviderSummary | "name";
    order: "asc" | "desc";
  }>({ field: "overall_score", order: "desc" });

  // --- Filter State ---
  const [filterTiers, setFilterTiers] = useState<string[]>([]);

  // Get unique tiers from the data for filter options
  const availableTiers = useMemo(() => {
    const tiers = new Set(providers.map(p => p.tier).filter(Boolean));
    return Array.from(tiers) as string[];
  }, [providers]);

  // --- Processed Providers (Filter then Sort) ---
  const processedProviders = useMemo(() => {
    let filteredItems = [...providers];

    // Apply Tier Filter
    if (filterTiers.length > 0) {
        filteredItems = filteredItems.filter(p => p.tier && filterTiers.includes(p.tier));
    }

    // Apply Sorting (to the filtered list)
    filteredItems.sort((a, b) => {
      let aValue: string | number | undefined;
      let bValue: string | number | undefined;

      if (sortConfig.field === "name") {
        aValue = a.name;
        bValue = b.name;
      } else if (sortConfig.field === "overall_score") {
        aValue = a.overall_score;
        bValue = b.overall_score;
      }

      if (aValue === undefined || bValue === undefined) return 0;

      if (aValue < bValue) {
        return sortConfig.order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.order === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filteredItems;
  }, [providers, sortConfig, filterTiers]);

  // --- Handlers ---
  const handleSort = (field: keyof ProviderSummary | "name") => {
    setSortConfig((current) => ({
      field,
      order:
        current.field === field && current.order === "desc" ? "asc" : "desc",
    }));
  };

  const handleTierChange = (tier: string) => {
    setFilterTiers(currentTiers =>
        currentTiers.includes(tier)
        ? currentTiers.filter(t => t !== tier)
        : [...currentTiers, tier]
    );
  };

  const clearFilters = () => {
    setFilterTiers([]);
  };

  const getSortLabel = () => {
    switch (sortConfig.field) {
      case "overall_score":
        return `Score (${sortConfig.order === "desc" ? "High-Low" : "Low-High"})`;
      case "name":
        return `Name (${sortConfig.order === "asc" ? "A-Z" : "Z-A"})`;
      default:
        return "Sort By";
    }
  };

  const activeFilterCount = filterTiers.length;

  return (
    <div>
      {/* Filter/Sort Controls */}
      <div className="mb-8 flex items-center justify-end gap-2">
        {/* Filter Dropdown */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Button variant="outline" size="sm">
                     <ListFilter className="mr-2 h-4 w-4" />
                     Filter
                     {activeFilterCount > 0 && (
                         <Badge variant="secondary" className="ml-2 rounded-full px-1.5 py-0 text-[10px]">
                             {activeFilterCount}
                         </Badge>
                     )}
                 </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end" className="w-56">
                 <DropdownMenuLabel>Filter by Tier</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 {availableTiers.sort().map((tier) => (
                     <DropdownMenuCheckboxItem
                        key={tier}
                        checked={filterTiers.includes(tier)}
                        onCheckedChange={() => handleTierChange(tier)}
                        onSelect={(e) => e.preventDefault()}
                     >
                         {tier}
                     </DropdownMenuCheckboxItem>
                 ))}
                 {activeFilterCount > 0 && (
                     <>
                         <DropdownMenuSeparator />
                         <DropdownMenuItem onSelect={clearFilters} className="text-red-600 focus:text-red-700 focus:bg-red-50">
                             <X className="mr-2 h-4 w-4" /> Clear All Filters
                         </DropdownMenuItem>
                     </>
                 )}
             </DropdownMenuContent>
         </DropdownMenu>

        {/* Sort Dropdown */}
        <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="outline" size="sm">
               <ArrowDownUp className="mr-2 h-4 w-4" /> {getSortLabel()}
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end">
             <DropdownMenuItem onSelect={() => handleSort("overall_score")}>
               Overall Score{" "}
               {sortConfig.field === "overall_score" &&
                 (sortConfig.order === "desc" ? "(High-Low)" : "(Low-High)")}
             </DropdownMenuItem>
             <DropdownMenuItem onSelect={() => handleSort("name")}>
               Name{" "}
               {sortConfig.field === "name" &&
                 (sortConfig.order === "asc" ? "(A-Z)" : "(Z-A)")}
             </DropdownMenuItem>
           </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Provider Grid */}
      {processedProviders.length > 0 ? (
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {processedProviders.map((provider) => (
             <ProviderCard key={provider.slug} provider={provider} />
            ))}
         </div>
       ) : (
         <p className="text-center text-muted-foreground py-8">
            {activeFilterCount > 0 ? "No providers match the current filters." : "No providers found."}
         </p>
       )}
    </div>
  );
} 