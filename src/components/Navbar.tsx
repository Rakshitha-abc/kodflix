import { useState, useEffect } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-3 transition-colors duration-300 ${
        scrolled ? "bg-background" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-6">
        <h1 className="font-display text-primary text-3xl md:text-4xl tracking-wider">
          KODFLIX
        </h1>
        <div className="hidden md:flex items-center gap-5 text-sm text-secondary-foreground">
          <span className="text-foreground font-semibold cursor-pointer">Home</span>
          <span className="hover:text-foreground transition cursor-pointer">TV Shows</span>
          <span className="hover:text-foreground transition cursor-pointer">Movies</span>
          <span className="hover:text-foreground transition cursor-pointer">New & Popular</span>
          <span className="hover:text-foreground transition cursor-pointer">My List</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-foreground">
        <Search className="w-5 h-5 cursor-pointer hover:text-muted-foreground transition" />
        <Bell className="w-5 h-5 cursor-pointer hover:text-muted-foreground transition" />
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="w-8 h-8 rounded bg-primary" />
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
