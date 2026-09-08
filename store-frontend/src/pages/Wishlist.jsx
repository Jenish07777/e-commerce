import {
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";



import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";

const Wishlist = () => {
  const {
    wishlistItems,
    wishlistCount,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, "M", 1);
    removeFromWishlist(product.id);
  };

  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#171512]">

      {/* Header */}
      <section className="border-b border-[#171512]/10 px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
        <div className="mx-auto max-w-[1400px]">

          <p className="mb-5 text-xs font-medium tracking-[0.3em] text-[#8A6243]">
            SAVED FOR LATER
          </p>

          <h1 className="text-7xl font-black uppercase leading-[0.8] tracking-[-0.04em] md:text-[10rem]">
            WISHLIST
          </h1>

          <p className="mt-8 text-sm text-[#171512]/50">
            {wishlistCount}{" "}
            {wishlistCount === 1
              ? "ITEM"
              : "ITEMS"}
          </p>

        </div>
      </section>

      {/* Wishlist */}
      <section className="px-6 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">

          {wishlistItems.length === 0 ? (

            /* Empty Wishlist */
            <div className="flex min-h-[450px] flex-col items-center justify-center text-center">

              <Heart
                size={42}
                strokeWidth={1.2}
              />

              <p className="mt-7 text-xs tracking-[0.3em] text-[#8A6243]">
                NOTHING SAVED YET
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase md:text-6xl">
                FIND SOMETHING
                <br />
                YOU LOVE
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-[#171512]/50">
                Save your favorite pieces here
                and come back to them whenever
                you're ready.
              </p>

              <Link
                to="/products"
                className="mt-8 inline-flex items-center gap-3 bg-[#171512] px-7 py-4 text-xs font-bold tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
              >
                EXPLORE PRODUCTS
                <ShoppingBag size={15} />
              </Link>

            </div>

          ) : (

            /* Products */
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">

              {wishlistItems.map((product) => (

                <article
                  key={product.id}
                  className="group"
                >

                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE4DA]">

                    <Link
                      to={`/products/${product.id}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromWishlist(
                          product.id
                        )
                      }
                      aria-label="Remove from wishlist"
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F2EC]/90 transition hover:bg-[#B8E63C]"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                  {/* Info */}
                  <div className="mt-4">

                    <p className="text-[10px] tracking-[0.2em] text-[#8A6243]">
                      {product.category?.toUpperCase()}
                    </p>

                    <Link
                      to={`/products/${product.id}`}
                      className="mt-2 block text-sm font-bold"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-2 flex items-center justify-between">

                      <p className="text-sm font-bold">
                        ${product.price}
                      </p>

                      <span className="text-xs text-[#171512]/50">
                        ★ {product.rating}
                      </span>

                    </div>

                    {/* Add to cart */}
                    <button
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className="mt-4 w-full bg-[#171512] py-3 text-[10px] font-bold tracking-[0.15em] text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
                    >
                      ADD TO CART
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>
      </section>

    </main>
  );
};

export default Wishlist;