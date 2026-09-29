import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export default function AdminOrders() {
  const { user, token, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:8000/api/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data.orders);
    } catch (error) {
      console.error("Orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.role === "admin") {
      fetchOrders();
    }
  }, [token, user]);

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:8000/api/admin/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.error("Status update error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order."
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

      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] text-white/40">
          MANAGEMENT
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#F5F2EC]">
          ORDERS
        </h1>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
        <table className="w-full min-w-[950px]">
          <thead className="bg-white/5">
            <tr className="text-left text-xs tracking-wider text-white/40">
              <th className="px-5 py-4">
                ORDER
              </th>

              <th className="px-5 py-4">
                CUSTOMER
              </th>

              <th className="px-5 py-4">
                TOTAL
              </th>

              <th className="px-5 py-4">
                PAYMENT
              </th>

              <th className="px-5 py-4">
                STATUS
              </th>

              <th className="px-5 py-4">
                DATE
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-white/10 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-5">
                  <span className="font-mono text-xs text-[#F5F2EC]">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                </td>

                <td className="px-5 py-5">
                  <p className="font-medium text-[#F5F2EC]">
                    {order.user?.fullName || "Unknown"}
                  </p>

                  <p className="text-xs text-white/40">
                    {order.user?.email}
                  </p>
                </td>

                <td className="px-5 py-5 font-semibold text-[#F5F2EC]">
                  NPR {order.total.toLocaleString()}
                </td>

                <td className="px-5 py-5 text-xs uppercase text-white/60">
                  {order.paymentMethod}
                </td>

                <td className="px-5 py-5">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="rounded-lg border border-white/10 bg-[#171512] px-3 py-2 text-sm text-[#F5F2EC] outline-none focus:border-[#B8E63C]"
                  >
                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </td>

                <td className="px-5 py-5 text-sm text-white/50">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-10 text-center text-white/40">
            No orders found.
          </div>
        )}
      </div>
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