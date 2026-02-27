import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import { categories } from "@/lib/tmdb";

const Index = () => {
  return (
    <div className="relative bg-background min-h-screen">
      <Navbar />
      <HeroBanner />
      <div className="-mt-16 relative z-10">
        <MovieRow title={categories.netflixOriginals.title} fetchMovies={categories.netflixOriginals.fetch} isLargeRow />
        <MovieRow title={categories.trending.title} fetchMovies={categories.trending.fetch} />
        <MovieRow title={categories.topRated.title} fetchMovies={categories.topRated.fetch} />
        <MovieRow title={categories.action.title} fetchMovies={categories.action.fetch} />
        <MovieRow title={categories.comedy.title} fetchMovies={categories.comedy.fetch} />
        <MovieRow title={categories.horror.title} fetchMovies={categories.horror.fetch} />
        <MovieRow title={categories.romance.title} fetchMovies={categories.romance.fetch} />
        <MovieRow title={categories.documentaries.title} fetchMovies={categories.documentaries.fetch} />
      </div>
    </div>
  );
};

export default Index;
