import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Essential Oversized Tee",
    price: "$45",
    category: "T-SHIRTS",
    image: "/products/product-1.jpg",
  },
  {
    id: 2,
    name: "Heavyweight Hoodie",
    price: "$85",
    category: "HOODIES",
    image: "/products/product-2.jpg",
  },
  {
    id: 3,
    name: "Relaxed Cargo Pants",
    price: "$75",
    category: "PANTS",
    image: "/products/product-3.jpg",
  },
  {
    id: 4,
    name: "Urban Runner",
    price: "$120",
    category: "SNEAKERS",
    image: "/products/product-4.jpg",
  },
];

const ProductGrid = ({ title = "NEW ARRIVALS", subtitle = "JUST DROPPED" }) => {
  return (
    <section className="bg-[#F5F2EC] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">

        {/* Heading */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-4 text-xs font-medium tracking-[0.3em] text-[#8A6243]">
              {subtitle}
            </p>

            <h2 className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
              {title}
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden border-b border-[#171512] pb-1 text-xs font-bold tracking-widest md:block"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {products.map((product) => (
            <div key={product.id} className="group">

              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE4DA]">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </Link>

                {/* Wishlist */}
                <button
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F2EC]/90 backdrop-blur-sm transition hover:bg-[#B8E63C]"
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} strokeWidth={1.8} />
                </button>

                {/* Add to Cart */}
                <button
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 bg-[#171512] py-3 text-xs font-bold tracking-widest text-[#F5F2EC] opacity-0 transition duration-300 group-hover:opacity-100 hover:bg-[#B8E63C] hover:text-[#171512]"
                >
                  <ShoppingBag size={15} />
                  ADD TO CART
                </button>
              </div>

              {/* Product Info */}
              <div className="mt-4">
                <p className="text-[10px] font-medium tracking-[0.2em] text-[#8A6243]">
                  {product.category}
                </p>

                <div className="mt-2 flex items-start justify-between gap-3">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {product.name}
                  </Link>

                  <p className="shrink-0 text-sm font-bold">
                    {product.price}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductGrid;