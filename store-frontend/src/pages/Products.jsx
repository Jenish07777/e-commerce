import { useMemo, useState } from "react";
import { Heart, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Essential Oversized Tee",
    price: 45,
    category: "T-Shirts",
    image: "/products/product-1.jpg",
    badge: "NEW",
  },
  {
    id: 2,
    name: "Heavyweight Hoodie",
    price: 85,
    category: "Hoodies",
    image: "/products/product-2.jpg",
    badge: "NEW",
  },
  {
    id: 3,
    name: "Relaxed Cargo Pants",
    price: 75,
    category: "Pants",
    image: "/products/product-3.jpg",
    badge: "NEW",
  },
  {
    id: 4,
    name: "Urban Runner",
    price: 120,
    category: "Sneakers",
    image: "/products/product-4.jpg",
    badge: "BEST SELLER",
  },
  {
    id: 5,
    name: "Oversized Graphic Tee",
    price: 50,
    category: "T-Shirts",
    image: "/products/product-5.jpg",
  },
  {
    id: 6,
    name: "Urban Zip Hoodie",
    price: 95,
    category: "Hoodies",
    image: "/products/product-6.jpg",
    badge: "NEW",
  },
  {
    id: 7,
    name: "Wide Leg Utility Pants",
    price: 80,
    category: "Pants",
    image: "/products/product-7.jpg",
  },
  {
    id: 8,
    name: "Street Classic Sneakers",
    price: 110,
    category: "Sneakers",
    image: "/products/product-8.jpg",
    badge: "BEST SELLER",
  },
  {
    id: 9,
    name: "Essential Bomber Jacket",
    price: 130,
    category: "Jackets",
    image: "/products/product-9.jpg",
  },
  {
    id: 10,
    name: "Everyday Cap",
    price: 35,
    category: "Accessories",
    image: "/products/product-10.jpg",
  },
  {
    id: 11,
    name: "Relaxed Street Jacket",
    price: 115,
    category: "Jackets",
    image: "/products/product-11.jpg",
  },
  {
    id: 12,
    name: "Urban Crossbody Bag",
    price: 65,
    category: "Accessories",
    image: "/products/product-12.jpg",
    badge: "NEW",
  },
];

const categories = [
  "All",
  "T-Shirts",
  "Hoodies",
  "Pants",
  "Sneakers",
  "Jackets",
  "Accessories",
];

const Products = () => {
  const [searchParams] = useSearchParams();

  const initialCategory =
    searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] =
    useState(
      categories.some(
        (category) =>
          category.toLowerCase() === initialCategory.toLowerCase()
      )
        ? categories.find(
            (category) =>
              category.toLowerCase() === initialCategory.toLowerCase()
          )
        : "All"
    );

  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // New arrivals
    if (searchParams.get("new") === "true") {
      result = result.filter(
        (product) => product.badge === "NEW"
      );
    }

    // Sale
    if (searchParams.get("sale") === "true") {
      result = result.filter(
        (product) => product.price >= 80
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [selectedCategory, sortBy, searchParams]);

  return (
    <main className="bg-[#F5F2EC] text-[#171512]">

      {/* Page Header */}
      <section className="px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
        <div className="mx-auto max-w-[1400px]">

          <p className="mb-5 text-xs font-medium tracking-[0.3em] text-[#8A6243]">
            THE URBAN COLLECTION
          </p>

          <h1 className="text-7xl font-black uppercase leading-[0.8] tracking-[-0.04em] md:text-[10rem]">
            SHOP
          </h1>

          <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <p className="max-w-md text-sm leading-6 text-[#171512]/60">
              Explore our latest collection of modern streetwear,
              designed for everyday movement.
            </p>

            <p className="text-xs tracking-widest text-[#171512]/50">
              {filteredProducts.length} PRODUCTS
            </p>
          </div>

        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 border-y border-[#171512]/10 bg-[#F5F2EC]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex w-full items-center justify-between py-5 md:hidden"
          >
            <span className="flex items-center gap-2 text-xs font-bold tracking-widest">
              <SlidersHorizontal size={16} />
              FILTERS
            </span>

            <span className="text-xs">
              {selectedCategory}
            </span>
          </button>

          {/* Filter Content */}
          <div
            className={`${
              showFilters ? "flex" : "hidden"
            } flex-col gap-5 py-5 md:flex md:flex-row md:items-center md:justify-between`}
          >

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                  className={`px-4 py-2 text-xs font-bold tracking-wide transition ${
                    selectedCategory === category
                      ? "bg-[#171512] text-[#F5F2EC]"
                      : "border border-[#171512]/15 hover:border-[#171512]"
                  }`}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-b border-[#171512]/20 bg-transparent py-2 text-xs font-bold tracking-wide outline-none"
            >
              <option value="featured">
                SORT: FEATURED
              </option>

              <option value="price-low">
                PRICE: LOW TO HIGH
              </option>

              <option value="price-high">
                PRICE: HIGH TO LOW
              </option>

              <option value="name">
                NAME: A-Z
              </option>
            </select>

          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1400px]">

          {filteredProducts.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-black uppercase">
                  No Products Found
                </h2>

                <button
                  onClick={() => setSelectedCategory("All")}
                  className="mt-6 bg-[#171512] px-6 py-3 text-xs font-bold tracking-widest text-[#F5F2EC]"
                >
                  VIEW ALL PRODUCTS
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">

              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group"
                >

                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE4DA]">

                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute left-4 top-4 bg-[#B8E63C] px-3 py-1.5 text-[10px] font-bold tracking-widest text-[#171512]">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      aria-label="Add to wishlist"
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F2EC]/90 backdrop-blur-sm transition hover:bg-[#B8E63C]"
                    >
                      <Heart
                        size={16}
                        strokeWidth={1.8}
                      />
                    </button>

                    {/* Add to cart */}
                    <button
                      className="absolute bottom-4 left-4 right-4 hidden items-center justify-center gap-2 bg-[#171512] py-3 text-xs font-bold tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512] md:flex md:opacity-0 md:group-hover:opacity-100"
                    >
                      <ShoppingBag size={15} />
                      ADD TO CART
                    </button>

                  </div>

                  {/* Product Info */}
                  <div className="mt-4">

                    <p className="text-[10px] font-medium tracking-[0.2em] text-[#8A6243]">
                      {product.category.toUpperCase()}
                    </p>

                    <div className="mt-2 flex items-start justify-between gap-3">

                      <Link
                        to={`/products/${product.id}`}
                        className="text-sm font-medium leading-5 hover:underline"
                      >
                        {product.name}
                      </Link>

                      <p className="shrink-0 text-sm font-bold">
                        ${product.price}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>

    </main>
  );
};

export default Products;