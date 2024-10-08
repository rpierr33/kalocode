import React, { useEffect, useRef, useState } from "react";
import {
  Paper,
  Grid,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  Container,
  Box,
  Badge,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuid } from "uuid";

const ChatSection = styled(Paper)({
  width: "100%",
  height: "100%",
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f4f4f8",
  borderRadius: "10px",
});

const Sidebar = styled(Grid)({
  borderRight: "1px solid #e0e0e0",
  backgroundColor: "#f9f9fb",
  padding: "10px",
  height: "95vh",
  overflowY: "auto",
  position: "sticky",
  top: 0,
});

const InputArea = styled(Grid)({
  padding: "15px 20px",
  borderTop: "1px solid #ddd",
  position: "sticky",
  bottom: 0,
  backgroundColor: "#fff",
});

const CustomFab = styled(Fab)({
  backgroundColor: "#673ab7",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#673ab7",
  },
});

// This component is for agents to see and respond to customer messages
const Messages = () => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Generate a unique agent ID
  const agentId = localStorage.getItem("agentId") || uuid();
  localStorage.setItem("agentId", agentId);

  useEffect(() => {
    // Listen for changes in the 'messages' collection
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("time", "asc")),
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);

        // If selectedChat exists, update it from fetchedMessages
        if (selectedChat) {
          const updatedSelectedChat = fetchedMessages.find(
            (chat) => chat.id === selectedChat.id
          );
          if (updatedSelectedChat) {
            setSelectedChat(updatedSelectedChat);
          }
        }

        // Scroll to the latest message
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }
    );

    return () => unsubscribe();
  }, [selectedChat]);

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);

    // Mark all messages in the selected chat as read
    const updatedConversation = chat.conversation.map((msg) => {
      if (msg.from !== "Agent" && msg.unread) {
        return { ...msg, unread: false };
      }
      return msg;
    });

    // Update Firestore to mark the messages as read
    await updateDoc(doc(db, "messages", chat.id), {
      conversation: updatedConversation,
    });
  };

  const handleSendMessage = async (messageText) => {
    if (messageText.trim() && selectedChat) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Update existing chat with the agent's message
      await updateDoc(doc(db, "messages", selectedChat.id), {
        conversation: [
          ...selectedChat.conversation,
          {
            from: "Agent",
            text: messageText,
            time: currentTime,
            unread: true,
          },
        ],
      });
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Chat
          </Typography>
        </Grid>
      </Grid>

      <Grid container component={ChatSection}>
        {/* Sidebar */}
        <Sidebar item xs={3}>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            {messages.map((chat) => (
              <ListItem
                button
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                selected={selectedChat?.id === chat.id}
              >
                <ListItemIcon>
                  <Avatar style={{ background: "#000" }}>
                    {chat.conversation?.[0]?.from?.[0] || ""}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  sx={{ cursor: "pointer" }}
                  primary={
                    <React.Fragment>
                      <Typography fontSize={"12px"} variant="p" color="#000">
                        {chat.conversation?.[0]?.from || ""}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography fontSize={"12px"} variant="h6" color="#000">
                          {chat.conversation?.length > 0
                            ? `Last message: ${
                                chat.conversation[chat.conversation.length - 1]
                                  .time
                              }`
                            : "No messages yet"}
                        </Typography>
                        <Badge
                          badgeContent={
                            chat.conversation?.filter(
                              (msg) => msg.from !== "Agent" && msg.unread
                            ).length
                          }
                          color="error"
                          sx={{
                            "& .MuiBadge-badge": {
                              backgroundColor: "#ff6347",
                              color: "#fff",
                            },
                          }}
                        >
                          {/* Empty div for the badge to attach to */}
                          <div style={{ width: "1px", height: "1px" }} />
                        </Badge>
                      </Box>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Sidebar>

        {/* Chat Area */}
        <Grid item xs={9} container direction="column">
          {/* Chat Body */}
          <Box
            ref={chatContainerRef}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflowY: "auto", // Make chat body scrollable
              backgroundColor: "#f5f5f5",
              maxHeight: "calc(100% - 100px)",
            }}
          >
            {selectedChat &&
              selectedChat.conversation?.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.from === "Agent" ? "flex-end" : "flex-start",
                    alignItems: "flex-start",
                    marginBottom: 1,
                  }}
                >
                  {msg.from !== "Agent" && (
                    <Avatar sx={{ marginRight: 1 }}>{msg.from[0]}</Avatar>
                  )}
                  <Box
                    sx={{
                      backgroundColor:
                        msg.from === "Agent" ? "#6929CA" : "#EAF0F6",
                      color: msg.from === "Agent" ? "#fff" : "#000",
                      padding: "8px 12px",
                      borderRadius:
                        msg.from === "Agent"
                          ? "12px 12px 0px 12px"
                          : "12px 12px 12px 0px",
                      maxWidth: "70%",
                    }}
                  >
                    <Typography variant="body1">{msg.text}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        textAlign: msg.from === "Agent" ? "right" : "left",
                        color: msg.from === "Agent" ? "white" : "#666",
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

          {/* Input area */}
          {selectedChat && (
            <InputArea container alignItems="center">
              <Grid item xs={11}>
                <TextField
                  autocomplete="off"
                  id="message-input"
                  label="Type your message..."
                  fullWidth
                  variant="outlined"
                  style={{ borderRadius: "20px" }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </Grid>
              <Grid item xs={1} align="right">
                <CustomFab
                  size="medium"
                  aria-label="send"
                  onClick={() => {
                    const input = document.getElementById("message-input");
                    handleSendMessage(input.value);
                    input.value = "";
                  }}
                >
                  <SendIcon />
                </CustomFab>
              </Grid>
            </InputArea>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Messages;
