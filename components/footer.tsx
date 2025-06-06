import { Heart } from "lucide-react";

export function Footer() {
    return (
      <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            {/* Add GitHub link or other attribution here */}
          </p>
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with <Heart className="inline-block h-4 w-4 text-red-500" /> by Danny, Jeb, and Lawrenz
          </p>
        </div>
      </footer>
    );
  } 