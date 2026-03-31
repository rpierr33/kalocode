import React from "react";
import { CardMedia, CardContent, Grid, Box } from "@mui/material";
import { servicesData } from "../../data/homeData";

const Service = () => {
  const services = servicesData.services;
  const LeftFeatures = servicesData.LeftFeatures;
  const RightFeatures = servicesData.RightFeatures;
  return (
    <div data-aos="fade-up" className="service">
      <h1 className="text_heading">{servicesData.title}</h1>
      <Grid container spacing={3} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardMedia
              sx={{ borderRadius: "1rem" }}
              component="img"
              height="400"
              image={service.image}
              alt={service.title}
            />
            <CardContent>
              <h6 className="h6_text">{service.title}</h6>
              <p className="p_text">{service.description}</p>
            </CardContent>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          mt: "5rem",
          "@media (max-width: 768px)": {
            pl: 3,
          },
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid container spacing={2} alignItems="center">
            {/* Left features */}
            <Grid item xs={12} md={4}>
              {LeftFeatures.map((feature, index) => (
                <div key={index} className="feature-container">
                  <div className="feature-textTop">
                    <h6 style={{ textAlign: "right" }} className="h6_text">
                      {feature.title}
                    </h6>
                    <p style={{ textAlign: "right" }} className="p_text">
                      {feature.description}
                    </p>
                  </div>
                  <img src={feature.icon} alt={feature.title} />
                </div>
              ))}
            </Grid>

            {/* Center image */}
            <Grid item xs={12} md={4} className="center-image">
              <img
                src={servicesData.centerImage.image}
                alt="Phone showcase"
                className="main-image"
              />
            </Grid>

            {/* Right features */}
            <Grid item xs={12} md={4}>
              {RightFeatures.map((feature, index) => (
                <div key={index} className="feature-container">
                  <img src={feature.icon} alt={feature.title} />
                  <div className="feature-textBottom">
                    <h6 className="h6_text">{feature.title}</h6>
                    <p className="p_text">{feature.description}</p>
                  </div>
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Service;
