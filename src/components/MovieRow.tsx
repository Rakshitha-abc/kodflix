import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Movie, IMAGE_BASE } from "@/lib/tmdb";

interface MovieRowProps {
  title: string;
  fetchMovies: () => Promise<Movie[]>;
  isLargeRow?: boolean;
}

const MovieRow = ({ title, fetchMovies, isLargeRow = false }: MovieRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMovies().then(setMovies).catch(console.error);
  }, [fetchMovies]);

  const scroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.8;
    rowRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!movies.length) return null;

  return (
    <div className="px-4 md:px-12 mb-8 group/row">
      <h2 className="text-foreground text-lg md:text-xl font-semibold mb-3">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-background/60 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-background/80"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>

        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => {
            const imgPath = isLargeRow ? movie.poster_path : movie.backdrop_path;
            if (!imgPath) return null;
            return (
              <img
                key={movie.id}
                src={`${IMAGE_BASE}/w500${imgPath}`}
                alt={movie.title || movie.name || ""}
                className={`rounded transition-transform duration-300 hover:scale-110 cursor-pointer object-cover flex-shrink-0 ${
                  isLargeRow
                    ? "h-[250px] md:h-[350px] w-[170px] md:w-[240px]"
                    : "h-[130px] md:h-[170px] w-[230px] md:w-[300px]"
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-background/60 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-background/80"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
