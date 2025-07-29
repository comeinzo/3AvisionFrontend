

import React from "react";

import {  Grid} from "@mui/material";
import LoadExcelFile from '../../components/load/LoadExcelFile';
import HomePage from '../HomePage';


function LoadDataPage() {
  return (
    <div className="App">
        <HomePage/>
          <Grid item xs={12} md={10}>
            <LoadExcelFile />
          </Grid>
    </div>
  );
}

export default LoadDataPage;



