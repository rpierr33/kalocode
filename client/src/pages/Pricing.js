import React from "react";
import PricingCards from "../components/pricing/PricingCards";

const Pricing = () => {
  return (
    <div className="pricing ">
      <img
        data-aos="fade-up"
        style={{
          height: "100%",
          display: "block",
        }}
        src="/assets/p6-title-img2.webp"
        alt="pricing "
      />
      <PricingCards />
    </div>
  );
};

export default Pricing;
