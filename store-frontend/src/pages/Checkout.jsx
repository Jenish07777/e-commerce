import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    total,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Nepal",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    const newOrderNumber = `URB-${Date.now().toString().slice(-6)}`;

    const newOrder = {
      id: newOrderNumber,
      date: new Date().toISOString(),
      items: cartItems,
      subtotal,
      shipping,
      total,
      customer: formData,
      paymentMethod,
      status: "Processing",
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);

    clearCart();
  };

  // Empty cart
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-[#F5F2EC] px-5 py-20 text-[#171512] md:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-[0.3em] text-[#8A6243]">
            CHECKOUT
          </p>

          <h1 className="mt-6 text-6xl font-bold uppercase tracking-tight">
            Your Cart Is Empty
          </h1>

          <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-[#171512]/60">
            Add some products to your cart before proceeding
            to checkout.
          </p>

          <Link
            to="/products"
            className="mt-10 inline-flex items-center gap-3 bg-[#171512] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  // Order success
  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#F5F2EC] px-5 py-20 text-[#171512] md:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#B8E63C]">
            <Check size={36} strokeWidth={2} />
          </div>

          <p className="mt-10 text-xs tracking-[0.3em] text-[#8A6243]">
            ORDER CONFIRMED
          </p>

          <h1 className="mt-5 text-6xl font-bold uppercase tracking-tight">
            Thank You
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-[#171512]/60">
            Your order has been successfully placed.
            We'll send your order details to your email.
          </p>

          <div className="mx-auto mt-10 max-w-md bg-[#EAE4DA] p-8">
            <p className="text-xs uppercase tracking-widest text-[#171512]/50">
              Order Number
            </p>

            <p className="mt-3 text-2xl font-bold">
              {orderNumber}
            </p>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-3 bg-[#171512] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
            >
              View Orders
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-3 border border-[#171512]/20 px-8 py-4 text-sm font-semibold uppercase tracking-widest transition hover:border-[#171512]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F2EC] px-5 py-12 text-[#171512] md:px-10 lg:px-20">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#171512]/60 transition hover:text-[#171512]"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>

          <p className="mt-10 text-xs tracking-[0.3em] text-[#8A6243]">
            URBAN CHECKOUT
          </p>

          <h1 className="mt-4 text-6xl font-bold uppercase tracking-tight md:text-8xl">
            Checkout
          </h1>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid gap-12 lg:grid-cols-[1fr_420px]"
        >

          {/* LEFT */}
          <div className="space-y-10">

            {/* Contact */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#171512] text-[#F5F2EC]">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8A6243]">
                    01
                  </p>

                  <h2 className="text-2xl font-bold uppercase">
                    Contact & Delivery
                  </h2>
                </div>
              </div>

              <div className="bg-[#eae7da] p-6 md:p-8">

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#F5F2EC] px-4 py-4 text-sm outline-none ring-1 ring-[#171512]/10 focus:ring-[#171512]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#F5F2EC] px-4 py-4 text-sm outline-none ring-1 ring-[#171512]/10 focus:ring-[#171512]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#F5F2EC] px-4 py-4 text-sm outline-none ring-1 ring-[#171512]/10 focus:ring-[#171512]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest">
                      Phone
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#F5F2EC] px-4 py-4 text-sm outline-none ring-1 ring-[#171512]/10 focus:ring-[#171512]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs uppercase tracking-widest">
                      Address
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Street address"
                      className="w-full bg-[#F5F2EC] px-4 py-4 text-sm outline-none ring-1 ring-[#171512]/10 focus:ring-[#171512]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#F5F2EC] px-4 py-4 text-sm outline-none ring-1 ring-[#171512]/10 focus:ring-[#171512]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-widest">
                      Postal Code
                    </label>

                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#F5F2EC] px-4 py-4 text-sm outline-none ring-1 ring-[#171512]/10 focus:ring-[#171512]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs uppercase tracking-widest">
                      Country
                    </label>

                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full bg-[#F5F2EC] px-4 py-4 text-sm outline-none ring-1 ring-[#171512]/10 focus:ring-[#171512]"
                    >
                      <option value="Nepal">Nepal</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      <option value="United Kingdom">
                        United Kingdom
                      </option>
                      <option value="United States">
                        United States
                      </option>
                    </select>
                  </div>

                </div>
              </div>
            </section>

            {/* Delivery */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#171512] text-[#F5F2EC]">
                  <Truck size={18} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8A6243]">
                    02
                  </p>

                  <h2 className="text-2xl font-bold uppercase">
                    Delivery
                  </h2>
                </div>
              </div>

              <div className="flex items-center justify-between border border-[#171512] bg-[#EAE4DA] p-5">
                <div>
                  <p className="font-semibold">
                    Standard Delivery
                  </p>

                  <p className="mt-1 text-xs text-[#171512]/50">
                    3–7 business days
                  </p>
                </div>

                <p className="font-semibold">
                  {shipping === 0 ? "FREE" : `$${shipping}`}
                </p>
              </div>
            </section>

            {/* Payment */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#171512] text-[#F5F2EC]">
                  <CreditCard size={18} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#8A6243]">
                    03
                  </p>

                  <h2 className="text-2xl font-bold uppercase">
                    Payment
                  </h2>
                </div>
              </div>

              <div className="space-y-3">

                <label
                  className={`flex cursor-pointer items-center gap-4 border p-5 transition ${
                    paymentMethod === "cod"
                      ? "border-[#171512] bg-[#EAE4DA]"
                      : "border-[#171512]/15"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div>
                    <p className="font-semibold">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-xs text-[#171512]/50">
                      Pay when your order arrives
                    </p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-4 border p-5 transition ${
                    paymentMethod === "card"
                      ? "border-[#171512] bg-[#EAE4DA]"
                      : "border-[#171512]/15"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div>
                    <p className="font-semibold">
                      Card Payment
                    </p>

                    <p className="mt-1 text-xs text-[#171512]/50">
                      Secure card payment
                    </p>
                  </div>
                </label>

              </div>
            </section>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <aside className="h-fit bg-[#171512] p-6 text-[#F5F2EC] lg:sticky lg:top-8 md:p-8">

            <p className="text-xs tracking-[0.3em] text-[#B8E63C]">
              YOUR ORDER
            </p>

            <h2 className="mt-4 text-3xl font-bold uppercase">
              Summary
            </h2>

            <div className="mt-8 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover"
                  />

                  <div className="flex flex-1 justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#F5F2EC]/50">
                        Size: {item.size}
                      </p>

                      <p className="mt-1 text-xs text-[#F5F2EC]/50">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-8 border-t border-[#F5F2EC]/15" />

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#F5F2EC]/60">
                  Subtotal ({cartCount} items)
                </span>

                <span>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#F5F2EC]/60">
                  Shipping
                </span>

                <span>
                  {shipping === 0
                    ? "FREE"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="my-6 border-t border-[#F5F2EC]/15" />

            <div className="flex items-end justify-between">
              <span className="text-xs uppercase tracking-widest text-[#F5F2EC]/60">
                Total
              </span>

              <span className="text-3xl font-bold">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              className="group mt-8 flex w-full items-center justify-center gap-3 bg-[#B8E63C] px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#171512] transition hover:bg-[#F5F2EC]"
            >
              Place Order
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <p className="mt-5 text-center text-[11px] leading-5 text-[#F5F2EC]/40">
              By placing your order, you agree to our terms
              and conditions.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}
