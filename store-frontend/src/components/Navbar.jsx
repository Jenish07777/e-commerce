import { Link, useNavigate } from "react-router-dom";
// import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { cartCount } = useCart();

  const { wishlistCount } = useWishlist();

  const { user, isLoggedIn, logout } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-[#F5F2EC] text-[#171512]">
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link to="/" className="text-3xl font-black tracking-[0.05em]">
          URBAN
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
        {/* Right Side */}
        <div className="hidden items-center gap-5 lg:flex">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="transition hover:text-[#8A6243]"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative transition hover:text-[#8A6243]"
            aria-label="Wishlist"
          >
            <Heart size={20} strokeWidth={1.8} />

            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B8E63C] px-1 text-[10px] font-bold text-[#171512]">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative transition hover:text-[#8A6243]"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B8E63C] px-1 text-[10px] font-bold text-[#171512]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Authentication */}
          <div className="ml-2 border-l border-[#171512]/10 pl-5">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Hi, {user?.fullName}</span>

                <Link
                  to="/profile"
                  className="text-sm font-medium transition hover:text-[#8A6243]"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="text-sm font-medium transition hover:text-[#8A6243]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium transition hover:text-[#8A6243]"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="text-sm font-medium transition hover:text-[#8A6243]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
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

      {searchOpen && (
  <div className="border-t border-[#171512]/10 bg-[#F5F2EC] px-6 py-4">
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;

        navigate(
          `/products?search=${encodeURIComponent(searchQuery.trim())}`
        );

        setSearchQuery("");
        setSearchOpen(false);
        setMenuOpen(false);
      }}
      className="mx-auto flex max-w-[1400px] items-center gap-3"
    >
      <Search size={20} strokeWidth={1.8} />

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        autoFocus
        className="w-full bg-transparent text-sm outline-none placeholder:text-[#171512]/50"
      />

      <button
        type="button"
        onClick={() => {
          setSearchQuery("");
          setSearchOpen(false);
        }}
        className="text-sm font-medium"
      >
        CLOSE
      </button>
    </form>
  </div>
)}

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
              <div className="my-2 h-px bg-[#171512]/10" />

              {/* Authentication */}
              {isLoggedIn ? (
                <>
                  <span className="py-2 text-sm">Hi, {user?.fullName}</span>

                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm font-medium"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate("/login");
                    }}
                    className="block py-3 text-left text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm font-medium"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

// {/* <div className="hidden items-center gap-5 lg:flex">
//           <button
//             className="transition hover:text-[#8A6243]"
//             aria-label="Search"
//           >
//             <Search size={20} strokeWidth={1.8} />
//           </button>

//           <Link
//             to="/wishlist"
//             className="relative transition hover:text-[#8A6243]"
//             aria-label="Wishlist"
//           >
//             <Heart size={20} strokeWidth={1.8} />

//             {wishlistCount > 0 && (
//               <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B8E63C] px-1 text-[10px] font-bold text-[#171512]">
//                 {wishlistCount}
//               </span>
//             )}
//           </Link>

//           <Link
//             to="/cart"
//             className="relative transition hover:text-[#8A6243]"
//             aria-label="Shopping cart"
//           >
//             <ShoppingBag size={20} strokeWidth={1.8} />

//             {/* Cart count */}
//             <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#B8E63C] px-1 text-[10px] font-bold text-[#171512]">
//               {cartCount}
//             </span>
//           </Link>
//         </div> */}
