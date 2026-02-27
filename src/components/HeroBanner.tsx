import { useEffect, useState } from "react";
import { Play, Info } from "lucide-react";
import { type Movie, IMAGE_BASE, categories } from "@/lib/tmdb";

const HeroBanner = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    categories.trending.fetch().then((movies) => {
      const featured = movies[Math.floor(Math.random() * movies.length)];
      setMovie(featured);
    });
  }, []);

  if (!movie) return <div className="h-[85vh] bg-background" />;

  const title = movie.title || movie.name || "";
  const description = movie.overview
    ? movie.overview.length > 200
      ? movie.overview.substring(0, 200) + "..."
      : movie.overview
    : "";

  return (
    <div className="relative h-[85vh] w-full">
      <img
        src={`${IMAGE_BASE}/original${movie.backdrop_path}`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 hero-gradient-left" />

      <div className="absolute bottom-[25%] left-4 md:left-12 max-w-xl z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-sm md:text-base text-secondary-foreground mb-6 drop-shadow-md leading-relaxed">
          {description}
        </p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-foreground text-background font-semibold px-6 py-2 rounded hover:bg-foreground/80 transition text-sm md:text-base">
            <Play className="w-5 h-5 fill-current" /> Play
          </button>
          <button className="flex items-center gap-2 bg-muted/70 text-foreground font-semibold px-6 py-2 rounded hover:bg-muted/50 transition text-sm md:text-base">
            <Info className="w-5 h-5" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
