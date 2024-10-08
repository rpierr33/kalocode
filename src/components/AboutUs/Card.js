import React from "react";
import { Box, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const AboutCard = ({ data }) => {
  const Team = data.team;
  const VisionArticles = data.visionArticles;
  const cardsData = data.cardsData;
  return (
    <div data-aos="fade-up" className="vision">
      <div className="card-container">
        {cardsData.map((card) => (
          <div key={card.id} className="card">
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
      <div className="articles">
        {VisionArticles.map((article, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              marginBottom: "20px",
              px: { xs: 2, md: 10 },
            }}
            key={index}
          >
            <Box
              sx={{
                width: { xs: "100%", md: "50%" },
                padding: { xs: "0", md: "20px" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>

            <Box
              sx={{
                padding: { xs: "10px", md: "20px 50px" },
                maxWidth: { xs: "100%", md: "50%" },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <h1
                style={{ fontSize: "24px", marginBottom: "10px" }}
                className="text_heading"
              >
                {article.title}
              </h1>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  marginBottom: "10px",
                  textAlign: "justify",
                }}
                className="p_text"
              >
                {article.description}
              </p>
            </Box>
          </Box>
        ))}
      </div>

      <div className="card-container">
        {Team.map((card, index) => (
          <div key={index} className="card">
            <Box className="progress-circle" display="inline-flex">
              <img
                src={card.profile}
                alt={card.name}
                style={{ borderRadius: "50%", width: "150px", height: "150px" }}
              />
            </Box>
            <h6 className="h6_text">{card.name}</h6>
            <p className="p_text">{card.role}</p>
            <div className="icons">
              {/* Social Media Icons */}
              <IconButton href={card.facebook} target="_blank">
                <Facebook sx={{ color: "#3b5998" }} />
              </IconButton>
              <IconButton href={card.twitter} target="_blank">
                <Twitter sx={{ color: "#1DA1F2" }} />
              </IconButton>
              <IconButton href={card.instagram} target="_blank">
                <Instagram sx={{ color: "#E1306C" }} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutCard;
