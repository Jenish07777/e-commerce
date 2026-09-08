import { Link } from "react-router-dom";

const CollectionBanner = () => {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-[#8A6243] text-[#F5F2EC]">

      <img
        src="/collections/summer.jpg"
        alt="Summer 2026 collection"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex min-h-[500px] items-center justify-center px-6 text-center">
        <div>
          <p className="mb-5 text-xs tracking-[0.4em] text-[#B8E63C]">
            COLLECTION 001
          </p>

          <h2 className="text-6xl font-black uppercase leading-[0.85] tracking-tight md:text-9xl">
            SUMMER
            <br />
            '26
          </h2>

          <p className="mx-auto mt-6 max-w-md text-sm text-[#F5F2EC]/75">
            MADE FOR EVERYDAY MOVEMENT.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block bg-[#B8E63C] px-8 py-4 text-xs font-bold tracking-widest text-[#171512] transition hover:bg-[#F5F2EC]"
          >
            SHOP THE COLLECTION
          </Link>
        </div>
      </div>

    </section>
  );
};

export default CollectionBanner;