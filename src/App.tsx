import "./App.css";
import { usePopularMovies } from "./lib/usePopularMovies";
import { useEffect } from "react";
import useThemeStore from "./store/themeStore";
import { Activity } from 'react';
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";

import type { Movie } from "./types";

const App: React.FC = () => {
  const { movies, error, loading } = usePopularMovies();
  const { isDarkMode, initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">

      <Hero />
      <main>
        <div className="container-full mx-auto">
          {loading && <p className="px-4 md:px-6">Loading...</p>}
          {error && <p className="text-red-500 px-4 md:px-6">{error}</p>}
          <h2 className="text-xl md:text-2xl font-semibold px-4 md:px-6 mb-4 pt-8">Trending Now</h2>
          <Activity mode={movies?.length ? "visible" : "hidden"}>
            <MovieList movies={movies} />
          </Activity>
        </div>
      </main>
    </div>
  );
}

export default App;
