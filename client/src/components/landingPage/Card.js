import React from "react";
import { CircularProgress, Box, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { cardsData, visionArticles, teamData } from "../../data/homeData";

const Card = () => {
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
              <CircularProgress
                variant="determinate"
                value={card.progress}
                size={200}
                style={{ color: card.color }}
              />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <h1 className="h1_text">{`${Math.round(card.progress)}%`}</h1>
              </Box>
            </Box>
            <h6 className="h6_text">{card.title}</h6>
            <p className="p_text">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="articles">
        {visionArticles.map((article, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
              px: 2,
            }}
            key={index}
          >
            <img
              src={article.image}
              alt={article.title}
              style={{ width: "100%", maxWidth: "600px", height: "auto" }}
            />
            <Box
              sx={{ padding: "20px", maxWidth: "600px", textAlign: "start" }}
            >
              <h1 className="text_heading">{article.title}</h1>
              <p
                className="p_text"
                style={{ fontSize: "20px", lineHeight: "33px" }}
              >
                {article.description}
              </p>
            </Box>
          </Box>
        ))}
      </div>

      <div className="card-container">
        {teamData.map((card, index) => (
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

export default Card;
