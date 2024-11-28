import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import TrusteesCarousel from "./Trustees";
import { reviewsData } from "../../data/homeData";

const Reviews = () => {
  const Team = reviewsData.teams;

  const [currentReview, setCurrentReview] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setSliding(true);
    setTimeout(() => {
      setCurrentReview((prevReview) =>
        prevReview === Team.length - 1 ? 0 : prevReview + 1
      );
      setSliding(false);
    }, 500);
  };

  // Automatic slide change for reviews every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentReview]);

  const handlePrev = () => {
    setSliding(true);
    setTimeout(() => {
      setCurrentReview((prevReview) =>
        prevReview === 0 ? Team.length - 1 : prevReview - 1
      );
      setSliding(false);
    }, 500);
  };

  return (
    <div data-aos="fade-up">
      <div
        className="reviews"
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image with opacity */}
        <div
          style={{
            backgroundImage: reviewsData.reviewsBackground.image,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.7,
            zIndex: -1,
          }}
        ></div>

        {/* Left Navigation Button */}
        <IconButton
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: "20px",
            color: "white",
          }}
        >
          <ArrowBackIos fontSize="large" />
        </IconButton>

        {/* Review Content Container */}
        <div
          className={`review-container ${sliding ? "sliding" : ""}`}
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${currentReview * 100}%)`,
            width: "300%",
          }}
        >
          {Team.map((review, index) => (
            <div
              key={index}
              className="review"
              style={{
                flex: "0 0 100%",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: isSmallScreen && "25px",
                }}
                className="text_heading"
              >
                {reviewsData.heading}
              </h1>
              <p
                style={{
                  fontSize: isSmallScreen ? "16px" : "25px",
                  lineHeight: isSmallScreen ? "16px" : "33px",
                  color: "white",
                  textAlign: "center",
                  maxWidth: "70%",
                  margin: "auto",
                }}
                className="p_text"
              >
                {review.description}
              </p>
              <img
                src={review.profile}
                alt={review.name}
                style={{
                  borderRadius: "50%",
                  width: isSmallScreen ? "100px" : "150px",
                  height: isSmallScreen ? "100px" : "150px",
                  margin: "20px 0",
                }}
              />
              <h6 className="h6_text" style={{ color: "white" }}>
                {review.name}
              </h6>
              <p className="p_text" style={{ color: "white" }}>
                {review.role}
              </p>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <IconButton
          onClick={handleNext}
          style={{
            position: "absolute",
            right: "20px",
            color: "white",
          }}
        >
          <ArrowForwardIos fontSize="large" />
        </IconButton>
      </div>

      {/* Import and display the TrusteesCarousel component */}
      <TrusteesCarousel />
    </div>
  );
};

export default Reviews;
