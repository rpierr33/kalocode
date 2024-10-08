import React from "react";
import Messages from "../components/admin/Messages";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Admin = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <div className="admin">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <button
              style={{
                height: "100%",
                background: "#6A1B9A",
                color: "#ffff",
                border: "none",
                padding: "10px 15px",
                fontSize: "16px",
                cursor: "pointer",
              }}
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Toolbar>
        </AppBar>
      </Box>
      <Messages />
    </div>
  );
};

export default Admin;
