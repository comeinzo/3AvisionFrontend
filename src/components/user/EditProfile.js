

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { uploadOrganizationLogo } from "../../utils/api";
const EditProfile = () => {
    const navigate = useNavigate();

  const [logoPreview, setLogoPreview] = useState(sessionStorage.getItem("logo") || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const organizationName = sessionStorage.getItem("user_name"); // ensure this is correct

  const handleLogoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setOpenConfirm(true);
    }
  };


const handleConfirmUpload = async () => {
  console.log("Selected File:", selectedFile);
  console.log("Organization Name:", organizationName);

  if (!selectedFile || !organizationName) {
    console.warn("Missing file or organization name.");
    return;
  }

  try {
    setUploading(true);
    const res = await uploadOrganizationLogo(selectedFile, organizationName);

    if (res.logo_url) {
      const newLogoUrl = res.logo_url;
      sessionStorage.setItem("logo", newLogoUrl);

      // Notify components
      window.dispatchEvent(new Event("logo-updated"));

      setLogoPreview(newLogoUrl);
      setOpenConfirm(false);

      // ✅ Navigate to /user_input
      navigate("/user_input");
      window.location.reload(); // ⚠️ Only if necessary
    }
  } catch (err) {
    console.error("Upload failed:", err);
  } finally {
    setUploading(false);
  }
};

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
       <Card sx={{ padding: 4, boxShadow: 6, borderRadius: 2, textAlign: 'center' }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Edit Company Profile
          </Typography>

          <Avatar
            src={logoPreview}
            alt="Company Logo"
            sx={{ width: 120, height: 120, border: "2px solid #ccc", bgcolor: "transparent" }}
            imgProps={{ style: { objectFit: "contain" } }}
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            disabled={uploading}
            sx={{ mt: 2 }}
          >
            {uploading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Change Logo"
            )}
            <input type="file" hidden accept="image/*" onChange={handleLogoSelect} />
          </Button>

          <Typography variant="body2" color="text.secondary" align="center">
            Upload a new logo to replace the current company logo.
          </Typography>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Replace Logo?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to replace the existing logo? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log("CONFIRM BUTTON CLICKED");
              handleConfirmUpload();
            }}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditProfile;
