import React, { useEffect, useState } from "react";
import {
  Link,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import Payment from "../../pages/Payment";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Check if the current path matches the link path
  const isActive = (path) => location.pathname === path;

  return (
    <div className="header">
      <img
        onClick={handleNavigate}
        style={{ color: "red", cursor: "pointer" }}
        src="/assets/logo_black.png"
        alt="logo"
      />

      <nav className="desktop-nav">
        <li>
          <Payment />
        </li>
        <li>
          <Link
            href="/"
            color="inherit"
            underline="none"
            className={isActive("/") ? "active-link" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            color="inherit"
            underline="none"
            className={isActive("/about") ? "active-link" : ""}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/portfolio"
            color="inherit"
            underline="none"
            className={isActive("/portfolio") ? "active-link" : ""}
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            href="/pricing"
            color="inherit"
            underline="none"
            className={isActive("/pricing") ? "active-link" : ""}
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            color="inherit"
            underline="none"
            className={isActive("/contact") ? "active-link" : ""}
          >
            Contact
          </Link>
        </li>
      </nav>

      <IconButton
        className="mobile-menu-icon"
        edge="start"
        color="inherit"
        sx={{
          display: isSmallScreen ? "block" : "none",
        }}
        aria-label="menu"
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className="mobile-nav"
        PaperProps={{
          style: {
            width: "100%",
            top: 0,
            left: 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={handleMenuClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>

        <MenuItem onClick={handleMenuClose}>
          <Link
            href="/"
            color="inherit"
            underline="none"
            className={isActive("/") ? "active-link" : ""}
            fullWidth
          >
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            href="/about"
            color="inherit"
            underline="none"
            className={isActive("/about") ? "active-link" : ""}
            fullWidth
          >
            About
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            href="/portfolio"
            color="inherit"
            underline="none"
            className={isActive("/portfolio") ? "active-link" : ""}
            fullWidth
          >
            Portfolio
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            href="/pricing"
            color="inherit"
            underline="none"
            className={isActive("/pricing") ? "active-link" : ""}
            fullWidth
          >
            Pricing
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            href="/contact"
            color="inherit"
            underline="none"
            className={isActive("/contact") ? "active-link" : ""}
            fullWidth
          >
            Contact
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
