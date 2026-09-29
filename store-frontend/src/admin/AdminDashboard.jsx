import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export default function AdminDashboard() {
  const { user, token, loading: authLoading } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:8000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.role === "admin") {
      fetchStats();
    }
  }, [token, user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#11110F] text-[#F5F2EC] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-[#11110F] text-[#F5F2EC] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw
            size={20}
            className="animate-spin text-[#B8E63C]"
          />
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11110F] text-[#F5F2EC]">
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] text-white/40">
          OVERVIEW
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#F5F2EC]">
          DASHBOARD
        </h1>
      </div>

      {/* MAIN STATS */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="TOTAL REVENUE"
          value={`NPR ${stats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign size={20} />}
        />

        <StatCard
          title="TOTAL ORDERS"
          value={stats.totalOrders}
          icon={<ShoppingBag size={20} />}
        />

        <StatCard
          title="TOTAL PRODUCTS"
          value={stats.totalProducts}
          icon={<Package size={20} />}
        />

        <StatCard
          title="TOTAL USERS"
          value={stats.totalUsers}
          icon={<Users size={20} />}
        />
      </div>

      {/* ORDER STATUS */}

      <div className="mt-10">
        <h2 className="mb-5 text-xl font-bold text-[#F5F2EC]">
          ORDER STATUS
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            label="Processing"
            value={stats.pendingOrders}
            icon={<Clock size={20} />}
          />

          <StatusCard
            label="Shipped"
            value={stats.shippedOrders}
            icon={<Truck size={20} />}
          />

          <StatusCard
            label="Delivered"
            value={stats.deliveredOrders}
            icon={<CheckCircle size={20} />}
          />

          <StatusCard
            label="Cancelled"
            value={stats.cancelledOrders}
            icon={<XCircle size={20} />}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-[0.2em] text-white/40">
          {title}
        </p>

        <div className="text-[#B8E63C]">
          {icon}
        </div>
      </div>

      <p className="mt-6 text-3xl font-bold text-[#F5F2EC]">
        {value}
      </p>
    </div>
  );
}

function StatusCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-3 text-white/50">
        {icon}

        <span className="text-sm">
          {label}
        </span>
      </div>

      <p className="mt-5 text-3xl font-bold text-[#F5F2EC]">
        {value}
      </p>
    </div>
  );
}