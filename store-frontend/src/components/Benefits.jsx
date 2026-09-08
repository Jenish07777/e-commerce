const benefits = [
  {
    number: "01",
    title: "FREE SHIPPING",
    description: "On orders over $100",
  },
  {
    number: "02",
    title: "EASY RETURNS",
    description: "30-day return policy",
  },
  {
    number: "03",
    title: "SECURE PAYMENT",
    description: "100% secure checkout",
  },
  {
    number: "04",
    title: "CUSTOMER SUPPORT",
    description: "We're here to help",
  },
];

const Benefits = () => {
  return (
    <section className="border-b border-[#171512]/10 bg-[#F5F2EC]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.number}
            className="border-r border-[#171512]/10 px-6 py-8 last:border-r-0 md:px-8 md:py-10"
          >
            <p className="mb-5 text-xs tracking-[0.2em] text-[#8A6243]">
              {benefit.number}
            </p>

            <h3 className="text-sm font-bold tracking-wide">
              {benefit.title}
            </h3>

            <p className="mt-2 text-xs text-[#171512]/55">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;