import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Newsletter email:", email);

    setEmail("");
  };

  return (
    <section className="bg-[#B8E63C] px-6 py-20 text-[#171512] md:px-10 md:py-28">
      <div className="mx-auto max-w-[1000px] text-center">

        <p className="text-xs font-bold tracking-[0.3em]">
          STAY IN THE LOOP
        </p>

        <h2 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight md:text-8xl">
          DON'T MISS
          <br />
          THE DROP.
        </h2>

        <p className="mx-auto mt-6 max-w-md text-sm text-[#171512]/65">
          Sign up for early access to new collections, exclusive drops,
          and special offers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="YOUR EMAIL ADDRESS"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="min-h-14 flex-1 border border-[#171512]/20 bg-[#F5F2EC] px-5 text-xs tracking-wide outline-none placeholder:text-[#171512]/40 focus:border-[#171512]"
          />

          <button
            type="submit"
            className="min-h-14 bg-[#171512] px-8 text-xs font-bold tracking-widest text-[#F5F2EC] transition hover:bg-[#8A6243]"
          >
            SUBSCRIBE →
          </button>
        </form>

      </div>
    </section>
  );
};

export default Newsletter;