import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

export default function NotificationBar() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const [notifications, setNotifications] = useState([
    // {
    //   id: 1,
    //   title: "Alert",
    //   message: "This is an alert message",
    //   icon: <WarningOutlinedIcon sx={{ color: "red" }} />,
    //   backgroundColor: "#F1CBD2",
    // },
    // {
    //   id: 2,
    //   title: "Warning",
    //   message: "This is a warning message",
    //   icon: <ErrorIcon sx={{ color: "#E28040" }} />,
    //   backgroundColor: "#F7DFB6",
    // },
    // {
    //   id: 3,
    //   title: "Info",
    //   message: "This is an info message",
    //   icon: <CheckCircleIcon sx={{ color: "green" }} />,
    //   backgroundColor: "#D3F3E5",
    // },
    // {
    //   id: 4,
    //   title: "Info",
    //   message: "This is an info message",
    //   icon: <AddCircleIcon sx={{ color: "#3C61F2" }} />,
    //   backgroundColor: "#C5D6FB",
    // },
  ]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/notifications/all/"
        );
        const filteredNotif = response.data.filter(
          (notif) => notif.titre != "Status Changed"
        );
        setNotifications(filteredNotif);
      } catch (error) {
        setError("An error occurred while fetching notifications data.");
        console.error("Error fetching notifications data:", error);
      }
    }
    fetchNotifications();
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = async (NotificationID) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/notifications/${NotificationID}/`
      );
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== NotificationID
        )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div>
      <List
        sx={{
          width: 350,
          bgcolor: "background.paper",
          borderRadius: "50px",
          "&:hover": {
            bgcolor: "#FAFBFF",
            cursor: "pointer",
          },
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem onClick={handleClick}>
          <div
            style={{
              backgroundColor: "red",
              borderRadius: "50%",
              color: "white",
              minWidth: "17px",
              height: "17px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              marginRight: "5px",
              visibility: notifications.length === 0 ? "hidden" : null,
            }}
          >
            {notifications.length}
          </div>
          <ListItemIcon>
            <NotificationsActiveIcon
              sx={{ color: "#2185D5", height: "20px", width: "20px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Notifications"
            sx={{ color: "#2185D5", fontSize: "10px" }}
          />

          {open ? (
            <ExpandLess sx={{ color: "#2185D5" }} />
          ) : (
            <ExpandMore sx={{ color: "#2185D5" }} />
          )}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="flex justify-center items-center absolute">
            <List sx={{ position: "relative" }}>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{
                    bgcolor:
                      notification.titre === "New internal order"
                        ? "#C5D6FB"
                        : notification.titre ===
                          "Internal order validation by the responsable"
                        ? "#F7DFB6"
                        : notification.titre ===
                          "Internal order validation by the director"
                        ? "#D3F3E5"
                        : notification.titre === "Inventory status approuvement"
                        ? "#C2F09D"
                        : notification.titre === "Quantity of security"
                        ? "#F1CBD2"
                        : "#C5D6FB",
                    borderRadius: "10px",
                    margin: "5px",
                    width: "341px",
                  }}
                >
                  <ListItemIcon>
                    {notification.titre === "New internal order" ? (
                      <AddCircleIcon sx={{ color: "#3C61F2" }} />
                    ) : notification.titre ===
                      "Internal order validation by the responsable" ? (
                      <ErrorIcon sx={{ color: "#E28040" }} />
                    ) : notification.titre ===
                      "Internal order validation by the director" ? (
                      <CheckCircleIcon sx={{ color: "#66C397" }} />
                    ) : notification.titre ===
                      "Inventory status approuvement" ? (
                      <CheckCircleIcon sx={{ color: "#0B693C" }} />
                    ) : notification.titre === "Quantity of security" ? (
                      <WarningOutlinedIcon sx={{ color: "#CD3546" }} />
                    ) : (
                      <ErrorIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ fontFamily: "Poppins", fontSize: "1.4rem" }}
                    primary={notification.titre}
                    secondary={notification.message}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </div>
        </Collapse>
      </List>
    </div>
  );
}
