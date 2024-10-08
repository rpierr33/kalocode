import React from "react";
import { trusteesData } from "../../data/homeData";

const TrusteesCarousel = () => {
  // Duplicate the trustees array for smooth scrolling
  const trustees = trusteesData;
  const loopedTrustees = [...trustees, ...trustees];

  return (
    <div className="trustees-carousel">
      <div className="trustees-track">
        {loopedTrustees.map((trustee, index) => (
          <img
            key={index}
            className="trustee-image"
            src={trustee.image}
            alt={`Trustee ${trustee.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrusteesCarousel;
