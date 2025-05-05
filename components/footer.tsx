export function Footer() {
    return (
      <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by [Your Name/Team Name]. Inspired by transparency efforts.
            {/* Add GitHub link or other attribution here */}
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Data sourced from provider documentation and public statements. Accuracy not guaranteed.
          </p>
        </div>
      </footer>
    );
  } 