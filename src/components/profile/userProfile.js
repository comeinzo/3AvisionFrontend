



import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  IconButton,
  Tooltip,
  Divider,
  useTheme,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useSelector } from "react-redux";
const UserProfile = ({ appBarColor = "#1976d2", username = "User",contrastColor  }) => {
  const [openModal, setOpenModal] = useState(false);
  const [logo, setLogo] = useState("");
  const theme = useTheme();
    const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const company_name = sessionStorage.getItem("company_name") || "Company Name";

  useEffect(() => {
    const updateLogo = () => {
      const storedLogo = sessionStorage.getItem("logo");
      setLogo(storedLogo);
    };

    updateLogo();
    window.addEventListener("logo-updated", updateLogo);

    return () => window.removeEventListener("logo-updated", updateLogo);
  }, []);

  const handleProfileClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box display="flex" alignItems="center" gap={1.5} padding={2}>
      {/* Avatar with Tooltip */}
      <Tooltip title="View Profile" arrow>
        <IconButton
          onClick={handleProfileClick}
          sx={{
            p: 0,
             color: contrastColor,
            borderRadius: "50%",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Avatar
            src={logo || ""}
            alt="Logo"
            sx={{
              width: 36,
              height: 36,
              border: `2px solid ${theme.palette.common.white}`,
              bgcolor: "background.paper",
              boxShadow: 3,
              fontSize: "0.9rem",
              fontFamily:fontStyle,
              fontWeight: 600,
              color: "text.primary",
            }}
            imgProps={{
              style: { objectFit: "contain" },
            }}
          >
            {!logo && <PhotoCameraIcon fontSize="small" />}
          </Avatar>
        </IconButton>
      </Tooltip>

      {/* Greeting */}
       <Typography variant="subtitle1" sx={{ color: contrastColor, fontWeight: 500,fontFamily:fontStyle }}>
        Hello, {username}
      </Typography>

      {/* Modal Dialog */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: 600, fontSize: "1.2rem" }}>
          {company_name}
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            textAlign: "center",
            py: 4,
          }}
        >
          <Avatar
            src={logo || ""}
            alt="Company Logo"
            sx={{
              width: 130,
              height: 130,
              mx: "auto",
              border: "3px solid #eee",
              bgcolor: "white",
              boxShadow: 4,
            }}
            imgProps={{
              style: { objectFit: "contain" },
            }}
          >
            {!logo && <PhotoCameraIcon fontSize="large" />}
          </Avatar>

          <Typography variant="h6" sx={{ mt: 3 ,fontFamily:fontStyle }}>
            {username}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" onClick={handleCloseModal} color="primary" sx={{ px: 5,fontFamily:fontStyle  }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
