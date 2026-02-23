import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero = () => {

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden w-full bg-gradient-to-br from-black via-gray-900 to-black">
      {/* <img
        src={"https://res.cloudinary.com/dubc3wnbv/image/upload/q_auto:low/v1771742191/hero-background_ksbmpq_2_qhn3io.avif"}
        fetchPriority='high'
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      /> */}
      <picture>
  <source
    media="(max-width: 640px)"
    srcSet="https://res.cloudinary.com/dubc3wnbv/image/upload/q_auto:low,w_640,f_avif/v1771742191/hero-background_ksbmpq_2_qhn3io.avif"
    type="image/avif"
  />
  <source
    media="(max-width: 1024px)"
    srcSet="https://res.cloudinary.com/dubc3wnbv/image/upload/q_auto:low,w_1024,f_avif/v1771742191/hero-background_ksbmpq_2_qhn3io.avif"
    type="image/avif"
  />
  <source
    media="(max-width: 1920px)"
    srcSet="https://res.cloudinary.com/dubc3wnbv/image/upload/q_auto:low,w_1920,f_avif/v1771742191/hero-background_ksbmpq_2_qhn3io.avif"
    type="image/avif"
  />
  <img
    src="https://res.cloudinary.com/dubc3wnbv/image/upload/q_auto:low,w_1920,f_avif/v1771742191/hero-background_ksbmpq_2_qhn3io.avif"
    fetchPriority="high"
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
  />
</picture>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 z-[1]"></div>
      <div className="relative z-10 text-center max-w-[600px] px-6 flex flex-col items-center w-full">
        <div className="text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl font-normal mb-8 opacity-90 drop-shadow-md">
            Starts at $7.99. Cancel anytime.
          </p>
          <button className="bg-red-600 hover:bg-red-700 border-0 rounded-md text-white px-8 py-4 text-lg font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-300 ease-out shadow-lg shadow-red-600/30 min-w-[200px] justify-center hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-600/50 focus-visible:outline-2 focus-visible:outline-white/80 focus-visible:outline-offset-2 active:translate-y-0 group">
            Restart Your Membership
            <ChevronRight size={ 20 } className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
