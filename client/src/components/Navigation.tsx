import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Speakers", href: "/#speakers" },
    { label: "About", href: "/about" },
    { label: "Attend", href: "/attend", primary: true },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-6 px-6 md:px-12",
        scrolled ? "bg-background/80 backdrop-blur-lg py-4 border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl tracking-tighter">
              TEDx<span className="text-primary">Campus</span>
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <div
                className={cn(
                  "cursor-pointer text-sm font-medium tracking-wide transition-all duration-300 relative group",
                  item.primary
                    ? "px-5 py-2.5 bg-primary text-white rounded-full hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/25"
                    : "text-white/80 hover:text-white"
                )}
              >
                {item.label}
                {!item.primary && (
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                )}
              </div>
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Icon Placeholder - Simplified for MVP */}
        <div className="md:hidden text-white">
          <span className="font-mono text-xs text-muted-foreground">[MENU]</span>
        </div>
      </div>
    </nav>
  );
}
