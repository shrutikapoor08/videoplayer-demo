import React, { useState, Activity } from 'react';

import { Card } from './ui/card';
import type { MovieCardProps } from '@/types';
import MoviePlayer from './MoviePlayer';

const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";

const MovieCard: React.FC<MovieCardProps> = ({ movie, onMovieClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => {
    setIsHovered(true);
  }
  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const handleMovieClick = () => {
    onMovieClick(movie);
  }
  return (

    <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-150 hover:shadow-xl hover:overflow-visible hover:z-20 outline-blue-200 bg-card p-0 border-0 md:min-w-[180px] w-[7rem] md:w-[16rem] lg:w-[16rem] h-[12rem]"
      role="button"
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMovieClick}

    >
      <Activity mode={isHovered ? "visible" : "hidden"}>
        <MoviePlayer movie={movie} />
      </Activity>

      <Activity mode={isHovered ? "hidden" : "visible"}>
        <img
          src={TMDB_IMAGES_ASSET_URL + movie?.poster_path || "/placeholder.svg"}
          alt={movie?.title}
          className="w-full h-auto object-cover"
        />
      </Activity>


    </Card >

  );
};


export default MovieCard;
