// FILE: royce/components/header.tsx
// --------------------------------------------------------------------------------
'use client';
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react"; // Added an icon for branding
import { usePathname } from 'next/navigation'; // Hook to check current path

export function Header() {
    const pathname = usePathname(); // Get current route

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/providers", label: "Providers Overview" },
        { href: "/compare", label: "Compare" },
        { href: "/methodology", label: "Methodology" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8"> {/* Adjusted padding */}

                {/* Branding */}
                <div className="mr-4 flex"> {/* Removed hidden md:flex */}
                    <Link href="/" className="mr-6 flex items-center space-x-2 group">
                        <ShieldCheck className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
                        <span className="font-bold text-foreground group-hover:text-foreground/80 transition-colors sm:inline-block">
                           Royce Safety Exhibit {/* Updated Name */}
                        </span>
                    </Link>
                </div>

                 {/* Desktop Navigation */}
                 <nav className="hidden md:flex items-center gap-5 text-sm flex-grow"> {/* Use flex-grow to push theme toggle right */}
                     {navLinks.map((link) => (
                         <Link
                             key={link.href}
                             href={link.href}
                             className={cn(
                                 "transition-colors hover:text-foreground/80",
                                 pathname === link.href
                                     ? "text-foreground font-medium" // Active link style
                                     : "text-muted-foreground"
                             )}
                         >
                             {link.label}
                         </Link>
                     ))}
                 </nav>


                {/* Mobile Navigation Placeholder & Theme Toggle */}
                <div className="flex flex-1 items-center justify-end space-x-2">
                     {/* TODO: Add Mobile Nav Drawer/Button here if needed */}
                     {/* <Button variant="ghost" size="icon" className="md:hidden">
                         <Menu className="h-5 w-5" />
                         <span className="sr-only">Toggle Menu</span>
                     </Button> */}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}