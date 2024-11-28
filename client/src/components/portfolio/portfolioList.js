import React, { useState } from "react";
import "./Portfolio.css";
import { portfolio } from "../../data/portfolio";
import { useNavigate } from "react-router-dom";

const PortfolioList = () => {
  const [visiblePortfolios, setVisiblePortfolios] = useState(9);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to load more portfolios
  const loadMorePortfolios = () => {
    setLoading(true);
    setTimeout(() => {
      setVisiblePortfolios((prevVisible) => prevVisible + 10);
      setLoading(false);
    }, 1000);
  };
  const handleNavigate = (id) => {
    navigate(`/single-portfolio/${id}`);
  };
  return (
    <div data-aos="fade-up">
      <div className="portfolio-container">
        {portfolio.slice(0, visiblePortfolios).map((item) => (
          <div
            onClick={() => handleNavigate(item.id)}
            className="portfolio-card"
            key={item.id}
          >
            <div className="portfolio-image">
              <img src={item.coverImage} alt={item.title} />
            </div>

            <div className="portfolio-info">
              <p>CATEGORY. {item.Information.Category}</p>
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {/* Only show the Load More button if there are more portfolios to load */}
      {visiblePortfolios < portfolio.length && !loading && (
        <button className="load-more" onClick={loadMorePortfolios}>
          Load More
        </button>
      )}
    </div>
  );
};

export default PortfolioList;
