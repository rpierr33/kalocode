import React from "react";
import TrusteesCarousel from "../components/landingPage/Trustees";
import LandingPage from "../components/AboutUs/LandingPage";
import AboutCard from "../components/AboutUs/Card";
import { aboutPageData } from "../data/aboutPageData";

const About = () => {
  return (
    <div className="about">
      <LandingPage data={aboutPageData.landingPage} />
      <AboutCard data={aboutPageData} />
      <TrusteesCarousel />
    </div>
  );
};

export default About;
