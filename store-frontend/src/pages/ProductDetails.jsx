import { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );

        setProduct(response.data.product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Product not found.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || "");
    }
  }, [product]);



  // Product not found
  if (loading) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F5F2EC] text-[#171512]">
      <p className="text-xs font-bold tracking-[0.3em]">
        LOADING PRODUCT...
      </p>
    </main>
  );
}

if (error || !product) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F5F2EC] px-6 text-[#171512]">
      <div className="text-center">
        <p className="mb-4 text-xs tracking-[0.3em] text-[#8A6243]">
          ERROR 404
        </p>

        <h1 className="text-5xl font-black uppercase">
          PRODUCT NOT FOUND
        </h1>

        <Link
          to="/products"
          className="mt-8 inline-block bg-[#171512] px-7 py-4 text-xs font-bold tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
        >
          BACK TO SHOP
        </Link>
      </div>
    </main>
  );
}

  const increaseQuantity = () => {
  setQuantity((prev) =>
    Math.min(product.stock, prev + 1)
  );
};
  // const increaseQuantity = () => {
  //   setQuantity((prev) => prev + 1);
  // };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
  addToCart(
    product,
    selectedSize,
    quantity
  );

  alert("Added to cart!");
};

  return (
    <main className="bg-[#F5F2EC] text-[#171512]">

      {/* Back to shop */}
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest transition hover:text-[#8A6243]"
        >
          <ArrowLeft size={15} />
          BACK TO SHOP
        </Link>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-[1400px] px-6 py-10 md:px-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">

          {/* Product Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE4DA]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {/* Wishlist */}
            <button
  onClick={() => toggleWishlist(product)}
  aria-label="Add to wishlist"
  className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition ${
    isWishlisted(product._id)
      ? "bg-[#B8E63C]"
      : "bg-[#F5F2EC]/90 hover:bg-[#B8E63C]"
  }`}
>
  <Heart
    size={20}
    strokeWidth={1.8}
    fill={
      isWishlisted(product._id)
        ? "currentColor"
        : "none"
    }
  />
</button>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            {/* Category */}
            <p className="text-xs font-medium tracking-[0.3em] text-[#8A6243]">
              {product.category.toUpperCase()}
            </p>

            {/* Name */}
            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-7 text-2xl font-bold">
              ${product.price}
            </p>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex gap-1 text-[#8A6243]">
                {"★★★★★".split("").map((star, index) => (
                  <span key={index}>★</span>
                ))}
              </div>

              <span className="text-xs text-[#171512]/50">
                {product.rating} ({product.reviews} REVIEWS)
              </span>
            </div>

            {/* Description */}
            <p className="mt-8 max-w-xl text-sm leading-7 text-[#171512]/60">
              {product.description}
            </p>

            <div className="my-8 h-px bg-[#171512]/10" />

            {/* Color */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-widest">
                  COLOR
                </p>

                <span className="text-xs text-[#171512]/50">
                  {product.colors[0]}
                </span>
              </div>

              <div className="mt-4">
                <button
                  className="h-9 w-9 rounded-full border-2 border-[#171512] bg-[#171512]"
                  aria-label={product.colors[0]}
                />
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-widest">
                  SELECT SIZE
                </p>

                <button className="text-xs underline">
                  SIZE GUIDE
                </button>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-4 text-xs font-bold transition ${
                      selectedSize === size
                        ? "border-[#171512] bg-[#171512] text-[#F5F2EC]"
                        : "border-[#171512]/15 hover:border-[#171512]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-4 text-xs font-bold tracking-widest">
                QUANTITY
              </p>

              <div className="flex w-fit items-center border border-[#171512]/15">
                <button
                  onClick={decreaseQuantity}
                  className="flex h-12 w-12 items-center justify-center transition hover:bg-[#EAE4DA]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span className="flex h-12 w-12 items-center justify-center text-sm font-bold">
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  className="flex h-12 w-12 items-center justify-center transition hover:bg-[#EAE4DA]"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-8 w-full bg-[#171512] py-5 text-xs font-bold tracking-[0.2em] text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
            >
              ADD TO CART — ${product.price * quantity}
            </button>

            {/* Product Information */}
            <div className="mt-8 border-t border-[#171512]/10">

              <div className="flex justify-between border-b border-[#171512]/10 py-5">
                <span className="text-xs font-bold tracking-widest">
                  MATERIAL
                </span>

                <span className="text-xs text-[#171512]/60">
                  {product.material}
                </span>
              </div>

              <div className="flex justify-between border-b border-[#171512]/10 py-5">
                <span className="text-xs font-bold tracking-widest">
                  SHIPPING
                </span>

                <span className="text-xs text-[#171512]/60">
                  FREE OVER $100
                </span>
              </div>

              <div className="flex justify-between border-b border-[#171512]/10 py-5">
                <span className="text-xs font-bold tracking-widest">
                  RETURNS
                </span>

                <span className="text-xs text-[#171512]/60">
                  30 DAYS
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Bottom statement */}
      <section className="border-t border-[#171512]/10 bg-[#EAE4DA] px-6 py-16 text-center md:px-10 md:py-20">
        <p className="text-xs tracking-[0.3em] text-[#8A6243]">
          URBAN / ESSENTIALS
        </p>

        <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
          MADE FOR EVERYDAY.
          <br />
          BUILT DIFFERENT.
        </h2>
      </section>

    </main>
  );
};

export default ProductDetails;

// {
//     id: 1,
//     name: "Essential Oversized Tee",
//     price: 45,
//     category: "T-Shirts",
//     image: "/products/product-1.jpg",
//     rating: 4.8,
//     reviews: 124,
//     description:
//       "A relaxed oversized tee designed for everyday comfort. Made with heavyweight cotton and finished with a clean, minimal silhouette.",
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["Black"],
//     material: "100% Premium Cotton",
//   },