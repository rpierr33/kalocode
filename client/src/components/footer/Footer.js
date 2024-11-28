import React from "react";
import "./Footer.css";
import { Box } from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  LocationOn,
  Email,
  Phone,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getFooterData } from "../../data/footerData";

const Footer = () => {
  const navigate = useNavigate();
  const footerData = getFooterData();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#353353",
          px: 15,
          "@media (max-width: 480px)": {
            px: 3,
          },
        }}
      >
        <div className="footer">
          <section className="footer_one">
            <img
              onClick={handleNavigate}
              style={{ cursor: "pointer" }}
              src={footerData.companyInfo.logoUrl}
              alt="logo"
            />
            <p style={{ color: "white" }} className="p_text">
              {footerData.companyInfo.description}
            </p>
            <div className="social_icons">
              {footerData.companyInfo.socialLinks.map((social, index) => (
                <Box
                  key={index}
                  className="social_icon"
                  sx={{
                    bgcolor: "white",
                    borderRadius: "50%",
                    p: 1,
                    mr: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(social.link, "_blank")}
                >
                  {social.icon === "Twitter" && (
                    <Twitter sx={{ color: social.color }} />
                  )}
                  {social.icon === "Facebook" && (
                    <Facebook sx={{ color: social.color }} />
                  )}
                  {social.icon === "Instagram" && (
                    <Instagram sx={{ color: social.color }} />
                  )}
                </Box>
              ))}
            </div>
          </section>

          <section className="footer_two">
            <h6 style={{ color: "white" }} className="h6_text">
              Contact Info
            </h6>
            <p
              style={{ color: "white", display: "flex", alignItems: "center" }}
              className="p_text"
            >
              <LocationOn sx={{ color: "white", mr: 1 }} />
              <a
                href={footerData.contactInfo.addressLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", textDecoration: "none" }}
              >
                {footerData.contactInfo.addressLine1}
              </a>
            </p>
            <p
              style={{ color: "white", display: "flex", alignItems: "center" }}
              className="p_text"
            >
              <LocationOn sx={{ color: "white", mr: 1 }} />
              <a
                href={footerData.contactInfo.addressLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", textDecoration: "none" }}
              >
                {footerData.contactInfo.addressLine2}
              </a>
            </p>
            <p
              style={{ color: "white", display: "flex", alignItems: "center" }}
              className="p_text"
            >
              <Email sx={{ color: "white", mr: 1 }} />
              <a
                href={footerData.contactInfo.emailLink}
                style={{ color: "white", textDecoration: "none" }}
              >
                {footerData.contactInfo.email}
              </a>
            </p>
            <p
              style={{ color: "white", display: "flex", alignItems: "center" }}
              className="p_text"
            >
              <Phone sx={{ color: "white", mr: 1 }} />
              <a
                href={footerData.contactInfo.phoneLink}
                style={{ color: "white", textDecoration: "none" }}
              >
                {footerData.contactInfo.phone}
              </a>
            </p>
          </section>

          <section className="footer_three">
            <h6 style={{ color: "white" }} className="h6_text">
              Support & Downloads
            </h6>
            <p style={{ color: "white" }} className="p_text">
              {footerData.supportDownloads.description}
            </p>
            <img
              src={footerData.supportDownloads.appleStoreImage}
              alt="apple store"
            />
            <img
              src={footerData.supportDownloads.googlePlayImage}
              alt="google play store"
            />
          </section>
        </div>
      </Box>

      <Box sx={{ bgcolor: "#302e4b" }}>
        <div className="bottom_footer">
          <p style={{ color: "white" }}>{footerData.bottomText}</p>
        </div>
      </Box>
    </Box>
  );
};

export default Footer;
