import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";

function Completion(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f8ff", // Light blue background for a celebratory feel
        textAlign: "center",
        padding: 4,
      }}
    >
      <CelebrationIcon
        sx={{
          fontSize: 80,
          color: "#ff9800", // Vibrant orange for excitement
          marginBottom: 2,
        }}
      />
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          color: "#333", // Neutral text color
        }}
      >
        Thank You! 🎉
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: 4,
          fontSize: "18px",
          color: "#555",
        }}
      >
        Your payment was successful. We appreciate your support!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          padding: "12px 24px",
          borderRadius: 3,
          fontWeight: "bold",
          textTransform: "none",
        }}
        onClick={() => {
          // Replace with the desired navigation logic
          window.location.href = "/";
        }}
      >
        Return to Home
      </Button>
    </Box>
  );
}

export default Completion;
