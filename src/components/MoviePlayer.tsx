import type { Movie } from "@/types";

interface MoviePlayerProps {
    movie: Movie;
    isHovered?: boolean;
}

const MoviePlayer = ({ movie, isHovered = false }: MoviePlayerProps) => {
    return (
        <div className="bg-black text-white relative w-full h-full border-1">
            <video
                aria-label="Play movie"
                autoPlay={isHovered}
                poster={movie.poster_path}
                preload="auto"
                className="w-full h-full object-cover" controls>
                <source src={"https://res.cloudinary.com/dubc3wnbv/video/upload/v1757295154/IMG_2779_bax6bk.mov"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
export default MoviePlayer;
