import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check passwords

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(response.data);

      // Registration successful

      navigate("/login");

    } catch (error) {
      console.error(error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Registration failed"
        );
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


        {/* LEFT - REGISTER FORM */}

        <div className="flex min-h-[700px] items-center justify-center p-6 sm:p-10 md:p-16">

          <div className="w-full max-w-md">

            {/* HEADER */}

            <div className="mb-10">

              <p className="text-xs tracking-[0.3em] text-[#8A6243]">
                ACCOUNT
              </p>

              <h1 className="mt-4 text-5xl font-bold uppercase tracking-tight">
                Create Account
              </h1>

              <p className="mt-4 text-sm text-[#171512]/60">
                Create your URBAN account to start shopping.
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
              className="space-y-5"
            >

              {/* FULL NAME */}

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
                    minLength={6}
                    className="w-full border border-[#171512]/20 bg-[#F5F2EC] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#171512]"
                  />

                </div>

              </div>


              {/* CONFIRM PASSWORD */}

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
                    minLength={6}
                    className="w-full border border-[#171512]/20 bg-[#F5F2EC] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#171512]"
                  />

                </div>

              </div>


              {/* REGISTER BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex w-full items-center justify-center gap-3 bg-[#171512] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[#F5F2EC] transition hover:bg-[#B8E63C] hover:text-[#171512] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "CREATING ACCOUNT..."
                  : "CREATE ACCOUNT"}

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}

              </button>

            </form>


            {/* LOGIN */}

            <div className="mt-10 border-t border-[#171512]/15 pt-8 text-center">

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


        {/* RIGHT - BRANDING */}

        <div
          className="relative hidden min-h-[700px] overflow-hidden lg:flex"
          style={{
            backgroundImage: "url('/images/register.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* DARK OVERLAY */}

          <div className="absolute inset-0 bg-[#171512]/70" />


          {/* CONTENT */}

          <div className="relative z-10 flex w-full flex-col justify-between p-10 text-[#F5F2EC]">

            <div>

              <p className="text-sm tracking-[0.3em] text-[#B8E63C]">
                JOIN THE MOVEMENT
              </p>

              <h2 className="mt-10 text-8xl font-bold uppercase leading-[0.8] tracking-tight">
                URBAN
              </h2>

            </div>


            <div>

              <p className="max-w-sm text-sm leading-6 text-[#EAE4DA]/80">
                Discover your style. Explore new collections.
                Build your everyday wardrobe with URBAN.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     // Check passwords
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://localhost:8000/api/auth/register",
//         {
//           fullName: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       console.log(response.data);

//       // Registration successful
//       navigate("/login");
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
//     <div className="min-h-screen bg-[#F5F2EC] text-[#171512] flex items-center justify-center px-6 py-20">
//       <div className="w-full max-w-md">

//         {/* Heading */}
//         <div className="mb-10">
//           <p className="text-sm tracking-[0.3em] uppercase">
//             URBAN
//           </p>

//           <h1 className="mt-4 text-5xl font-bold tracking-tight">
//             CREATE ACCOUNT
//           </h1>

//           <p className="mt-4 text-[#171512]/60">
//             Create your URBAN account to continue.
//           </p>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mb-6 border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Full Name */}
//           <div>
//             <label className="mb-2 block text-sm font-medium">
//               Full Name
//             </label>

//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               required
//               className="w-full border-b border-[#171512]/30 bg-transparent px-0 py-3 outline-none focus:border-[#171512]"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="mb-2 block text-sm font-medium">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               required
//               className="w-full border-b border-[#171512]/30 bg-transparent px-0 py-3 outline-none focus:border-[#171512]"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="mb-2 block text-sm font-medium">
//               Password
//             </label>

//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Create a password"
//               required
//               minLength={6}
//               className="w-full border-b border-[#171512]/30 bg-transparent px-0 py-3 outline-none focus:border-[#171512]"
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="mb-2 block text-sm font-medium">
//               Confirm Password
//             </label>

//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm your password"
//               required
//               className="w-full border-b border-[#171512]/30 bg-transparent px-0 py-3 outline-none focus:border-[#171512]"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#171512] py-4 text-sm font-semibold tracking-wider text-[#F5F2EC] transition hover:bg-[#171512]/90 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
//           </button>
//         </form>

//         {/* Login */}
//         <p className="mt-8 text-center text-sm text-[#171512]/60">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="font-semibold text-[#171512] underline"
//           >
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }