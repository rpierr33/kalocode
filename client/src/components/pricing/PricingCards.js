import React from "react";
import "./Pricing.css";
import { getAssetsAndData } from "../../data/pricingData";

const PricingCards = () => {
  const { PricingTypes, serviceComparison, images, textContent } =
    getAssetsAndData();

  return (
    <div className="pricing_cards">
      <div data-aos="fade-up" className="pricing_cardsHeader">
        <h1 style={{ textAlign: "start" }} className="text_heading">
          {textContent.heading}
        </h1>
        <p style={{ fontSize: "20px", lineHeight: "33px" }} className="p_text">
          {textContent.paragraph}
        </p>
      </div>

      <section data-aos="fade-up" className="pricing_cardsTop">
        <div className="card-container">
          {PricingTypes.map((card, index) => (
            <div
              key={card.id}
              style={
                index === 0
                  ? {
                      transform: "scale(1.05)",
                      borderRadius: "10px",
                      boxShadow:
                        "rgba(88, 70, 140, 0.1) 0px 8px 24px, rgba(88, 70, 140, 0.1) 0px 16px 56px, rgba(88, 70, 140, 0.1) 0px 24px 80px",
                      display: "flex",
                      flexDirection: "row",
                      padding: "20px",
                    }
                  : {
                      display: "flex",
                      flexDirection: "row",
                      padding: "20px",
                    }
              }
              className="card"
            >
              <div className="card_header">
                <h2>{card.month}</h2>
                <p>
                  EVERY MONTH
                  <br /> OR YEARLY
                </p>
              </div>
              <div className="card_body">
                <h6 style={{ padding: "5px 0" }} className="h6_text">
                  {card.title}
                </h6>
                <h6 className="h6_text">{card.tagline}</h6>
                <ul>
                  {card.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Features Comparison Table */}
      <section className="pricing_cardsBottom">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="h6_text">Features</th>
              <th className="h6_text">Basic</th>
              <th className="h6_text">Regular</th>
              <th className="h6_text">Premium</th>
            </tr>
          </thead>
          <tbody>
            {serviceComparison.map((feature, index) => (
              <tr key={index}>
                <td
                  style={{
                    fontSize: "20px",
                    lineHeight: "33px",
                    textAlign: "start",
                  }}
                  className="p_text"
                >
                  {feature.service}
                </td>
                <td>
                  {feature.basic && <img src={images.checkIcon} alt="check" />}
                </td>
                <td>
                  {feature.regular && (
                    <img src={images.checkIcon} alt="check" />
                  )}
                </td>
                <td>
                  {feature.premium && (
                    <img src={images.checkIcon} alt="check" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PricingCards;
