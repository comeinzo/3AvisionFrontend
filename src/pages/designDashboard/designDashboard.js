// import React,{useEffect} from "react";

// import {  Grid} from "@mui/material";
// import DesignDashboard from '../../components/viewChart/displayChart';
// import HomePage from '../HomePage';
// import {useNavigate} from "react-router";

// function LoadDataPage() {
//   const navigate = useNavigate(); // Initialize useNavigate
     
//       //  useEffect(() => {
//       //      const disableBackButton = () => {
//       //          navigate("/"); // Redirect to the login page
//       //      };
     
//       //      window.history.pushState(null, "", window.location.href);
//       //      window.addEventListener("popstate", disableBackButton);
     
//       //      return () => {
//       //          window.removeEventListener("popstate", disableBackButton);
//       //      };
//       //  }, [navigate]); // Add navigate to the dependency array
//       useEffect(() => {
//         const handlePopState = () => {
//           navigate('/Design-page');
//         };
      
//         window.addEventListener('popstate', handlePopState);
      
//         // Cleanup
//         return () => {
//           window.removeEventListener('popstate', handlePopState);
//         };
//       }, [navigate]);
//   return (
//     <div className="App">
//         <HomePage/>
//           <Grid item xs={12} md={10}>
//             <DesignDashboard />
//           </Grid>
//     </div>
//   );
// }

// export default LoadDataPage;


import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import DesignDashboard from '../../components/viewChart/displayChart';
import HomePage from '../HomePage';
import { useNavigate } from "react-router";

function LoadDataPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Push a dummy state so the back button triggers our handler
    window.history.pushState({ fromLoadData: true }, '');

    const handlePopState = (event) => {
      navigate('/Design-page', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
    <div className="App">
      <HomePage />
      <Grid item xs={12} md={10}>
        <DesignDashboard />
      </Grid>
    </div>
  );
}

export default LoadDataPage;
