import type { Movie } from "@/types";

const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";

interface MoviePlayerProps {
    movie: Movie;
}

const MoviePlayer = ({ movie }: MoviePlayerProps) => {
    return (
        <div className=" bg-black text-white relative">
            <video
                height={"250px"}
                poster={TMDB_IMAGES_ASSET_URL + movie.poster_path}
                preload="metadata"
                aria-label="Play movie"
                className="w-full lg:h-[550px] sm:h-[250px]" controls>
                <source src={"https://res.cloudinary.com/dubc3wnbv/video/upload/v1757295154/IMG_2779_bax6bk.mov"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>


        </div >
    );
};


export default MoviePlayer;
