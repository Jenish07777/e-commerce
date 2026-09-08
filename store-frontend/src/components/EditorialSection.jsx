import { Link } from "react-router-dom";

const EditorialSection = () => {
  return (
    <section className="bg-[#171512] px-6 py-20 text-[#F5F2EC] md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 md:grid-cols-2 md:gap-20">

        {/* Image */}
        <div className="aspect-[4/5] overflow-hidden bg-[#8A6243]">
          <img
            src="/editorial/editorial.jpg"
            alt="URBAN lifestyle"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="max-w-xl">
          <p className="mb-6 text-xs tracking-[0.3em] text-[#B8E63C]">
            THE URBAN WAY
          </p>

          <h2 className="text-6xl font-black uppercase leading-[0.85] tracking-tight md:text-8xl">
            FIND
            <br />
            YOUR
            <br />
            STYLE.
          </h2>

          <p className="mt-8 max-w-md text-sm leading-7 text-[#F5F2EC]/60 md:text-base">
            We believe style isn't about following every trend.
            It's about finding what feels like you and making it your own.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block border border-[#F5F2EC]/40 px-7 py-4 text-xs font-bold tracking-widest transition hover:bg-[#F5F2EC] hover:text-[#171512]"
          >
            EXPLORE URBAN →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default EditorialSection;