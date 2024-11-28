import React, { useState } from "react";
import { Container, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useParams } from "react-router-dom";
import { portfolio } from "../data/portfolio"; // Assuming you have this portfolio data array

const SinglePortfolio = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();

  // Find the portfolio item by matching the ID from the URL
  const portfolioItem = portfolio.find((item) => item.id === id);

  // Ensure we are accessing the images array safely
  if (!portfolioItem) {
    return <p>Portfolio not found</p>; // Handle case when no portfolio is found
  }

  const images = portfolioItem.images;

  const handleNext = () => {
    setCurrentImage((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  return (
    <div
      data-aos="fade-up"
      className="portfolio-container"
      style={styles.container}
    >
      <Container
        maxWidth="xl"
        sx={{
          padding: { xs: "0" },
        }}
      >
        {/* Image Slider Section */}
        <div className="slider" style={styles.slider}>
          <img
            src={images[currentImage].image}
            alt="Portfolio Slide"
            style={styles.image}
          />
          <div style={styles.sliderControls}>
            <IconButton onClick={handlePrev} style={styles.navButton}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={handleNext} style={styles.navButton}>
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        </div>

        {/* Description and Info Section */}
        <div className="description-info" style={styles.infoContainer}>
          <div
            style={styles.description_heading}
            className="description_heading"
          >
            <h1 style={{ textAlign: "start" }} className="text_heading">
              {portfolioItem.title}
            </h1>
            <p
              style={{ fontSize: "20px", lineHeight: "33px" }}
              className="p_text"
            >
              {portfolioItem.description}
            </p>
          </div>

          <div
            style={styles.description_Information}
            className="description_Information"
          >
            <h1 style={{ textAlign: "start" }} className="text_heading">
              Information
            </h1>
            <p
              style={{
                fontSize: "15px",
                textTransform: "uppercase",
                color: "#58468C",
                letterSpacing: ".125em",
              }}
              className="p_text"
            >
              <strong>Category: </strong>
              {portfolioItem.Information.Category}
            </p>
            <p
              style={{
                fontSize: "15px",
                textTransform: "uppercase",
                color: "#58468C",
                letterSpacing: ".125em",
              }}
              className="p_text"
            >
              <strong>Date: </strong>
              {new Date(portfolioItem.Information.date).toLocaleDateString()}
            </p>
            <p
              style={{
                fontSize: "15px",
                textTransform: "uppercase",
                color: "#58468C",
                letterSpacing: ".125em",
              }}
              className="p_text"
            >
              <strong>Tags: </strong>
              {portfolioItem.Information.tags}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    height: "auto",
    flexWrap: "wrap",
  },
  slider: {
    position: "relative",
    width: "100%",
    margin: "auto",
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "15px",
  },
  sliderControls: {
    position: "absolute",
    top: "50%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    transform: "translateY(-50%)",
  },
  navButton: {
    backgroundColor: "#ffffff",
    borderRadius: "50%",
  },
  infoContainer: {
    position: "relative",
    width: "100%",
    margin: "auto",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
  },
  description_Information: {
    maxWidth: "440px",
  },
};

export default SinglePortfolio;
