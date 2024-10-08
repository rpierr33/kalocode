import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Dialog,
  IconButton,
  TextField,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MessageIcon from "@mui/icons-material/Message";
import { v4 as uuid } from "uuid";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [audioInterval, setAudioInterval] = useState(null);

  // Ref for the chat container to control scrolling
  const chatContainerRef = useRef(null);
  const notificationAudio = useRef(null); // For notification audio

  // Generate or retrieve a unique customer ID
  const customerId = localStorage.getItem("customerId") || uuid();
  localStorage.setItem("customerId", customerId);

  // Fetch conversation from Firestore based on customer ID
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("chatId", "==", customerId),
      orderBy("time", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setConversation(fetchedMessages);

      // Calculate unread messages
      const unreadMessages = fetchedMessages[0]?.conversation.filter(
        (msg) => msg.unread && msg.from !== "Customer"
      ).length;

      setUnreadCount(unreadMessages || 0);
    });

    return () => unsubscribe();
  }, [customerId]);

  // Scroll to the latest message when conversation updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  // Handle opening the chat dialog
  const handleOpen = async () => {
    setOpen(true);

    // Mark unread messages as read
    if (conversation.length > 0) {
      const updatedConversation = conversation[0].conversation.map((msg) =>
        msg.unread ? { ...msg, unread: false } : msg
      );

      await updateDoc(doc(db, "messages", conversation[0]?.id), {
        conversation: updatedConversation,
      });

      setUnreadCount(0); // Reset unread count
    }

    clearInterval(audioInterval); // Stop audio alerts when the dialog is opened
    setAudioPlayed(true); // Mark the audio as played
  };

  const handleClose = () => {
    setOpen(false);
    startAudioNotification(); // Restart audio notifications if closed
    setAudioPlayed(true); // Mark the audio as played
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (message.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (conversation.length > 0) {
        // Update existing chat with the customer's message
        await updateDoc(doc(db, "messages", conversation[0]?.id), {
          conversation: [
            ...conversation[0]?.conversation,
            {
              from: "Customer",
              text: message,
              time: currentTime,
              unread: true,
            },
          ],
        });
      } else {
        // Create new message document
        await addDoc(collection(db, "messages"), {
          chatId: customerId,
          conversation: [
            {
              from: "Customer",
              text: message,
              time: currentTime,
              unread: true,
            },
          ],
          time: new Date().toISOString(),
        });
      }

      setMessage("");
    }
  };

  // Start audio notification every 1 minute for up to 1 hour
  const startAudioNotification = () => {
    let minuteCounter = 0;

    const interval = setInterval(() => {
      if (!audioPlayed && !open && notificationAudio.current) {
        notificationAudio.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }

      minuteCounter += 1;

      if (minuteCounter >= 60) {
        clearInterval(interval);
      }
    }, 60000);

    setAudioInterval(interval);
  };

  // useEffect(() => {
  //   console.log(audioPlayed);

  //   if (!audioPlayed) {
  //     startAudioNotification(); // Start the audio alert when the component mounts
  //   }

  //   return () => {
  //     clearInterval(audioInterval); // Clear the interval on unmount
  //   };
  // }, [audioPlayed, open]);

  return (
    <>
      <audio
        ref={notificationAudio}
        src="/assets/notification-audio.mp3"
      ></audio>

      {/* Floating Chat Icon Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: 26,
          right: 25,
          zIndex: 9999,
          minWidth: "100px",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: "#6a1b9a",
            color: "#fff",
            "&:hover": { backgroundColor: "#8e24aa" },
          }}
          onClick={open ? handleClose : handleOpen}
        >
          <Badge badgeContent={unreadCount} color="error">
            {open ? (
              <CloseIcon style={{ fontSize: "3rem" }} />
            ) : (
              <MessageIcon style={{ fontSize: "3rem" }} />
            )}
          </Badge>
        </IconButton>
      </Box>

      {/* Chat Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            position: "fixed",
            bottom: 80,
            right: 20,
            minWidth: "400px",
            height: "80vh",
          },
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
            backgroundColor: "#6a1b9a",
            color: "#fff",
          }}
        >
          <Typography variant="h6">CometChat</Typography>
          <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Chat Body */}
        <Box
          ref={chatContainerRef}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
            maxHeight: "calc(100% - 100px)",
          }}
        >
          {/* Check if conversation array exists and map over it */}
          {conversation[0]?.conversation?.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  msg.from === "Customer" ? "flex-end" : "flex-start",
                alignItems: "flex-start",
                marginBottom: 1,
              }}
            >
              {msg.from !== "Customer" && (
                <Avatar
                  sx={{
                    bgcolor: "#000",
                    marginRight: 1,
                    width: 36,
                    height: 36,
                  }}
                >
                  C
                </Avatar>
              )}
              <Box
                sx={{
                  backgroundColor:
                    msg.from === "Customer" ? "#6929CA" : "#EAF0F6",
                  color: msg.from === "Customer" ? "#fff" : "#000",
                  padding: "8px 12px",
                  borderRadius:
                    msg.from === "Customer"
                      ? "12px 12px 0px 12px"
                      : "12px 12px 12px 0px",
                  maxWidth: "70%",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Arial",
                    fontSize: 14,
                  }}
                >
                  {msg.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: msg.from === "Customer" ? "right" : "left",
                    color: msg.from === "Customer" ? "white" : "#666",
                    marginTop: 1,
                    fontSize: 12,
                  }}
                >
                  {msg.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Chat Input */}
        <Box
          sx={{
            display: "flex",
            padding: 1,
            borderTop: "1px solid #ddd",
            backgroundColor: "#fff",
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ marginRight: 1 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <IconButton
            onClick={handleSendMessage}
            sx={{
              backgroundColor: "#6a1b9a",
              color: "#fff",
              "&:hover": { backgroundColor: "#8e24aa" },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Dialog>
    </>
  );
};

export default ChatWidget;
