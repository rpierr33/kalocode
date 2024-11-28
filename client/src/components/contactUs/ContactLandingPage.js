import { Box } from "@mui/material";
import React from "react";

const cardsData = [
  {
    id: 1,
    title: "Great Advices",
    description:
      "Donec ullamcorper varius mauris vel blandit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    image: "/assets/icon-img-1h.webp",
  },
  {
    id: 2,
    title: "24/7 Support",
    description:
      "Donec ullamcorper varius mauris vel blandit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    image: "/assets/icon-img-2.webp",
  },
  {
    id: 3,
    title: "Optimal Choice",
    description:
      "Donec ullamcorper varius mauris vel blandit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    image: "/assets/icon-img-3h.webp",
  },
];

const ContactLandingPage = () => {
  return (
    <div data-aos="fade-up">
      <div className="landingPage">
        <div className="landingPage_text">
          <h1>Company Growth Strategy</h1>
          <p className="p_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis
            egestas ante, sed viverra nunc.
          </p>
        </div>

        <img
          style={{
            height: "100%",
            display: "block",
          }}
          src="assets/p8-title-img2-2.webp"
          alt="aboutus"
        />
      </div>

      <div className="card-container">
        {cardsData.map((card) => (
          <div style={{ padding: "0 20px" }} key={card.id} className="card">
            <Box
              className="progress-circle"
              position="relative"
              display="inline-flex"
            >
              <img src={card.image} alt={card.title} />
            </Box>
            <h6 className="h6_text">{card.title}</h6>
            <p className="p_text">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactLandingPage;
