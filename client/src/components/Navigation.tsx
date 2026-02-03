import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "Theme", href: "#theme" },
    { label: "Speakers", href: "#speakers" },
    { label: "Details", href: "#details" },
    { label: "About", href: "#about" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-6 px-6 md:px-12",
        scrolled ? "bg-background/90 backdrop-blur-lg py-4" : "bg-transparent"
      )}
      data-testid="nav-main"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#hero" 
          onClick={(e) => scrollToSection(e, "#hero")}
          className="group cursor-pointer"
          data-testid="link-logo"
        >
          <img 
            src="/images/tedx-logo.png" 
            alt="TEDx GEMS New Millennium School Youth" 
            className="h-32 md:h-40 object-contain scale-125"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="cursor-pointer text-sm font-medium tracking-wide transition-all duration-300 relative group text-white/80 hover:text-white"
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        
        <div className="md:hidden text-white">
          <span className="font-mono text-xs text-muted-foreground">[MENU]</span>
        </div>
      </div>
    </nav>
  );
}
