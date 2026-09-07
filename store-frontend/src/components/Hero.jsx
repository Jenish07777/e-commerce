import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#171512] text-[#F5F2EC]">
      
      {/* Background Image */}
      <img
        src="/hero/hero-image.jpg"
        alt="URBAN streetwear collection"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1400px] items-end px-6 pb-16 md:px-10 md:pb-20">
        
        <div className="max-w-5xl">

          {/* Small Label */}
          <p className="mb-6 text-xs font-medium tracking-[0.35em] text-[#B8E63C] md:text-sm">
            NEW COLLECTION — 2026
          </p>

          {/* Main Heading */}
          <h1 className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.04em] sm:text-7xl md:text-8xl lg:text-[10rem]">
            BUILT
            <br />
            DIFFERENT.
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-md text-sm leading-relaxed text-[#F5F2EC]/80 md:text-base">
            Modern streetwear designed for everyday movement.
            Discover pieces made to stand out, built to last.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/products"
              className="bg-[#B8E63C] px-7 py-4 text-sm font-bold tracking-wide text-[#171512] transition duration-300 hover:bg-[#F5F2EC]"
            >
              SHOP NOW
            </Link>

            <Link
              to="/products"
              className="border border-[#F5F2EC]/60 px-7 py-4 text-sm font-bold tracking-wide text-[#F5F2EC] transition duration-300 hover:bg-[#F5F2EC] hover:text-[#171512]"
            >
              EXPLORE COLLECTION
            </Link>

          </div>

        </div>
      </div>

      {/* Bottom Right Text */}
      <div className="absolute bottom-8 right-6 z-10 hidden text-right md:right-10 md:block">
        <p className="text-[10px] tracking-[0.3em] text-[#F5F2EC]/50">
          URBAN / 001
        </p>
        <p className="mt-1 text-xs tracking-widest text-[#F5F2EC]/70">
          MADE FOR EVERYDAY
        </p>
      </div>

    </section>
  );
};

export default Hero;