import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(response.data);

      login(
        response.data.token,
        response.data.user
      );

      navigate("/profile");
    } catch (error) {
      console.error(error);

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Unable to connect to server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] px-5 py-12 text-[#171512] md:px-10 lg:px-20">

      <div className="mx-auto grid max-w-6xl overflow-hidden bg-[#EAE4DA] lg:grid-cols-2">

        {/* LEFT - BRANDING */}

        <div
          className="relative hidden min-h-[650px] overflow-hidden lg:flex"
          style={{
            backgroundImage: "url('/images/login.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-[#171512]/70" />

          {/* Content */}

          <div className="relative z-10 flex w-full flex-col justify-between p-10 text-[#F5F2EC]">

            <div>

              <p className="text-sm tracking-[0.3em] text-[#B8E63C]">
                WELCOME BACK
              </p>

              <h1 className="mt-10 text-8xl font-bold uppercase leading-[0.8] tracking-tight">
                URBAN
              </h1>

            </div>

            <div>

              <p className="max-w-sm text-sm leading-6 text-[#EAE4DA]/80">
                Your style. Your identity. Your everyday essentials.
                Welcome back to URBAN.
              </p>

            </div>

          </div>

        </div>


        {/* RIGHT - LOGIN FORM */}

        <div className="flex min-h-[650px] items-center justify-center p-6 sm:p-10 md:p-16">

          <div className="w-full max-w-md">

            <div className="mb-10">

              <p className="text-xs tracking-[0.3em] text-[#8A6243]">
                ACCOUNT
              </p>

              <h2 className="mt-4 text-5xl font-bold uppercase tracking-tight">
                Login
              </h2>

              <p className="mt-4 text-sm text-[#171512]/60">
                Sign in to continue shopping with URBAN.
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="mb-6 border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}

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


              {/* PASSWORD */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-xs font-medium uppercase tracking-widest"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs text-[#8A6243] transition hover:text-[#171512]"
                  >
                    Forgot password?
                  </button>

                </div>

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
                    placeholder="Enter your password"
                    required
                    className="w-full border border-[#171512]/20 bg-[#F5F2EC] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#171512]"
                  />

                </div>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 bg-[#171512] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? "LOGGING IN..." : "LOGIN"}

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}

              </button>

            </form>


            {/* REGISTER */}

            <div className="mt-10 border-t border-[#171512]/15 pt-8 text-center">

              <p className="text-sm text-[#171512]/60">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="mt-3 inline-block text-sm font-semibold uppercase tracking-widest underline underline-offset-4 transition hover:text-[#8A6243]"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// import { Link, useNavigate } from "react-router-dom";
// import { ArrowRight, Lock, Mail } from "lucide-react";
// import { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://localhost:8000/api/auth/login",
//         {
//           email: formData.email,
//           password: formData.password,
//         },
//       );

//       console.log(response.data);

//       login(
//   response.data.token,
//   response.data.user
// );

//       navigate("/profile");
//     } catch (error) {
//       console.error(error);

//       if (error.response) {
//         setError(error.response.data.message);
//       } else {
//         setError("Unable to connect to server");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F2EC] px-5 py-12 text-[#171512] md:px-10 lg:px-20">
//       <div className="mx-auto grid max-w-6xl overflow-hidden bg-[#EAE4DA] lg:grid-cols-2">
//         {/* Left - Branding */}
//         <div className="hidden min-h-[650px] flex-col justify-between bg-[#171512] p-10 text-[#F5F2EC] lg:flex">
//           <div>
//             <p className="text-sm tracking-[0.3em] text-[#B8E63C]">
//               WELCOME BACK
//             </p>

//             <h1 className="mt-10 text-8xl font-bold uppercase leading-[0.8] tracking-tight">
//               URBAN
//             </h1>
//           </div>

//           <div>
//             <p className="max-w-sm text-sm leading-6 text-[#EAE4DA]/70">
//               Your style. Your identity. Your everyday essentials. Welcome back
//               to URBAN.
//             </p>
//           </div>
//         </div>

//         {/* Right - Login Form */}
//         <div className="flex min-h-[650px] items-center justify-center p-6 sm:p-10 md:p-16">
//           <div className="w-full max-w-md">
//             <div className="mb-10">
//               <p className="text-xs tracking-[0.3em] text-[#8A6243]">ACCOUNT</p>

//               <h2 className="mt-4 text-5xl font-bold uppercase tracking-tight">
//                 Login
//               </h2>

//               <p className="mt-4 text-sm text-[#171512]/60">
//                 Sign in to continue shopping with URBAN.
//               </p>
//             </div>

//             {error && (
//               <div className="mb-6 border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-600">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="mb-2 block text-xs font-medium uppercase tracking-widest"
//                 >
//                   Email Address
//                 </label>

//                 <div className="relative">
//                   <Mail
//                     size={18}
//                     strokeWidth={1.7}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/50"
//                   />

//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="you@example.com"
//                     required
//                     className="w-full border border-[#171512]/20 bg-[#F5F2EC] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#171512]"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <div className="mb-2 flex items-center justify-between">
//                   <label
//                     htmlFor="password"
//                     className="block text-xs font-medium uppercase tracking-widest"
//                   >
//                     Password
//                   </label>

//                   <button
//                     type="button"
//                     className="text-xs text-[#8A6243] transition hover:text-[#171512]"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>

//                 <div className="relative">
//                   <Lock
//                     size={18}
//                     strokeWidth={1.7}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/50"
//                   />

//                   <input
//                     id="password"
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     required
//                     className="w-full border border-[#171512]/20 bg-[#F5F2EC] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#171512]"
//                   />
//                 </div>
//               </div>

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group flex w-full items-center justify-center gap-3 bg-[#171512] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512] disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {loading ? "LOGGING IN..." : "LOGIN"}

//                 {!loading && (
//                   <ArrowRight
//                     size={18}
//                     className="transition-transform group-hover:translate-x-1"
//                   />
//                 )}
//               </button>
//             </form>

//             {/* Register */}
//             <div className="mt-10 border-t border-[#171512]/15 pt-8 text-center">
//               <p className="text-sm text-[#171512]/60">
//                 Don't have an account?
//               </p>

//               <Link
//                 to="/register"
//                 className="mt-3 inline-block text-sm font-semibold uppercase tracking-widest underline underline-offset-4 transition hover:text-[#8A6243]"
//               >
//                 Create Account
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
