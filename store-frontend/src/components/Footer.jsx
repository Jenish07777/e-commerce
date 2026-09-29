import { Link } from "react-router-dom";
import { ArrowUpRight} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#11110F] text-[#F5F2EC]">

      {/* TOP FOOTER */}

      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}

          <div className="lg:col-span-2">

            <h2 className="text-6xl font-bold tracking-tight md:text-7xl">
              URBAN
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/50">
              Modern streetwear made for everyday movement.
              Discover bold essentials, clean silhouettes,
              and pieces built for your style.
            </p>

            {/* SOCIALS */}

            <div className="mt-8 flex gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#B8E63C] hover:bg-[#B8E63C] hover:text-[#171512]"
              >
                <BsInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#B8E63C] hover:bg-[#B8E63C] hover:text-[#171512]"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#B8E63C] hover:bg-[#B8E63C] hover:text-[#171512]"
              >
                <BsTwitter size={18} />
              </a>

            </div>

          </div>

          {/* SHOP */}

          <div>

            <p className="mb-5 text-xs tracking-[0.25em] text-white/30">
              SHOP
            </p>

            <div className="flex flex-col gap-3">

              <Link
                to="/products"
                className="text-sm text-white/60 transition hover:text-[#B8E63C]"
              >
                All Products
              </Link>

              <Link
                to="/products?category=T-Shirts"
                className="text-sm text-white/60 transition hover:text-[#B8E63C]"
              >
                T-Shirts
              </Link>

              <Link
                to="/products?category=Pants"
                className="text-sm text-white/60 transition hover:text-[#B8E63C]"
              >
                Pants
              </Link>

              <Link
                to="/products?category=Hoodies"
                className="text-sm text-white/60 transition hover:text-[#B8E63C]"
              >
                Hoodies
              </Link>

              <Link
                to="/wishlist"
                className="text-sm text-white/60 transition hover:text-[#B8E63C]"
              >
                Wishlist
              </Link>

            </div>

          </div>

          {/* HELP */}

          <div>

            <p className="mb-5 text-xs tracking-[0.25em] text-white/30">
              HELP
            </p>

            <div className="flex flex-col gap-3">

              <Link
                to="/profile"
                className="text-sm text-white/60 transition hover:text-[#B8E63C]"
              >
                My Account
              </Link>

              <Link
                to="/orders"
                className="text-sm text-white/60 transition hover:text-[#B8E63C]"
              >
                My Orders
              </Link>

              <Link
                to="/cart"
                className="text-sm text-white/60 transition hover:text-[#B8E63C]"
              >
                Shopping Cart
              </Link>

              <a
                href="mailto:hello@urban.com"
                className="text-sm text-white/60 transition hover:text-[#B8E63C]"
              >
                Contact Us
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* NEWSLETTER / CTA */}

      <div className="border-y border-white/10">

        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-10">

          <div>

            <p className="text-xs tracking-[0.25em] text-[#B8E63C]">
              STAY IN THE LOOP
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              GET THE LATEST FROM URBAN.
            </h3>

          </div>

          <Link
            to="/"
            className="group flex w-fit items-center gap-3 rounded-full bg-[#F5F2EC] px-6 py-3 text-sm font-semibold text-[#171512] transition hover:bg-[#B8E63C]"
          >
            EXPLORE COLLECTION

            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="mx-auto max-w-[1400px] px-6 py-6 lg:px-10">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} URBAN. ALL RIGHTS RESERVED.
          </p>

          <div className="flex flex-wrap gap-5 text-xs text-white/30">

            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </a>

            <button
              onClick={scrollToTop}
              className="transition hover:text-[#B8E63C]"
            >
              BACK TO TOP ↑
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}