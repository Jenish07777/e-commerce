import { Link } from "react-router-dom";

const categories = [
  {
    name: "HOODIES",
    image: "/categories/hoodies.jpg",
  },
  {
    name: "T-SHIRTS",
    image: "/categories/tshirts.jpg",
  },
  {
    name: "PANTS",
    image: "/categories/pants.jpg",
  },
  {
    name: "SNEAKERS",
    image: "/categories/sneakers.jpg",
  },
  {
    name: "JACKETS",
    image: "/categories/jackets.jpg",
  },
  {
    name: "ACCESSORIES",
    image: "/categories/accessories.jpg",
  },
];

const CategorySection = () => {
  return (
    <section className="bg-[#F5F2EC] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">

        {/* Heading */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.3em] text-[#8A6243]">
              SHOP THE COLLECTION
            </p>

            <h2 className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              SHOP BY
              <br />
              CATEGORY
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden border-b border-[#171512] pb-1 text-xs font-bold tracking-widest md:block"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group relative aspect-[4/5] overflow-hidden bg-[#EAE4DA]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/35" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 p-5 text-[#F5F2EC] md:p-7">
                <p className="text-2xl font-black tracking-tight md:text-4xl">
                  {category.name}
                </p>

                <p className="mt-2 text-xs tracking-widest opacity-0 transition duration-300 group-hover:opacity-100">
                  SHOP NOW →
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategorySection;