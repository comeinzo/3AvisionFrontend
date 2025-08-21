
// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Typography,
//   Box,
//   Alert
// } from "@mui/material";
// import { getAllUsers, shareDashboard } from "../../utils/api";

// const ShareDashboardModal = ({ open, onClose, chartName }) => {
//   const [userList, setUserList] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const company_name = sessionStorage.getItem("company_name");
//   const user_id = sessionStorage.getItem("user_id");

//   useEffect(() => {
//     if (open) fetchUsers();
//   }, [open]);

//   const fetchUsers = async () => {
//     try {
//       const response = await getAllUsers(company_name,user_id);
//       setUserList(response.data || []);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError("Failed to fetch user list.");
//     }
//   };

//   const handleShare = async () => {
//     if (!selectedUser) return;

//     setLoading(true);
//     setError("");

//     try {
//       await shareDashboard({
//         to_username: selectedUser,
//         dashboard_name: chartName,
//         from_user: user_id,
//         company_name
//       });

//       alert("Dashboard shared successfully!");
//       setSelectedUser("");
//       onClose();
//     } catch (err) {
//       console.error("Error sharing dashboard:", err);
//       setError("Failed to share dashboard.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>Share Dashboard</DialogTitle>
//       <DialogContent dividers>
//         <Box display="flex" flexDirection="column" gap={2}>

//           {error && <Alert severity="error">{error}</Alert>}

//           {userList.length === 0 ? (
//             <Typography variant="body2" color="textSecondary">
//               No users available to share with.
//             </Typography>
//           ) : (
//             <FormControl fullWidth>
//               <InputLabel>Select User</InputLabel>
//               <Select
//                 value={selectedUser}
//                 onChange={(e) => setSelectedUser(e.target.value)}
//                 label="Select User"
//               >
//                 {userList.map((user) => (
//                   <MenuItem key={user.employee_id} value={user.employee_id}>
//                     {user.employee_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           )}
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} variant="outlined">
//           Cancel
//         </Button>
//         <Button
//           onClick={handleShare}
//           disabled={!selectedUser || loading}
//           variant="contained"
//         >
//           {loading ? <CircularProgress size={20} color="inherit" /> : "Share"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ShareDashboardModal;

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Typography,
  Box,
  Alert,
  Divider,
} from "@mui/material";
import { getAllUsers, shareDashboard } from "../../utils/api";
import ShareIcon from "@mui/icons-material/Share";
import CancelIcon from "@mui/icons-material/Cancel";
 import CustomAlertDialog from '../DashboardActions/CustomAlertDialog'; 
const ShareDashboardModal = ({ open, onClose, chartName }) => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [error, setError] = useState("");
 const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("info");
  const company_name = sessionStorage.getItem("company_name");
  const user_id = sessionStorage.getItem("user_id");

  useEffect(() => {
    if (open) fetchUsers();
  }, [open]);

  const fetchUsers = async () => {
    setFetchingUsers(true);
    try {
      const response = await getAllUsers(company_name, user_id);
      setUserList(response.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Unable to load users. Please try again later.");
    } finally {
      setFetchingUsers(false);
    }
  };

  const handleShare = async () => {
    if (!selectedUser) return;
    setLoading(true);
    setError("");

    try {
      await shareDashboard({
        to_username: selectedUser,
        dashboard_name: chartName,
        from_user: user_id,
        company_name,
      });

      // alert("✅ Dashboard shared successfully!");
      setDialogTitle("Success");
      setDialogMessage("Dashboard shared successfully!");
      setDialogType("success");
      setDialogOpen(true);
      setSelectedUser("");
      onClose();
    } catch (err) {
      console.error("Error sharing dashboard:", err);
      // setError("Failed to share dashboard. Please try again.");
       setDialogTitle("Error");
      setDialogMessage("Failed to share dashboard. Please try again.");
      setDialogType("error");
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>Share Dashboard</DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Select a user below to share the dashboard:{" "}
          <strong>{Array.isArray(chartName)? chartName[1]:chartName}</strong>
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {fetchingUsers ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <CircularProgress />
          </Box>
        ) : userList.length === 0 ? (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              backgroundColor: "#f8f9fa",
              padding: 2,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            No users available to share with.
          </Typography>
        ) : (
          <FormControl fullWidth>
            <InputLabel>Select User</InputLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              label="Select User"
            >
              {userList.map((user) => (
                <MenuItem key={user.employee_id} value={user.employee_id}>
                  {user.employee_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        <Button
          onClick={handleShare}
          disabled={!selectedUser || loading}
          variant="contained"
          color="primary"
          startIcon={!loading && <ShareIcon />}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Share"}
        </Button>
      </DialogActions>
    </Dialog>
    <CustomAlertDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        title={dialogTitle}
        message={dialogMessage}
        type={dialogType}
      />
      </>
  );
};

export default ShareDashboardModal;
