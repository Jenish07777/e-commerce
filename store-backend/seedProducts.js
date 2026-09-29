import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Essential Oversized Tee",
    price: 45,
    category: "T-Shirts",
    image: "/products/product-1.jpg",
    description:
      "A premium oversized t-shirt designed for everyday streetwear. Comfortable, minimal, and easy to style.",
    badge: "NEW",
    stock: 50,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    material: "100% Premium Cotton",
    rating: 4.8,
    reviews: 124,
  },

  {
    name: "Heavyweight Hoodie",
    price: 85,
    category: "Hoodies",
    image: "/products/product-2.jpg",
    description:
      "A heavyweight hoodie with a relaxed fit, made for comfort and everyday street style.",
    badge: "NEW",
    stock: 30,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Grey"],
    material: "80% Cotton, 20% Polyester",
    rating: 4.9,
    reviews: 98,
  },

  {
    name: "Relaxed Cargo Pants",
    price: 75,
    category: "Pants",
    image: "/products/product-3.jpg",
    description:
      "Relaxed-fit cargo pants featuring multiple utility pockets and a modern streetwear silhouette.",
    badge: "NEW",
    stock: 35,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive"],
    material: "100% Cotton",
    rating: 4.7,
    reviews: 86,
  },

  {
    name: "Urban Runner",
    price: 120,
    category: "Sneakers",
    image: "/products/product-4.jpg",
    description:
      "Modern everyday sneakers combining a clean silhouette with comfortable cushioning for daily wear.",
    badge: "BEST SELLER",
    stock: 25,
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["Black", "White"],
    material: "Mesh and Synthetic Leather",
    rating: 4.9,
    reviews: 156,
  },

  {
    name: "Oversized Graphic Tee",
    price: 50,
    category: "T-Shirts",
    image: "/products/product-5.jpg",
    description:
      "A relaxed oversized graphic t-shirt made for bold everyday streetwear looks.",
    badge: null,
    stock: 40,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    material: "100% Cotton",
    rating: 4.6,
    reviews: 72,
  },

  {
    name: "Urban Zip Hoodie",
    price: 95,
    category: "Hoodies",
    image: "/products/product-6.jpg",
    description:
      "A versatile zip-up hoodie with a relaxed fit and premium heavyweight construction.",
    badge: "NEW",
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    material: "80% Cotton, 20% Polyester",
    rating: 4.8,
    reviews: 64,
  },

  {
    name: "Wide Leg Utility Pants",
    price: 80,
    category: "Pants",
    image: "/products/product-7.jpg",
    description:
      "Wide-leg utility pants designed with a relaxed silhouette and functional details.",
    badge: null,
    stock: 30,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Beige"],
    material: "100% Cotton",
    rating: 4.7,
    reviews: 59,
  },

  {
    name: "Street Classic Sneakers",
    price: 110,
    category: "Sneakers",
    image: "/products/product-8.jpg",
    description:
      "Classic streetwear sneakers with a versatile design that works with everyday outfits.",
    badge: "BEST SELLER",
    stock: 20,
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["White", "Black"],
    material: "Leather and Rubber",
    rating: 4.8,
    reviews: 138,
  },

  {
    name: "Essential Bomber Jacket",
    price: 130,
    category: "Jackets",
    image: "/products/product-9.jpg",
    description:
      "A clean and versatile bomber jacket with a relaxed fit for modern streetwear styling.",
    badge: null,
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    material: "Nylon",
    rating: 4.7,
    reviews: 47,
  },

  {
    name: "Everyday Cap",
    price: 35,
    category: "Accessories",
    image: "/products/product-10.jpg",
    description:
      "A simple everyday cap featuring a clean design that pairs easily with any streetwear outfit.",
    badge: null,
    stock: 50,
    sizes: ["One Size"],
    colors: ["Black", "Beige"],
    material: "100% Cotton",
    rating: 4.5,
    reviews: 41,
  },

  {
    name: "Relaxed Street Jacket",
    price: 115,
    category: "Jackets",
    image: "/products/product-11.jpg",
    description:
      "A relaxed street jacket designed for layering and everyday urban wear.",
    badge: null,
    stock: 20,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive"],
    material: "Cotton Blend",
    rating: 4.6,
    reviews: 52,
  },

  {
    name: "Urban Crossbody Bag",
    price: 65,
    category: "Accessories",
    image: "/products/product-12.jpg",
    description:
      "A compact crossbody bag designed to carry your everyday essentials while keeping a clean streetwear aesthetic.",
    badge: "NEW",
    stock: 35,
    sizes: ["One Size"],
    colors: ["Black", "Grey"],
    material: "Nylon",
    rating: 4.8,
    reviews: 67,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("12 products successfully added!");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedProducts();