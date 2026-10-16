import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const collections = [
  {
    name: "NEW SEASON",
    subtitle: "FRESH ARRIVALS",
    description:
      "New silhouettes, modern essentials, and everyday pieces designed for the season ahead.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    link: "/products?collection=new",
    size: "large",
  },
  {
    name: "ESSENTIALS",
    subtitle: "EVERYDAY WEAR",
    description:
      "Clean, versatile pieces made to become part of your everyday rotation.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    link: "/products?collection=essentials",
    size: "normal",
  },
  {
    name: "STREET EDIT",
    subtitle: "BOLD & UNAPOLOGETIC",
    description:
      "Oversized fits, graphic pieces, and statement silhouettes inspired by the streets.",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    link: "/products?collection=street",
    size: "normal",
  },
  {
    name: "MINIMAL",
    subtitle: "LESS. BETTER.",
    description:
      "Refined colors, clean shapes, and timeless pieces with a modern edge.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
    link: "/products?collection=minimal",
    size: "normal",
  },
];

export default function Collections() {
  return (
    <main className="bg-[#F5F2EC] text-[#171512]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#171512] text-[#F5F2EC]">

        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32 lg:py-40">

          <div className="max-w-5xl">

            <p className="mb-6 text-xs tracking-[0.35em] text-[#B8E63C]">
              URBAN / COLLECTIONS
            </p>

            <h1 className="text-7xl font-bold uppercase leading-[0.82] tracking-tight sm:text-8xl md:text-9xl">
              FIND
              <br />
              YOUR
              <br />
              <span className="text-[#B8E63C]">
                STYLE.
              </span>
            </h1>

          </div>

          <div className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between">

            <p className="max-w-xl text-sm leading-7 text-white/50 md:text-base">
              Explore the world of URBAN through our curated collections.
              From everyday essentials to bold streetwear, find pieces
              designed around your style.
            </p>

            <Link
              to="/products"
              className="group flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-widest"
            >
              Shop All

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>

          </div>

        </div>

        {/* Decorative text */}

        <div className="pointer-events-none absolute -bottom-8 right-[-20px] hidden select-none text-[180px] font-bold leading-none text-white/[0.02] lg:block">
          URBAN
        </div>

      </section>


      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">

        <div className="grid gap-10 md:grid-cols-2 md:items-end">

          <div>

            <p className="text-xs tracking-[0.3em] text-[#8A6243]">
              CURATED FOR YOU
            </p>

            <h2 className="mt-4 max-w-2xl text-5xl font-bold uppercase leading-[0.9] tracking-tight md:text-7xl">
              MORE THAN
              <br />
              JUST CLOTHES.
            </h2>

          </div>

          <p className="max-w-lg text-sm leading-7 text-[#171512]/60 md:justify-self-end">
            Each URBAN collection is built around a different expression of
            modern streetwear. Discover the pieces that fit your mood,
            lifestyle, and everyday rotation.
          </p>

        </div>

      </section>


      {/* =====================================================
          COLLECTIONS
      ====================================================== */}

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">

        <div className="grid gap-5 lg:grid-cols-2">

          {collections.map((collection, index) => (

            <CollectionCard
              key={collection.name}
              collection={collection}
              index={index}
            />

          ))}

        </div>

      </section>


      {/* =====================================================
          FEATURED STATEMENT
      ====================================================== */}

      <section className="bg-[#11110F] text-[#F5F2EC]">

        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-xs tracking-[0.3em] text-[#B8E63C]">
                THE URBAN STANDARD
              </p>

              <h2 className="mt-6 text-6xl font-bold uppercase leading-[0.85] tracking-tight md:text-8xl">
                WEAR
                <br />
                YOUR
                <br />
                <span className="text-[#B8E63C]">
                  WORLD.
                </span>
              </h2>

            </div>

            <div className="lg:pl-10">

              <p className="max-w-lg text-sm leading-7 text-white/50 md:text-base">
                We believe clothing should feel effortless. Our collections
                combine contemporary silhouettes with versatile pieces that
                can move with you from everyday life to wherever the night
                takes you.
              </p>

              <Link
                to="/products"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#F5F2EC] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#171512] transition hover:bg-[#B8E63C]"
              >
                Explore Products

                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="bg-[#B8E63C]">

        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-xs tracking-[0.3em] text-[#171512]/60">
                READY TO EXPLORE?
              </p>

              <h2 className="mt-4 text-5xl font-bold uppercase leading-[0.85] tracking-tight md:text-7xl">
                SHOP THE
                <br />
                COLLECTION.
              </h2>

            </div>

            <Link
              to="/products"
              className="group flex w-fit items-center gap-3 rounded-full bg-[#171512] px-7 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#F5F2EC] hover:text-[#171512]"
            >
              Shop Now

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-2"
              />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   COLLECTION CARD
========================================================= */

function CollectionCard({ collection, index }) {
  const isLarge = collection.size === "large";

  return (
    <Link
      to={collection.link}
      className={`group relative overflow-hidden ${
        isLarge ? "lg:row-span-2" : ""
      }`}
    >

      <div
        className={`relative overflow-hidden ${
          isLarge
            ? "h-[650px] md:h-[750px]"
            : "h-[420px] md:h-[500px]"
        }`}
      >

        {/* IMAGE */}

        <img
          src={collection.image}
          alt={collection.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-[#171512]/80 via-[#171512]/20 to-transparent" />

        {/* NUMBER */}

        <div className="absolute left-6 top-6">

          <span className="text-xs font-medium tracking-[0.25em] text-white/60">
            0{index + 1}
          </span>

        </div>


        {/* ARROW */}

        <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F2EC] text-[#171512] transition duration-300 group-hover:bg-[#B8E63C]">

          <ArrowUpRight
            size={19}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />

        </div>


        {/* CONTENT */}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">

          <p className="text-xs tracking-[0.25em] text-[#B8E63C]">
            {collection.subtitle}
          </p>

          <h3 className="mt-3 text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
            {collection.name}
          </h3>

          <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
            {collection.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white">
            Explore Collection

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />

          </div>

        </div>

      </div>

    </Link>
  );
}