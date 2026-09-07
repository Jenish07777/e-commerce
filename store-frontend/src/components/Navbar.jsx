import { Link } from "react-router-dom";
// import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F5F2EC] text-[#171512]">
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-[0.15em]"
        >
          LOGO
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            to="/"
            className="text-sm font-medium tracking-wide transition hover:text-[#8A6243]"
          >
            HOME
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium tracking-wide transition hover:text-[#8A6243]"
          >
            SHOP
          </Link>

          <Link
            to="/collections"
            className="text-sm font-medium tracking-wide transition hover:text-[#8A6243]"
          >
            COLLECTIONS
          </Link>

          <Link
            to="/products?new=true"
            className="text-sm font-medium tracking-wide transition hover:text-[#8A6243]"
          >
            NEW ARRIVALS
          </Link>

          <Link
            to="/products?sale=true"
            className="text-sm font-medium tracking-wide text-[#8A6243] transition hover:text-[#171512]"
          >
            SALE
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="hidden items-center gap-5 lg:flex">

          <button
            className="transition hover:text-[#8A6243]"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          <Link
            to="/wishlist"
            className="transition hover:text-[#8A6243]"
            aria-label="Wishlist"
          >
            <Heart size={20} strokeWidth={1.8} />
          </Link>

          <Link
            to="/cart"
            className="relative transition hover:text-[#8A6243]"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />

            {/* Cart count */}
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#B8E63C] text-[10px] font-bold text-[#171512]">
              0
            </span>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={25} strokeWidth={1.8} />
          ) : (
            <Menu size={25} strokeWidth={1.8} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[#171512]/10 bg-[#F5F2EC] px-6 pb-8 pt-6 lg:hidden">

          <div className="flex flex-col gap-6">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium tracking-wide"
            >
              HOME
            </Link>

            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium tracking-wide"
            >
              SHOP
            </Link>

            <Link
              to="/collections"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium tracking-wide"
            >
              COLLECTIONS
            </Link>

            <Link
              to="/products?new=true"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium tracking-wide"
            >
              NEW ARRIVALS
            </Link>

            <Link
              to="/products?sale=true"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium tracking-wide text-[#8A6243]"
            >
              SALE
            </Link>

            <div className="my-2 h-px bg-[#171512]/10" />

            <div className="flex items-center gap-6">

              <button aria-label="Search">
                <Search size={20} strokeWidth={1.8} />
              </button>

              <Link to="/wishlist" aria-label="Wishlist">
                <Heart size={20} strokeWidth={1.8} />
              </Link>

              <Link to="/cart" aria-label="Shopping cart">
                <ShoppingBag size={20} strokeWidth={1.8} />
              </Link>

            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;