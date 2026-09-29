import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { RefreshCw } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export default function AdminProducts() {
  const { user, token, loading: authLoading } = useAuth();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:8000/api/admin/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data.products);
    } catch (error) {
      console.error("Products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.role === "admin") {
      fetchProducts();
    }
  }, [token, user]);

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();
    } catch (error) {
      console.error("Delete product error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
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

      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-white/40">
            MANAGEMENT
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#F5F2EC]">
            PRODUCTS
          </h1>
        </div>

        <Link
          to="/admin/products/new"
          className="rounded-full bg-[#B8E63C] px-5 py-3 text-sm font-semibold text-[#171512] hover:opacity-90"
        >
          + ADD PRODUCT
        </Link>
      </div>

      {/* PRODUCTS */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full object-cover"
            />

            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-white/40">
                {product.category}
              </p>

              <h2 className="mt-2 text-lg font-bold text-[#F5F2EC]">
                {product.name}
              </h2>

              <p className="mt-2 font-semibold text-[#F5F2EC]">
                NPR {product.price.toLocaleString()}
              </p>

              <div className="mt-2 flex justify-between text-sm text-white/40">
                <span>
                  Stock: {product.stock}
                </span>

                <span>
                  {product.sizes?.length || 0} sizes
                </span>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() =>
                    navigate(
                      `/admin/products/edit/${product._id}`
                    )
                  }
                  className="flex-1 rounded-lg border border-white/10 py-2 text-sm text-[#F5F2EC] hover:bg-white/10"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                  className="flex-1 rounded-lg bg-red-500/10 py-2 text-sm text-red-300 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-white/40">
          No products found.
        </div>
      )}
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

      Loading products...
    </div>
  );
}