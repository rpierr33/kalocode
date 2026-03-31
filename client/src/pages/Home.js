import React from "react";
import LandingPage from "../components/landingPage/LandingPage";
import Service from "../components/landingPage/Service";
import Video from "../components/landingPage/Video";
import Card from "../components/landingPage/Card";
import Reviews from "../components/landingPage/Reviews";

const Home = () => {
  return (
    <div>
      <LandingPage />
      <Service />
      <Video />
      <Card />
      <Reviews />
    </div>
  );
};

export default Home;
