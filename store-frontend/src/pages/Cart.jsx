import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";


const Cart = () => {
  const {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#171512]">

      {/* Header */}
      <section className="border-b border-[#171512]/10 px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
        <div className="mx-auto max-w-[1400px]">

          <p className="mb-5 text-xs font-medium tracking-[0.3em] text-[#8A6243]">
            YOUR SELECTION
          </p>

          <h1 className="text-7xl font-black uppercase leading-[0.8] tracking-[-0.04em] md:text-[10rem]">
            CART
          </h1>

          <p className="mt-8 text-sm text-[#171512]/50">
            {cartCount}{" "}
            {cartCount === 1 ? "ITEM" : "ITEMS"}
          </p>

        </div>
      </section>

      {/* Cart Content */}
      <section className="px-6 py-12 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">

          {cartItems.length === 0 ? (

            /* Empty Cart */
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">

              <p className="text-xs tracking-[0.3em] text-[#8A6243]">
                NOTHING HERE YET
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase md:text-6xl">
                YOUR CART IS EMPTY
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-[#171512]/50">
                Looks like you haven't found your
                next favorite piece yet.
              </p>

              <Link
                to="/products"
                className="mt-8 inline-flex items-center gap-3 bg-[#171512] px-7 py-4 text-xs font-bold tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
              >
                START SHOPPING
                <ArrowRight size={15} />
              </Link>

            </div>

          ) : (

            <div className="grid gap-12 lg:grid-cols-[1fr_400px]">

              {/* Products */}
              <div>

                {/* Desktop Header */}
                <div className="hidden border-b border-[#171512]/10 pb-4 text-[10px] font-bold tracking-[0.2em] text-[#171512]/50 md:grid md:grid-cols-[1fr_120px_100px_30px]">
                  <span>PRODUCT</span>
                  <span>QUANTITY</span>
                  <span>PRICE</span>
                  <span></span>
                </div>

                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="grid gap-5 border-b border-[#171512]/10 py-7 md:grid-cols-[1fr_120px_100px_30px] md:items-center"
                  >

                    {/* Product */}
                    <div className="flex gap-5">

                      <Link
                        to={`/products/${item.id}`}
                        className="h-32 w-24 shrink-0 overflow-hidden bg-[#EAE4DA] md:h-36 md:w-28"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>

                      <div className="flex flex-col justify-center">

                        <p className="text-[10px] tracking-[0.2em] text-[#8A6243]">
                          {item.category?.toUpperCase()}
                        </p>

                        <Link
                          to={`/products/${item.id}`}
                          className="mt-2 text-sm font-bold hover:underline"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-2 text-xs text-[#171512]/50">
                          SIZE: {item.size}
                        </p>

                      </div>

                    </div>

                    {/* Quantity */}
                    <div className="flex w-fit items-center border border-[#171512]/15">

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.id,
                            item.size
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center transition hover:bg-[#EAE4DA]"
                      >
                        <Minus size={13} />
                      </button>

                      <span className="flex h-9 w-9 items-center justify-center text-xs font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.id,
                            item.size
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center transition hover:bg-[#EAE4DA]"
                      >
                        <Plus size={13} />
                      </button>

                    </div>

                    {/* Price */}
                    <p className="text-sm font-bold">
                      ${item.price * item.quantity}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.size
                        )
                      }
                      className="w-fit text-[#171512]/40 transition hover:text-red-600"
                      aria-label="Remove item"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>
                ))}

                {/* Continue Shopping */}
                <Link
                  to="/products"
                  className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-widest hover:text-[#8A6243]"
                >
                  ← CONTINUE SHOPPING
                </Link>

              </div>

              {/* Summary */}
              <div className="h-fit bg-[#EAE4DA] p-7 md:p-8">

                <p className="text-xs font-bold tracking-[0.2em]">
                  ORDER SUMMARY
                </p>

                <div className="mt-7 space-y-5">

                  <div className="flex justify-between text-sm">
                    <span className="text-[#171512]/60">
                      SUBTOTAL
                    </span>

                    <span className="font-bold">
                      ${subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#171512]/60">
                      SHIPPING
                    </span>

                    <span className="font-bold">
                      {shipping === 0
                        ? "FREE"
                        : `$${shipping}`}
                    </span>
                  </div>

                  <div className="h-px bg-[#171512]/10" />

                  <div className="flex justify-between">
                    <span className="text-sm font-bold">
                      TOTAL
                    </span>

                    <span className="text-xl font-black">
                      ${total}
                    </span>
                  </div>

                </div>

                <Link
                  to="/checkout"
                  className="mt-8 flex w-full items-center justify-center gap-3 bg-[#171512] py-5 text-xs font-bold tracking-[0.2em] text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
                >
                  PROCEED TO CHECKOUT
                  <ArrowRight size={15} />
                </Link>

                <p className="mt-5 text-center text-[10px] leading-5 text-[#171512]/40">
                  FREE SHIPPING ON ORDERS OVER $100
                </p>

              </div>

            </div>

          )}

        </div>
      </section>

    </main>
  );
};

export default Cart;