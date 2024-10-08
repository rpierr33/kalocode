import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";
import { videoData } from "../../data/homeData";

const Video = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div data-aos="fade-up" className="video">
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "70vh",
          maxHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={videoData.image}
          alt="Video Thumbnail"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <IconButton
          onClick={handleOpen}
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            zIndex: 1,
            fontSize: {
              xs: "40px",
              sm: "60px",
              md: "80px",
            },
          }}
        >
          <PlayCircleOutlineIcon
            sx={{
              fontSize: {
                xs: "40px",
                sm: "60px",
                md: "80px",
              },
            }}
          />
        </IconButton>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            height: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 0,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1,
              color: "white",
            }}
          >
            <CloseIcon sx={{ fontSize: "30px" }} />
          </IconButton>
          <ReactPlayer
            url={videoData.video}
            controls
            playing={open}
            width="100%"
            height="100%"
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Video;
