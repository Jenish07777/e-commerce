import { useEffect, useState } from "react";
import axios from "axios";
import {
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { RefreshCw } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

const emptyForm = {
  name: "",
  price: "",
  category: "",
  image: "",
  description: "",
  badge: "",
  stock: "",
  sizes: "",
  colors: "",
  material: "",
  rating: "",
  reviews: "",
};

export default function AdminProductForm() {
  const { user, token, loading: authLoading } = useAuth();

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(emptyForm);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditing || !token) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const product = response.data.products.find(
          (item) => item._id === id
        );

        if (!product) {
          alert("Product not found.");
          navigate("/admin/products");
          return;
        }

        setFormData({
          name: product.name || "",
          price: product.price || "",
          category: product.category || "",
          image: product.image || "",
          description: product.description || "",
          badge: product.badge || "",
          stock: product.stock || "",
          sizes: product.sizes?.join(", ") || "",
          colors: product.colors?.join(", ") || "",
          material: product.material || "",
          rating: product.rating || "",
          reviews: product.reviews || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const productData = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        image: formData.image,
        description: formData.description,
        badge: formData.badge || null,
        stock: Number(formData.stock),

        sizes: formData.sizes
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        colors: formData.colors
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        material: formData.material,

        rating: Number(formData.rating) || 0,

        reviews: Number(formData.reviews) || 0,
      };

      if (isEditing) {
        await axios.put(
          `http://localhost:8000/api/admin/products/${id}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/admin/products",
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return <Loading />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#11110F] text-[#F5F2EC]">
      {/* HEADER */}

      <div className="mb-8">
        <button
          onClick={() => navigate("/admin/products")}
          className="mb-5 text-sm text-white/40 transition hover:text-[#B8E63C]"
        >
          ← Back to Products
        </button>

        <p className="text-xs tracking-[0.3em] text-white/40">
          PRODUCT MANAGEMENT
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#F5F2EC]">
          {isEditing
            ? "EDIT PRODUCT"
            : "ADD PRODUCT"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl space-y-6"
      >
        {/* BASIC INFORMATION */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-6 text-lg font-bold text-[#F5F2EC]">
            BASIC INFORMATION
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Oversized Graphic T-Shirt"
              required
            />

            <Input
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="2499"
              required
            />

            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="T-Shirts"
              required
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="25"
              required
            />
          </div>
        </div>

        {/* IMAGE */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-6 text-lg font-bold text-[#F5F2EC]">
            PRODUCT IMAGE
          </h2>

          <Input
            label="Image URL"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/product.jpg"
            required
          />

          {formData.image && (
            <div className="mt-5">
              <p className="mb-2 text-xs tracking-wider text-white/40">
                PREVIEW
              </p>

              <img
                src={formData.image}
                alt="Product preview"
                className="h-56 w-56 rounded-xl border border-white/10 object-cover"
              />
            </div>
          )}
        </div>

        {/* DESCRIPTION */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-6 text-lg font-bold text-[#F5F2EC]">
            DESCRIPTION
          </h2>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product..."
            rows={6}
            required
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#F5F2EC] outline-none placeholder:text-white/30 focus:border-[#B8E63C]"
          />
        </div>

        {/* PRODUCT DETAILS */}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-6 text-lg font-bold text-[#F5F2EC]">
            PRODUCT DETAILS
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Sizes"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              placeholder="S, M, L, XL"
            />

            <Input
              label="Colors"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              placeholder="Black, White, Gray"
            />

            <Input
              label="Material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              placeholder="100% Cotton"
            />

            <Input
              label="Badge"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="NEW"
            />

            <Input
              label="Rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
            />

            <Input
              label="Reviews"
              name="reviews"
              type="number"
              min="0"
              value={formData.reviews}
              onChange={handleChange}
              placeholder="100"
            />
          </div>
        </div>

        {/* BUTTONS */}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/products")
            }
            className="rounded-xl border border-white/10 px-6 py-3 text-sm text-[#F5F2EC] transition hover:bg-white/10"
          >
            CANCEL
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#B8E63C] px-6 py-3 text-sm font-semibold text-[#171512] transition hover:opacity-90 disabled:opacity-50"
          >
            {saving
              ? "SAVING..."
              : isEditing
              ? "SAVE CHANGES"
              : "CREATE PRODUCT"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  step,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/60">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#F5F2EC] outline-none placeholder:text-white/30 focus:border-[#B8E63C]"
      />
    </div>
  );
}

function Loading() {
  return (
    <div className="min-h-screen bg-[#11110F] text-[#F5F2EC] flex items-center justify-center">
      <RefreshCw
        size={20}
        className="mr-3 animate-spin text-[#B8E63C]"
      />

      Loading...
    </div>
  );
}