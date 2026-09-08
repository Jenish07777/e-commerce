import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Register data:", formData);

    // Backend registration will be connected later
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] px-5 py-12 text-[#171512] md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden bg-[#EAE4DA] lg:grid-cols-2">

        {/* Left - Branding */}
        <div className="hidden min-h-[700px] flex-col justify-between bg-[#B8E63C] p-10 text-[#171512] lg:flex">
          <div>
            <p className="text-sm tracking-[0.3em]">
              JOIN THE MOVEMENT
            </p>

            <h1 className="mt-10 text-8xl font-bold uppercase leading-[0.8] tracking-tight">
              URBAN
            </h1>
          </div>

          <div>
            <p className="max-w-sm text-sm leading-6 text-[#171512]/70">
              Create your account and discover clothing,
              sneakers and accessories made for everyday movement.
            </p>
          </div>
        </div>

        {/* Right - Register Form */}
        <div className="flex min-h-[700px] items-center justify-center p-6 sm:p-10 md:p-16">
          <div className="w-full max-w-md">

            <div className="mb-10">
              <p className="text-xs tracking-[0.3em] text-[#8A6243]">
                ACCOUNT
              </p>

              <h2 className="mt-4 text-5xl font-bold uppercase tracking-tight">
                Register
              </h2>

              <p className="mt-4 text-sm text-[#171512]/60">
                Create your URBAN account and start shopping.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-xs font-medium uppercase tracking-widest"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/50"
                  />

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full border border-[#171512]/20 bg-[#F5F2EC] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#171512]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium uppercase tracking-widest"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/50"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full border border-[#171512]/20 bg-[#F5F2EC] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#171512]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium uppercase tracking-widest"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/50"
                  />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="w-full border border-[#171512]/20 bg-[#F5F2EC] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#171512]"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-medium uppercase tracking-widest"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/50"
                  />

                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="w-full border border-[#171512]/20 bg-[#F5F2EC] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#171512]"
                  />
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-center gap-3 bg-[#171512] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512]"
              >
                Create Account

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Login */}
            <div className="mt-8 border-t border-[#171512]/15 pt-7 text-center">
              <p className="text-sm text-[#171512]/60">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-3 inline-block text-sm font-semibold uppercase tracking-widest underline underline-offset-4 transition hover:text-[#8A6243]"
              >
                Login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
