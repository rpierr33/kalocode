import React from "react";
import "./About.css";

const LandingPage = ({ data }) => {
  return (
    <div className="landingPage" data-aos="fade-up">
      <div className="landingPage_text">
        <h1>{data.heading}</h1>
        <p className="p_text">{data.description}</p>
      </div>
      <img style={{ maxWidth: "100%" }} src={data.imageSrc} alt="aboutus" />
    </div>
  );
};

export default LandingPage;
