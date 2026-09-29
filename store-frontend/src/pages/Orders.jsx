import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Package } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Orders() {
  const { token, isLoggedIn, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost:8000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data.orders);
      } catch (error) {
        console.error("Fetch orders error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchOrders();
    }
  }, [token, authLoading]);

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-[#F5F2EC] px-5 py-20 text-[#171512] md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.3em] text-[#8A6243]">
            ORDERS
          </p>

          <h1 className="mt-5 text-6xl font-bold uppercase tracking-tight">
            Loading...
          </h1>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#F5F2EC] px-5 py-20 text-[#171512] md:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <Package size={50} className="mx-auto" />

          <p className="mt-8 text-xs tracking-[0.3em] text-[#8A6243]">
            ORDERS
          </p>

          <h1 className="mt-5 text-5xl font-bold uppercase">
            Login Required
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm text-[#171512]/60">
            Please login to view your orders.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex bg-[#171512] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F5F2EC] px-5 py-20 text-[#171512] md:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-[0.3em] text-[#8A6243]">
            ORDERS
          </p>

          <h1 className="mt-5 text-5xl font-bold uppercase">
            Something Went Wrong
          </h1>

          <p className="mt-5 text-sm text-red-600">
            {error}
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 bg-[#171512] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F2EC] px-5 py-20 text-[#171512] md:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <Package
            size={55}
            strokeWidth={1.5}
            className="mx-auto"
          />

          <p className="mt-8 text-xs tracking-[0.3em] text-[#8A6243]">
            YOUR ORDERS
          </p>

          <h1 className="mt-5 text-5xl font-bold uppercase">
            No Orders Yet
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[#171512]/60">
            You haven't placed any orders yet. Start shopping
            and your orders will appear here.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-3 bg-[#171512] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
          >
            Shop Now
          </Link>
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
            to="/profile"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#171512]/60 transition hover:text-[#171512]"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>

          <p className="mt-10 text-xs tracking-[0.3em] text-[#8A6243]">
            URBAN ACCOUNT
          </p>

          <h1 className="mt-4 text-6xl font-bold uppercase tracking-tight md:text-8xl">
            My Orders
          </h1>
        </div>

        {/* Orders */}
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-[#171512]/10 bg-[#EAE4DA]"
            >
              {/* Order Header */}
              <div className="flex flex-col justify-between gap-5 border-b border-[#171512]/10 p-6 md:flex-row md:items-center md:p-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#171512]/50">
                    Order ID
                  </p>

                  <p className="mt-2 font-mono text-sm font-semibold">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#171512]/50">
                    Date
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#171512]/50">
                    Status
                  </p>

                  <span className="mt-2 inline-block bg-[#B8E63C] px-3 py-1 text-xs font-bold uppercase">
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#171512]/50">
                    Total
                  </p>

                  <p className="mt-2 text-lg font-bold">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-5 p-6 md:p-8">
                {order.items.map((item, index) => (
                  <div
                    key={`${order._id}-${item.product}-${index}`}
                    className="flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 object-cover"
                    />

                    <div className="flex flex-1 justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#171512]/50">
                          Size: {item.size}
                        </p>

                        <p className="mt-1 text-xs text-[#171512]/50">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        $
                        {(item.price * item.quantity).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-col gap-3 border-t border-[#171512]/10 p-6 text-sm md:flex-row md:items-center md:justify-between md:p-8">
                <div className="text-[#171512]/60">
                  Payment:{" "}
                  <span className="font-semibold uppercase text-[#171512]">
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Card"}
                  </span>
                </div>

                <div className="text-[#171512]/60">
                  Shipping:{" "}
                  <span className="font-semibold text-[#171512]">
                    {order.shipping === 0
                      ? "FREE"
                      : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}