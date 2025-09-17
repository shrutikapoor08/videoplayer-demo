import type { Movie } from "@/types";

interface MoviePlayerProps {
    movie: Movie;
}

const MoviePlayer = ({ movie }: MoviePlayerProps) => {
    return (
        <div className="min-h-screen bg-black text-white relative">
            <video
                aria-label="Play movie"
                poster={movie.poster_path}
                className="w-full h-auto" controls>
                <source src={"https://res.cloudinary.com/dubc3wnbv/video/upload/v1757295154/IMG_2779_bax6bk.mov"} type="video/quicktime" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};
export default MoviePlayer;
