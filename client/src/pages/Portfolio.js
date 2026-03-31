import React from "react";
import PortfolioList from "../components/portfolio/portfolioList";

const Portfolio = () => {
  return (
    <div className="portfolio">
      <div style={styles.imageContainer}>
        <img
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          src="/assets/portfolio-title-img.jpg"
          alt="portfolio"
        />

        <h1 style={styles.heading} className="portfolio_bannerText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
          accusamus!
        </h1>
      </div>
      <PortfolioList />
    </div>
  );
};

const styles = {
  imageContainer: {
    position: "relative",
    textAlign: "center",
  },
};

export default Portfolio;
