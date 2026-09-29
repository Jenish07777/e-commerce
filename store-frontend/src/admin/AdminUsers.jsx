import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export default function AdminUsers() {
  const { user, token, loading: authLoading } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:8000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data.users);
    } catch (error) {
      console.error("Users error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.role === "admin") {
      fetchUsers();
    }
  }, [token, user]);

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
          USERS
        </h1>
      </div>

      {/* USERS TABLE */}

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
        <table className="w-full min-w-[700px]">
          <thead className="bg-white/5">
            <tr className="text-left text-xs tracking-wider text-white/40">
              <th className="px-5 py-4">
                NAME
              </th>

              <th className="px-5 py-4">
                EMAIL
              </th>

              <th className="px-5 py-4">
                ROLE
              </th>

              <th className="px-5 py-4">
                JOINED
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((item) => (
              <tr
                key={item._id}
                className="border-t border-white/10 hover:bg-white/[0.02]"
              >
                <td className="px-5 py-5 font-medium text-[#F5F2EC]">
                  {item.fullName}
                </td>

                <td className="px-5 py-5 text-white/50">
                  {item.email}
                </td>

                <td className="px-5 py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      item.role === "admin"
                        ? "bg-[#B8E63C]/10 text-[#B8E63C]"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {item.role}
                  </span>
                </td>

                <td className="px-5 py-5 text-sm text-white/50">
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-10 text-center text-white/40">
            No users found.
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

      Loading users...
    </div>
  );
}