import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { optimizeData } from '../components/dashbord-Elements/DataOptimizationModal';

export  const API_URL='http://localhost:5000'

export const uploadExcelFile = async (user_id,file, primaryKeyColumnName,company_database,selectedSheet) => {
  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('file', file);
  formData.append('primaryKeyColumnName', primaryKeyColumnName);
  formData.append('company_database', company_database);
  formData.append('selectedSheets', JSON.stringify(selectedSheet)); 

  
  const response = await axios.post(`${API_URL}/uploadexcel`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const fetchHierarchialDrilldownDataAPI = async ({
  clickedCategory,
  xAxis,
  yAxis,
  selectedTable,
  aggregate,
  databaseName,
  currentLevel,
  selectedUser
}) => {
  try {
    const response = await axios.post(`${API_URL}/Hierarchial-backend-endpoint`, {
      category: clickedCategory,
      xAxis: xAxis,
      yAxis: yAxis,
      tableName: selectedTable,
      aggregation: aggregate,
      databaseName: databaseName,
      currentLevel: currentLevel,
      selectedUser
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error sending category to backend:', error);
    throw error; // Rethrow the error for handling
  }
};



export const fetchPredictionDataAPI = async ({ xAxis, yAxis, timePeriod, number }) => {
  try {
      const response = await axios.post(`${API_URL}/api/predictions`, {
          xAxis: xAxis,
          yAxis: yAxis,
          timePeriod: timePeriod,
          number: number,
      });
      return response.data; // Return the response data to the calling function
  } catch (error) {
      console.error("Error fetching prediction data:", error);
      throw error; // Rethrow the error for handling in the calling function
  }
};

export const sendCategoryToBackend = async (category, xAxis, yAxis, tableName, aggregation) => {
  try {
    const response = await axios.post(`${API_URL}/your-backend-endpoint`, {
      category,
      xAxis,
      yAxis,
      tableName,
      aggregation,
    });
    return response.data;
  } catch (error) {
    console.error('Error in sendCategoryToBackend API:', error);
    throw error;
  }
};


export const saveDataToDatabase = async ({
  user_id,company_name,selectedUser,selectedTable,  databaseName,  xAxis,  yAxis,  aggregate,  chartType,  barColor,  chart_heading,  dashboardBarColor,  checkedOptions,ai_chart_data, saveName,xFontSize,          // Dynamic font size for x-axis
  fontStyle,          // Font style for chart labels
  categoryColor,      // Dynamic color for x-axis categories
  yFontSize,          // Dynamic font size for y-axis
  valueColor, headingColor ,ClickedTool,areaColor,calculationData,optimizationOption,selectedFrequency
}) => {

  const formattedCheckedOptions = Object.fromEntries(
    Object.entries(checkedOptions).map(([key, values]) => [key, Array.isArray(values) ? values : []])
  );
  

  const response = await axios.post(`${API_URL}/save_data`, {
    user_id,company_name,selectedUser,selectedTable,    databaseName,    xAxis,    yAxis,    aggregate,    chartType,    chartColor: barColor,    chart_heading: chart_heading,    drillDownChartColor: dashboardBarColor,    filterOptions: formattedCheckedOptions,ai_chart_data,    saveName,xFontSize,          // Dynamic font size for x-axis
    fontStyle,          // Font style for chart labels
    categoryColor,      // Dynamic color for x-axis categories
    yFontSize,          // Dynamic font size for y-axis
    valueColor,headingColor ,ClickedTool ,areaColor ,calculationData,optimizationOption,selectedFrequency
  });
  return response.data;
};


export const saveChartData = async (data) => {
  try {
    console.log('Sending data to save:', data);
    const response = await axios.post(`${API_URL}/update_data`, data); // use backticks here
    return response.data;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
};


export const plot_chart = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/plot_chart`, data);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error plotting chart:", error);
    throw error;
  }
};

export const submitCalculationData = async (data, setReloadColumns,) => {
  const response = await axios.post(`${API_URL}/api/calculation`, data);
  console.log('Calculation data submitted:', response.data);
  // setReloadColumns(prevState => !prevState); // Toggle the state to trigger reload
  return response.data;
};

// export const signUp = async (formData) => {
//   const response = await fetch(`${API_URL}/api/signup`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: formData,
//   });

//   return response.json();
// };
export const signUp = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      body: formData, // DO NOT set headers manually when using FormData
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      // Try to parse JSON error
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      } else {
        const text = await response.text(); // fallback if not JSON
        throw new Error(`Unexpected response: ${text}`);
      }
    }

    return await response.json(); // correct parsing if valid JSON
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
};


export const fetchUserdata = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/signUP_username`);
    return response.data;
  } catch (error) {
    console.error('Error fetching usernames:', error);
    throw error;
  }
};

export const signIn = async (email, password,company) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      company: company,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};

export const fetchTotalRows = createAsyncThunk('chart/fetchTotalRows', async (user_id) => {
  
const company=sessionStorage.getItem('company_name');
  const response = await axios.get(`${API_URL}/total_rows`,
    {params:{user_id:user_id,company},});
  return response.data;
});

export const fetchChartData = createAsyncThunk('chart/fetchChartData', async ({chartName,company_name}) => {
  
  console.log("company_name",company_name)
  const response = await axios.get(`${API_URL}/chart_data/${chartName}/${company_name}`);
  return response.data;
});

export const sendTestChartData = async (text_y_xis, text_y_database,text_y_table, text_y_aggregate,selectedUser) => {
  try {
    const response = await axios.post(`${API_URL}/api/singlevalue_text_chart`, {
      text_y_xis,
      text_y_aggregate,
      text_y_table,
      text_y_database,
      selectedUser
      
      
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chart data to the backend", error);
    throw error;
  }
};

export const sendChartData = async (chart_id,text_y_xis, text_y_database,text_y_table, text_y_aggregate,selectedUser) => {
  try {
    const response = await axios.post(`${API_URL}/api/text_chart`, {
      chart_id,
      text_y_xis,
      text_y_aggregate,
      text_y_table,
      text_y_database,
      selectedUser
      
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chart data to the backend", error);
    throw error;
  }
};

export const sendChartDataview = async (chart_id,text_y_xis, text_y_database,text_y_table, text_y_aggregate,selectedUser) => {
  try {
    const response = await axios.post(`${API_URL}/api/text_chart_view`, {
      chart_id,
      text_y_xis,
      text_y_aggregate,
      text_y_table,
      text_y_database,
      selectedUser
      
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chart data to the backend", error);
    throw error;
  }
};

export const sendClickedCategory = async (category,charts,x_axis,calculationData) => {
  try {
    const response = await axios.post(`${API_URL}/api/handle-clicked-category`, {
      category,
      charts,// Initialize the charts array
      // x_axis
      x_axis,
       databaseName: sessionStorage.getItem('company_name'),
       calculationData
    });
    return response.data;  // Return the response data
  } catch (error) {
    console.error('Error sending clicked category to backend:', error);
    throw error;  // Rethrow the error for handling in the calling component
  }
};

export const saveAllCharts = async (user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName, company_name,heading, position,droppableBgColor,imagePositions) => {
  try {
    const response = await axios.post(`${API_URL}/save_all_chart_details`, {  // Assign response
      user_id,
      charts: chartData,
      dashboardfilterXaxis,
      selectedCategory,
      fileName,
      company_name,
      heading,
      position,droppableBgColor,imagePositions
    });
    if (response.data && response.data.message) {
      sessionStorage.setItem('chartSaveMessage', response.data.message);
    }

    console.log(response.data); // Log response properly
    // alert('Dashboard Saved Successfully!');
  } catch (error) {
    console.error('Error saving chart details:', error);
    // alert('Failed to save the Dashboard. Please try again later.');
  }
};

export const fetchDashboardTotalRows = createAsyncThunk('chart/fetchDashboardTotalRows', async (user_id) => {
  const company=sessionStorage.getItem('company_name');
  const response = await axios.get(`${API_URL}/saved_dashboard_total_rows`,
    {params: { user_id: user_id ,company},});
  return response.data;
});


export const fetchDashboardTotalRow = createAsyncThunk('chart/fetchDashboardTotalRows', async (user_id) => {
  const company=sessionStorage.getItem('company_name');
  const response = await axios.get(`${API_URL}/saved_Editdashboard_total_rows`,
    {params: { user_id: user_id ,company},});
  return response.data;
});

export const fetchDashboardData = createAsyncThunk(
  'chart/fetchDashboardData',
  async ({ dashboard_names, company_name }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/Dashboard_data/${dashboard_names}/${company_name}`
      );
      if (response.data.error) {
        throw new Error(response.data.error); // Throw error if the backend returns an error message
      }
      return response.data;  // Return the data if successful
    } catch (error) {
      console.error(`Error fetching data for dashboard ${dashboard_names}:`, error);
      return rejectWithValue(error.message || 'Failed to fetch data for the dashboard');  // Reject with a message
    }
  }
);

export const userSignUp = async (registerType, userDetails, company) => {
  try {
    // Fetch company from localStorage
    company = sessionStorage.getItem("user_name");

    const response = await axios.post(`${API_URL}/api/usersignup`, { registerType, userDetails, company });
    return response.data; // Return success response

  } catch (error) {
    // Handle errors
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || "Unknown error occurred"); 
    } else {
      throw new Error("Server error, please try again later");
    }
  }
};

export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/companies`);
    console.log("response",response.data)
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error; // Rethrow the error to be handled in the component
  }
};

// export const fetchRoles= async (storedCompanyName) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/roles`);
//     console.log("response",response.data)
//     return response.data; // Return the data from the response
//   } catch (error) {
//     console.error('Error fetching roles:', error);
//     throw error; // Rethrow the error to be handled in the component
//   }
// };

export const fetchRoles = async (storedCompanyName) => {
  try {
    const response = await axios.get(`${API_URL}/api/roles`, {
      params: { companyName: storedCompanyName }
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

export const fetchHelloData = async () => {
  try {
    const response = await axios.get(`${API_URL}/fetchglobeldataframe`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};

export const createRole = async (roleData) => {
  const response = await axios.post(`${API_URL}/updateroles`, roleData);
  return response.data;
};
export const AichartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/aichartdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};

export const BoxPlotchartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/boxplotchartdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};

export const fetchUserDetails = async (companyName, page, limit) => {
  try {
    const response = await axios.get(`${API_URL}/api/users`, {
      params: {
        companyName,
        page,
        limit
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch user details');
  }
};

export const fetchCategories = async (companyName) => {
  try {
    // const response = await axios.get(`${API_URL}/api/fetch_categories`);
    
    const response = await axios.get(`${API_URL}/api/fetch_categories`, {
      params: { companyName }
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error fetching categories');
  }
};

export const updateUserDetails = async (username, companyName, roleId, categoryName,reporting_id) => {
  console.log("Updating user:", { username, companyName, roleId, categoryName,reporting_id }); // Log the payload

  try {
    const response = await axios.post(`${API_URL}/api/update_user_details`, {
      username,
      companyName,
      roleId,
      categoryName,reporting_id
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update user details");
    throw error.response ? error.response.data : new Error('Failed to update user details');
  }
};

export const uploadAudioFile = (formData) => {
  return axios.post(`${API_URL}/nlp_upload_audio`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// export const fetchTableNamesAPI = async (databaseName) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/table_names`, {
//       params: { databaseName },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching table names:', error);
//     throw error; // Rethrow to handle in the caller
//   }
// };

export const fetchTableColumnsAPI = async (tableName, companyName) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/table-columns/${tableName}`,
      { params: { companyName } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching table columns:", error);
    throw error;
  }
};


export const fetchColumnsAPI = async (tableName, databaseName, connectionType, selectedUser) => {
  try {
    const response = await axios.get(`${API_URL}/column_names/${tableName}`, {
      params: { databaseName, connectionType, selectedUser },
    });
    return {
      numeric_columns: response.data.numeric_columns || [],
      text_columns: response.data.text_columns || [],
    };
  } catch (error) {
    console.error(`Error fetching columns for table ${tableName}:`, error);
    throw error;
  }
};

export const fetchVustomColumnsAPI = async (tableName, databaseName, connectionType, selectedUser) => {
  try {
    const response = await axios.get(`${API_URL}/column_names/${tableName}`, {
      params: { databaseName, connectionType, selectedUser },
    });
    return response;
  } catch (error) {
    console.error(`Error fetching columns for table ${tableName}:`, error);
    throw error;
  }
};

export const performJoinOperation = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/join-tables`, payload);
    return response.data;
  } catch (error) {
    console.error('Error performing join:', error);
    throw error;
  }
};


export const deletedashboard = (chartName) => async (dispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-chart`, { data: { chart_name: chartName } });
    dispatch({ type: "DELETE_CHART_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "DELETE_CHART_FAILURE", error });
  }
};

export const deleteChart = async (chartName) => {
  try {
    const response = await axios.delete(`${API_URL}/api/charts/${chartName}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting chart "${chartName}":`, error);
    throw error;
  }
};

export const isChartInDashboard = async (chartName, company_name) => {
  try {
    const response = await axios.get(`${API_URL}/api/is-chart-in-dashboard`, {
      params: { chart_name: chartName, company_name: company_name }
    });
    console.log('API Response for chart:', chartName, response.data); // Debug the API response
    return response.data;
  } catch (error) {
    console.error('Error checking chart usage:', error);
    return { isInDashboard: false };
  }
};

export const checkIfTableInUse = async (selectedSheet) => {
  try {
    const response = await axios.get(`${API_URL}/api/checkTableUsage`, {
      params: { tableName: selectedSheet }
    });
    return response.data.isInUse;
  } catch (error) {
    console.error('Error checking table usage:', error);
    throw new Error('Failed to check table usage');
  }
};

export const AiMLchartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/ai_ml_chartdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};

export const fetchReportingIds = async () => {
  try {
    const companyName = sessionStorage.getItem('user_name');
    const response = await axios.get(`${API_URL}/api/employees`, {
      params: { company: companyName }
    });
    return response.data.map(item => ({ id: item.employee_id, name: item.employee_name }));
  } catch (error) {
    console.error('Error fetching reporting IDs:', error);
    throw new Error('Failed to fetch reporting IDs');
  }
};

export const fetchTableColumnsAPIupload = async ( selectedTable,databaseName) => {
  try {
    const response = await axios.get(`${API_URL}/api/fetchTableDetailsexcel`, {
      params: { databaseName, selectedTable }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table details:', error);
    throw new Error('Failed to fetch table details');
  }
};

export const fetchTableNamesAPI = async (databaseName) => {
  try {
    const response = await axios.get(`${API_URL}/api/table_names`, {
      params: { databaseName },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table names:', error);
    throw error;
  }
};

// Fetch table details with optional date range filter, column selection, and column conditions
export const fetchTableDetailsAPI = async (databaseName, selectedTable, dateFilter = null, selectedColumns = null, columnConditions = null) => {
  try {
    const params = { databaseName, selectedTable };
    
    // Add date filter parameters if provided
    if (dateFilter) {
      params.dateColumn = dateFilter.dateColumn;
      params.startDate = dateFilter.startDate;
      params.endDate = dateFilter.endDate;
    }
    
    // Add selected columns if provided
    if (selectedColumns && selectedColumns.length > 0) {
      params.selectedColumns = selectedColumns.join(',');
    }
    
    // Add column conditions if provided
    if (columnConditions && columnConditions.length > 0) {
      params.columnConditions = JSON.stringify(columnConditions);
    }
    
    const response = await axios.get(`${API_URL}/api/fetchTableDetails`, {
      params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table details:', error);
    throw new Error('Failed to fetch table details');
  }
};

// New function to fetch all columns with their data types from a table
export const fetchTableColumnsWithTypesAPI = async (databaseName, selectedTable,selectedUser) => {
  try {
    const response = await axios.get(`${API_URL}/api/fetchTableColumnsWithTypes`, {
      params: { databaseName, selectedTable,selectedUser }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table columns with types:', error);
    throw new Error('Failed to fetch table columns with types');
  }
};


// New function to fetch all columns from a table
export const fetchTableDataColumnsAPI = async (databaseName, selectedTable) => {
  try {
    const response = await axios.get(`${API_URL}/api/fetchTableColumns`, {
      params: { databaseName, selectedTable }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table columns:', error);
    throw new Error('Failed to fetch table columns');
  }
};
export const fetchTableColumnsWithTypesAPIdb = async (databaseName, selectedTable,selectedUser) => {
  try {
    const response = await axios.get(`${API_URL}/api/fetchTableColumnsWithTypesdb`, {
      params: { databaseName, selectedTable,selectedUser }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table columns with types:', error);
    throw new Error('Failed to fetch table columns with types');
  }
};

// Function to fetch date columns from a table
export const fetchDateColumnsAPI = async (databaseName, selectedTable) => {
  try {
    const response = await axios.get(`${API_URL}/api/fetchDateColumns`, {
      params: { databaseName, selectedTable }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching date columns:', error);
    throw new Error('Failed to fetch date columns');
  }
};
// Function to fetch date columns from a table
export const fetchDateColumnsAPIdb = async (databaseName, selectedTable,selectedUser) => {
  try {
    const response = await axios.get(`${API_URL}/api/fetchDateColumnsdb`, {
      params: { databaseName, selectedTable,selectedUser }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching date columns:', error);
    throw new Error('Failed to fetch date columns');
  }
};


// Clear cache
export const clearCacheAPI = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/clearCache`);
    return response.data;
  } catch (error) {
    console.error('Error clearing cache:', error);
    throw new Error('Failed to clear cache');
  }
};

// Get cache information
export const getCacheInfoAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/getCacheInfo`);
    return response.data;
  } catch (error) {
    console.error('Error getting cache info:', error);
    throw new Error('Failed to get cache info');
  }
};

// Check if view name exists
export const checkViewExistsAPI = async (databaseName, viewName) => {
  try {
    const response = await axios.get(`${API_URL}/api/checkViewExists`, {
      params: { databaseName, viewName }
    });
    return response.data.exists;
  } catch (error) {
    console.error('Error checking view exists:', error);
    throw new Error('Failed to check view existence');
  }
};

// Create a database view
export const createViewAPI = async (databaseName, viewConfig) => {
  try {
    const response = await axios.post(`${API_URL}/api/createView`, {
      databaseName,
      viewConfig
    });
    return response.data;
  } catch (error) {
    console.error('Error creating view:', error);
    throw new Error(error.response?.data?.error || 'Failed to create view');
  }
};
export const createViewAPIdb = async (databaseName, viewConfig,selectedUser) => {
  try {
    const response = await axios.post(`${API_URL}/api/createViewdb`, {
      databaseName,
      viewConfig,selectedUser
    });
    return response.data;
  } catch (error) {
    console.error('Error creating view:', error);
    throw new Error(error.response?.data?.error || 'Failed to create view');
  }
};
// Check if view name exists
export const checkViewExistsAPIdb = async (databaseName, viewName,selectedUser) => {
  try {
    const response = await axios.get(`${API_URL}/api/checkViewExistsdb`, {
      params: { databaseName, viewName,selectedUser }
    });
    return response.data.exists;
  } catch (error) {
    console.error('Error checking view exists:', error);
    throw new Error('Failed to check view existence');
  }
};


// Get all user views
export const getUserViewsAPI = async (databaseName) => {
  try {
    const response = await axios.get(`${API_URL}/api/getUserViews`, {
      params: { databaseName }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user views:', error);
    throw new Error('Failed to fetch user views');
  }
};

// Drop a database view
export const dropViewAPI = async (databaseName, viewName) => {
  try {
    const response = await axios.delete(`${API_URL}/api/dropView`, {
      data: { databaseName, viewName }
    });
    return response.data;
  } catch (error) {
    console.error('Error dropping view:', error);
    throw new Error(error.response?.data?.error || 'Failed to drop view');
  }
};













export const fetchTableNamesFromExternalDB = async (databaseName,selectedUser) => {
  const response = await fetch(`${API_URL}/external-db/tables?databaseName=${databaseName}&user=${selectedUser}`);
  if (!response.ok) {
    throw new Error('Failed to fetch table names');
  }
  return await response.json();
};

export const fetchTableDetailsFromExternalDB = async (selectedTable,databaseName, selectedUser) => {
  const response = await fetch(`${API_URL}/external-db/tables/${selectedTable}?databaseName=${databaseName}&user=${selectedUser}`);
  if (!response.ok) {
    throw new Error('Failed to fetch table details');
  }
  return await response.json();
};


export const fetchUsers = async (databaseName) => {
  try {
    console.log("Fetching users for database:", databaseName);
    const response = await axios.get(`${API_URL}/api/dbusers`, {
      params: { databaseName },
    });
    console.log("Fetched users:", response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
export const validateSaveName = async (saveName,company_name) => {
  try {
    const validationResponse = await axios.post(`${API_URL}/api/checkSaveName`, { saveName,company_name });
    return validationResponse.data.exists; // Return true if it exists, false otherwise
  } catch (error) {
    console.error("Error validating save name:", error);
    return false; // Assume it doesn't exist in case of an error
  }
};


export const sendaidashboardClickedCategory = async (category,x_axis) => {
  try {
    const response = await axios.post(`${API_URL}/ai_ml_filter_chartdata`, {
      category,
      x_axis
    });
    return response.data;  // Return the response data
  } catch (error) {
    console.error('Error sending clicked category to backend:', error);
    throw error;  // Rethrow the error for handling in the calling component
  }
};


export const fetchSingleChartData = async (chartName,company_name) => {
try {

  console.log("company_name",company_name)
  const response = await axios.get(`${API_URL}/chart_data/${chartName}/${company_name}`);
  if (response.data.error) {
    throw new Error(response.data.error); // Throw error if the backend returns an error message
  }
  return response.data;
} catch (error) {
  console.error(`Error fetching data for Chart ${chartName}:`, error);
  throw new Error(error.message || 'Failed to fetch data for the chart');
}
};

export const generateChartData = async ({
  selectedTable,
  xAxis,
  yAxis,
  aggregate,
  chartType,
  filterOptions,
  databaseName,
  selectedUser,xFontSize,
  yFontSize,
  categoryColor,valueColor,fontStyle,calculation,data_limit_type,selectedFrequency
}) => {
  
  const xAxisColumns = Array.isArray(xAxis) ? xAxis.join(', ') : '';  // Default to empty string if xAxis is not an array
  
  try {
    const response = await axios.post(`${API_URL}/edit_plot_chart`, {
      selectedTable,
      xAxis: xAxisColumns,
      yAxis,
      aggregate,
      chartType,
      filterOptions,
      databaseName,
      selectedUser,xFontSize,
      yFontSize,
      categoryColor,valueColor,fontStyle,calculation,data_limit_type,selectedFrequency
    });
    return response.data;
  } catch (error) {
    console.error('Error in generateChartData API:', error);
    throw error;
  }
};



export const fetchFilterOptionsAPI = async (databaseName, selectedTable, columnName,selectedUser,calculationData) => {
  console.log('Fetching filter options for:', databaseName, selectedTable, columnName,calculationData);
  try {
    const response = await axios.get(`${API_URL}/plot_chart/${selectedTable}/${columnName}`, {
      params: { databaseName,selectedUser,calculationData }
    });
    const options = typeof response.data === 'string' ? response.data.split(', ') : response.data;
    return options; // Return options for handling in the calling function
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const generateDualAxisChartApi = async ({
  selectedTable,
  xAxis,
  yAxis,
  barColor,
  aggregate,
  chartType,
  checkedOptions,
}) => {
  const xAxisColumns = xAxis.join(', ');
  const databaseName = sessionStorage.getItem('company_name');

  const response = await axios.post(`${API_URL}/plot_dual_axis_chart`, {
    selectedTable,
    xAxis: xAxisColumns,
    yAxis,
    barColor,
    aggregate,
    chartType,
    filterOptions: checkedOptions.join(', '),
    databaseName,
  });

  return response.data;
};

export const fetchColumnNames = async (selectedTable, databaseName,connectionType,selectedUser) => {
  try {
    const response = await fetch(`${API_URL}/column_names/${selectedTable}?databaseName=${databaseName}&connectionType=${connectionType}&selectedUser=${selectedUser}`);   
      const data = await response.json();
    
    if (
      data &&
      data.numeric_columns &&
      Array.isArray(data.numeric_columns) &&
      data.text_columns &&
      Array.isArray(data.text_columns)
    ) {
      return data;
    } else {
      console.error('Invalid data structure:', data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching column information:', error);
    throw error; // Rethrow error for handling in the calling code
  }
};

export const sendChartDetails = async (data,selectedUser) => {
  try {
    const response = await axios.post(`${API_URL}/api/send-chart-details`, {
      chart_id: data[0],
      tableName: data[1],
      x_axis: data[2],
      y_axis: data[3],
      aggregate: data[4],
      chart_type: data[5],
      chart_heading: data[7],
      filter_options: data[9],
      databaseName: data[10],
      selectedUser,
       optimizeData: data[21],
       calculationData:data[20],
       selectedFrequency:data[23]
      // position, // Send position to backend
    });
    console.log('Response ----------------from backend:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error sending chart details to backend:', error);
    throw error;
  }
};

export const saveDashboardData = createAsyncThunk(
  'dashboard/saveDashboardData',
  async (dashboardData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/saveDashboard`, dashboardData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);



export const saveViewAPI = async (databaseName, originalTableName, viewName, selectedColumns) => {
  try {
    const response = await axios.post(`${API_URL}/api/create-view`, { // <<< IMPORTANT: Update this URL to your backend API endpoint
      databaseName,
      originalTableName,
      viewName,
      selectedColumns,
    });
    return response.data; // The backend should return { success: true, message: ... }
  } catch (error) {
    console.error('Error in saveViewAPI:', error);
    // You can throw the error to be caught by the calling component (LoadExcelFile.js)
    // or return a specific error structure.
    throw error; // Propagate the error so the frontend can show an error snackbar
  }
};


export const connectToDatabase = async (connectionDetails) => {
  try {
    const response = await axios.post(`${API_URL}/connect`, connectionDetails);
    return response.data;
  } catch (error) {
    // It's good practice to log the error for debugging
    console.error("Error connecting to database:", error);
    // Re-throw to allow the calling component to handle it
    throw error;
  }
};

export const fetchTables = async (connectionDetails) => {
  try {
    const response = await axios.post(`${API_URL}/get_tables`, connectionDetails);
    return response.data; // Expected to contain { tables: [...] }
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};

// New function to fetch columns for a specific table
export const fetchTableColumns = async (sourceDetails, tableName) => {
  try {
    const response = await axios.post(`${API_URL}/api/get_table_columns`, {
      source: sourceDetails, // Pass the entire source object as required by your API
      sourceTable: tableName,
    });
    return response.data; // Expected to contain { success: boolean, columns: [...] }
  } catch (error) {
    console.error("Error fetching table columns:", error);
    throw error;
  }
};

export const transferData = async (dataTransferDetails) => {
  try {
    const response = await axios.post(`${API_URL}/api/transfer_data`, dataTransferDetails);
    return response.data; // This will contain { success: boolean, message/error: string }
  } catch (error) {
    console.error("Error during data transfer:", error);
    throw error; // Re-throw to allow the calling component to handle UI-specific errors
  }
};


export const fetchChartsUnderCharts = async (chartName) => {
  const company_name = sessionStorage.getItem("company_name");

  try {
    const response = await axios.get(`${API_URL}/get_charts`, {
      params: { chart_name: chartName, company_name }
    });
    return response.data.charts || [];
  } catch (error) {
    console.error(`Error fetching charts under ${chartName}:`, error);
    return [];
  }
};

export const fetchColumn = async (chartName) => {
  const company_name = sessionStorage.getItem("company_name");

  try {
    const response = await axios.get(`${API_URL}/api/columns`, {
      params: { chart: chartName, company_name }
    });
    return [{ name: "X-Axis", value: response.data.x_axis }];
  } catch (error) {
    console.error("Error fetching columns:", error);
    return [];
  }
};

export const fetchColumnValue = async (chartName, columnName) => {
  const company_name = sessionStorage.getItem("company_name");

  try {
    const response = await axios.get(`${API_URL}/api/column_values`, {
      params: { chart: chartName, column: columnName, company_name }
    });
    return response.data.column_values;
  } catch (error) {
    console.error("Error fetching column values:", error);
    return [];
  }
};


export const updateChartFilters = async ({
  chartName,
  selectedFilters,
  dashboardFileNames,
  selectedFileName,
  companyName,
  tableName
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/update_filters`, {
      sourceChart: chartName,
      selectedFilters,
      dashboardFileNames,
      filename: selectedFileName,
      company_name: companyName,
      tableName
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating filters for ${chartName}:`, error.message);
    throw error;
  }
};

// Analyze index recommendations
export const analyzeTableIndexes = async (databaseName, tableName) => {
  try {
    const response = await axios.get('/api/analyzeTableIndexes', {
      params: { databaseName, tableName }
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing indexes:', error);
    throw error;
  }
};

// Create a composite index
export const createCompositeIndex = async (databaseName, tableName, columns) => {
  try {
    const response = await axios.post('/api/createCompositeIndex', {
      databaseName,
      tableName,
      columns
    });
    return response.data;
  } catch (error) {
    console.error('Error creating index:', error);
    throw error;
  }
};

// Explain SQL query performance
export const explainSQLQuery = async (databaseName, query) => {
  try {
    const response = await axios.post('/api/explainQuery', {
      databaseName,
      query
    });
    return response.data;
  } catch (error) {
    console.error('Error explaining query:', error);
    throw error;
  }
};
export const uploadOrganizationLogo = async (selectedFile, organizationName) => {
  const formData = new FormData();
  formData.append("logo", selectedFile);
  formData.append("organizationName", organizationName);

  const response = await axios.post("http://localhost:5000/upload_logo", formData);
  return response.data;
};

export const checkFileNameExists = async (fileName, companyName) => {
  try {
    const response = await axios.get(`${API_URL}/check_filename/${fileName}/${companyName}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking file name:", error);
    throw error;
  }
};



export const uploadCsvFile = async ({ user_id, file, primaryKeyColumnName, updatePermission }) => {
  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('file', file);
  formData.append('primaryKeyColumnName', primaryKeyColumnName);
  formData.append('updatePermission', updatePermission);

  const company_database = sessionStorage.getItem('company_name');
  formData.append('company_database', company_database);

  const response = await axios.post(`${API_URL}/uploadcsv`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};


export const validateUser = async (email, password, company) => {
  const response = await axios.get(`${API_URL}/api/validate_user`, {
    params: {
      email,
      password,
      company
    }
  });

  return response.data;
};


export const saveDatabaseConnection = async ({
  company_name,
  dbType,
  provider,
  dbUsername,
  dbPassword,
  port,
  dbName,
  saveName
}) => {
  const response = await axios.post(`${API_URL}/save_connection`, {
    company_name,
    dbType,
    provider,
    dbUsername,
    dbPassword,
    port,
    dbName,
    saveName
  });

  return response.data;
};

export const testDatabaseConnection = async ({
  dbType,
  dbUsername,
  dbPassword,
  provider,
  port,
  dbName
}) => {
  const response = await axios.post(`${API_URL}/connect`, {
    dbType,
    username: dbUsername,
    password: dbPassword,
    host: provider || 'localhost',
    port,
    dbName
  });

  return response.data;
};
export const fetchCalculationSuggestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/calculation-suggestions`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
    throw error;
  }
};

export const deleteTableAPI = async (database, tableName) => {
  const response = await fetch('http://localhost:5000/delete_table', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ database, table: tableName })
  });
  return await response.json();
};
