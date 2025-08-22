// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, TextField, Button, Typography, Card, Snackbar } from "@mui/material";
// import MuiAlert from "@mui/material/Alert";
// import axios from "axios";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function ResetPassword() {
//   const navigate = useNavigate();
//   const query = new URLSearchParams(window.location.search);
//   const token = query.get("token");

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [open, setOpen] = useState(false);

//   const handleReset = async () => {
//     if (newPassword !== confirmPassword) {
//       setErrorMessage("Passwords do not match.");
//       setOpen(true);
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/reset_password", {
//         token,
//         new_password: newPassword
//       });

//       setErrorMessage("✅ Password reset successful! Redirecting...");
//       setOpen(true);

//       setTimeout(() => navigate("/"), 2000); // go back to login
//     } catch (err) {
//       setErrorMessage(err.response?.data?.message || "❌ Reset failed.");
//       setOpen(true);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f5f5f5" }}>
//       <Card sx={{ p: 4, width: "100%", maxWidth: 400 }}>
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           🔑 Reset Password
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
//           Enter your new password below.
//         </Typography>

//         <TextField
//           type="password"
//           label="New Password"
//           fullWidth
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           type="password"
//           label="Confirm Password"
//           fullWidth
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           sx={{ mb: 3 }}
//         />

//         <Button
//           variant="contained"
//           fullWidth
//           onClick={handleReset}
//           sx={{
//             background: "linear-gradient(135deg, #1e3c72, #2a5298)",
//             "&:hover": { background: "linear-gradient(135deg, #162f59, #243b6b)" }
//           }}
//         >
//           Reset Password
//         </Button>
//       </Card>

//       <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
//         <Alert onClose={() => setOpen(false)} severity="info" sx={{ width: "100%" }}>
//           {errorMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Card, Snackbar, InputAdornment, IconButton } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("info");

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setAlertSeverity("error");
      setOpen(true);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reset_password", {
        token,
        new_password: newPassword,
      });

      setErrorMessage("✅ Password reset successful! Redirecting...");
      setAlertSeverity("success");
      setOpen(true);

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "❌ Reset failed.");
      setAlertSeverity("error");
      setOpen(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
        p: 2,
      }}
    >
      <Card
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          🔑 Reset Password
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary", textAlign: "center" }}>
          Enter your new password below.
        </Typography>

        <TextField
          type={showPassword ? "text" : "password"}
          label="New Password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          type={showPassword ? "text" : "password"}
          label="Confirm Password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleReset}
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #1e3c72, #2a5298)",
            "&:hover": { background: "linear-gradient(135deg, #162f59, #243b6b)" },
          }}
        >
          Reset Password
        </Button>
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpen(false)} severity={alertSeverity} sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
