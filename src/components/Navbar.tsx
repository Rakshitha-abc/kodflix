import { useState, useEffect } from "react";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-3 transition-colors duration-300 ${scrolled ? "bg-background" : "bg-transparent"
        }`}
    >
      <div className="flex items-center gap-6">
        <h1 className="font-display text-primary text-3xl md:text-4xl tracking-wider cursor-pointer" onClick={() => navigate("/")}>
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

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer focus:outline-none">
            <div className="w-8 h-8 rounded bg-primary" />
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black border-gray-800 text-white p-2">
            <div className="px-2 py-1.5 text-xs text-gray-400 border-b border-gray-800 mb-1">
              {user?.email}
            </div>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800 text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign out of Kodflix
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
