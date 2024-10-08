import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { slidesData } from "../../data/homeData";

const LandingPage = () => {
  const slides = slidesData;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const navigate = useNavigate();

  const handleNavigate = (page) => {
    if (page === "about") {
      navigate("/about");
    } else {
      navigate("/contact");
    }
  };

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${slides[currentSlide].image})`,
      }}
    >
      <Container>
        <div className="content">
          <h1>{slides[currentSlide].heading}</h1>
          <p>{slides[currentSlide].subtext}</p>
          <div className="buttons">
            <button
              onClick={() => handleNavigate("about")}
              className="error-button"
            >
              Read More
            </button>
            <button
              onClick={() => handleNavigate("contact")}
              style={{ marginLeft: "2rem" }}
              className="success-button"
            >
              Get Started
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
