import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function Profile() {
  const navigate = useNavigate();

  const {
    user,
    loading,
    isLoggedIn,
    logout,
  } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F2EC] text-[#171512]">
        <p className="text-sm uppercase tracking-widest">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] px-5 py-12 text-[#171512] md:px-10 lg:px-20">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] text-[#8A6243]">
            MY ACCOUNT
          </p>

          <h1 className="mt-4 text-6xl font-bold uppercase tracking-tight">
            Profile
          </h1>
        </div>

        {/* Profile */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* User Information */}
          <div className="bg-[#171512] p-8 text-[#F5F2EC] md:col-span-2">
            <p className="text-xs tracking-[0.3em] text-[#B8E63C]">
              PERSONAL INFORMATION
            </p>

            <div className="mt-10 space-y-8">

              <div>
                <p className="text-xs uppercase tracking-widest text-[#F5F2EC]/50">
                  Full Name
                </p>

                <p className="mt-2 text-2xl font-semibold">
                  {user?.fullName}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-[#F5F2EC]/50">
                  Email
                </p>

                <p className="mt-2 text-lg">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-[#F5F2EC]/50">
                  Account Type
                </p>

                <p className="mt-2 text-lg capitalize">
                  {user?.role}
                </p>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div className="bg-[#EAE4DA] p-8">

            <p className="text-xs tracking-[0.3em] text-[#8A6243]">
              ACCOUNT
            </p>

            <div className="mt-8 space-y-4">

              <button
                onClick={() => navigate("/orders")}
                className="w-full bg-[#171512] px-5 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
              >
                My Orders
              </button>

              <button
                onClick={handleLogout}
                className="w-full border border-[#171512]/30 px-5 py-4 text-sm font-semibold uppercase tracking-widest transition hover:bg-[#171512] hover:text-[#F5F2EC]"
              >
                Logout
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}