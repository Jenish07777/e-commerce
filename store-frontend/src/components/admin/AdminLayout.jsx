import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  LogOut,
  Store,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingBag size={18} />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package size={18} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#11110F] text-[#F5F2EC]">

      <div className="flex min-h-screen">

        {/* SIDEBAR */}

        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#171512] lg:block">

          <div className="sticky top-0 flex h-screen flex-col p-6">

            {/* LOGO */}

            <div className="mb-10">

              <p className="text-2xl font-bold tracking-tight">
                URBAN
              </p>

              <p className="mt-1 text-xs tracking-[0.25em] text-white/30">
                ADMIN PANEL
              </p>

            </div>

            {/* NAV */}

            <nav className="space-y-2">

              {links.map((link) => (

                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-[#B8E63C] font-semibold text-[#171512]"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>

              ))}

            </nav>

            <div className="mt-auto">

              <div className="mb-4 rounded-xl border border-white/10 p-4">

                <p className="text-xs text-white/30">
                  LOGGED IN AS
                </p>

                <p className="mt-1 truncate text-sm font-medium">
                  {user?.fullName}
                </p>

                <p className="text-xs text-[#B8E63C]">
                  Administrator
                </p>

              </div>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/50 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </div>

        </aside>

        {/* MAIN */}

        <main className="flex-1 bg-[#11110F]">

          {/* TOP BAR */}

          <header className="border-b border-white/10 px-6 py-5">

            <div className="flex items-center justify-between">

              <p className="text-xs tracking-[0.3em] text-white/30">
                URBAN / ADMIN
              </p>

              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white"
              >
                <Store size={17} />
                Store
              </button>

            </div>

          </header>

          <div className="p-6 lg:p-10">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
}