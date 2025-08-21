import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { optimizeData } from '../components/dashbord-Elements/DataOptimizationModal';

export  const API_URL='http://localhost:5000'
const getAuthToken = () => {
  try {
    const storedData = sessionStorage.getItem('data');

    if (!storedData) return null;
    
    const parsedData = JSON.parse(storedData);
    return parsedData?.access_token || null;
  } catch (error) {
    console.error('Error parsing stored auth data:', error);
    return null;
  }
};

const clearAuthData = () => {
  localStorage.removeItem('data');
};

const handleAuthError = (error) => {
  if (error.response?.status === 401) {
    clearAuthData();
    // Redirect to login page or dispatch logout action
    window.location.href = '/login';
    throw new Error('Authentication failed. Please log in again.');
  }
  if (error.response?.status === 403) {
    throw new Error('You do not have permission to perform this action.');
  }
  throw error;
};

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add auth header
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    handleAuthError(error);
    return Promise.reject(error);
  }
);


// 1
export const uploadExcelFile = async (user_id, file, primaryKeyColumnName, company_database, selectedSheet) => {
  try {
    // Validate inputs
    if (!file) {
      throw new Error('No file provided');
    }
    if (!primaryKeyColumnName) {
      throw new Error('Primary key column name is required');
    }
    if (!company_database) {
      throw new Error('Company database is required');
    }

    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
    ];
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Please select a valid Excel file (.xlsx or .xls)');
    }

    // Validate file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('file', file);
    formData.append('primaryKeyColumnName', primaryKeyColumnName);
    formData.append('company_database', company_database);
    
    // Handle selectedSheet parameter
    if (selectedSheet) {
      if (Array.isArray(selectedSheet)) {
        selectedSheet.forEach(sheet => {
          formData.append('selectedSheets', sheet);
        });
      } else {
        formData.append('selectedSheets', JSON.stringify(selectedSheet));
      }
    }

    console.log('Uploading file:', {
      fileName: file.name,
      fileSize: file.size,
      primaryKeyColumnName,
      company_database,
      selectedSheet
    });

    const response = await axios.post(`${API_URL}/uploadexcel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      timeout: 300000, // 5 minutes timeout for large files
    });

    return response.data;

  } catch (error) {
    console.error('Upload error:', error);
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'Upload failed';
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      // Something else happened
      throw error;
    }
  }
};
// 2
export const uploadCsvFile = async ({ user_id, file, primaryKeyColumnName, updatePermission }) => {
  try {
    // Validate inputs
    if (!file) {
      throw new Error('No file provided');
    }
    if (!primaryKeyColumnName) {
      throw new Error('Primary key column name is required');
    }

    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }

    // Validate file type
    const allowedTypes = [
      'text/csv',
      'application/csv',
      'text/plain', // Some systems report CSV as text/plain
    ];
    
    if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.csv')) {
      throw new Error('Please select a valid CSV file (.csv)');
    }

    // Validate file size (e.g., max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('file', file);
    formData.append('primaryKeyColumnName', primaryKeyColumnName);
    formData.append('updatePermission', updatePermission);

    const company_database = sessionStorage.getItem('company_name');
    if (!company_database) {
      throw new Error('Company database is required');
    }
    formData.append('company_database', company_database);

    console.log('Uploading CSV file:', {
      fileName: file.name,
      fileSize: file.size,
      primaryKeyColumnName,
      updatePermission,
      company_database
    });
    // const response = await axios.post(`${API_URL}/uploadcsv`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': `Bearer ${token}`,
    //   },
    //   timeout: 300000, // 5 minutes timeout for large files
    // });

    const response = await apiClient.post('/uploadcsv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000, // 5 minutes timeout for large files
    });

    return response.data;

  } catch (error) {
    console.error('CSV upload error:', error);
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'CSV upload failed';
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      // Something else happened
      throw error;
    }
  }
};
// 3
export const uploadJsonFile = async (file, primaryKeyColumnName, company_database) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('primaryKeyColumnName', primaryKeyColumnName);
  formData.append('company_database', company_database);

  const response = await apiClient.post('/upload-json', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response;
};
// 4
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
// 5
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
// 6
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
// 7
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
// 8
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
// 9
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
// 10
export const submitCalculationData = async (data, setReloadColumns,) => {
  const response = await axios.post(`${API_URL}/api/calculation`, data);
  console.log('Calculation data submitted:', response.data);
  // setReloadColumns(prevState => !prevState); // Toggle the state to trigger reload
  return response.data;
};
// 11
export const signUp = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for FormData
      },
    });

    return response.data;
  } catch (error) {
    console.error('Sign-up error:', error);

    // Extract custom error message from response if available
    if (error.response && error.response.data) {
      const errMessage = error.response.data.error || 'Signup failed';
      throw new Error(errMessage);
    } else {
      throw new Error('Network or unexpected error');
    }
  }
};
// 12
export const fetchUserdata = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/signUP_username`);
    return response.data;
  } catch (error) {
    console.error('Error fetching usernames:', error);
    throw error;
  }
};

// JWT Token Management
class AuthService {
  // Store tokens securely
  setTokens(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Also clear session storage
    sessionStorage.clear();
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getAccessToken();
  }

  // Get current user info from token
  getCurrentUser() {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        return null; // Token expired
      }
      return payload;
    } catch (error) {
      return null;
    }
  }

  // Refresh token method
  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return false;

      const response = await axios.post(`${API_URL}/api/refresh`, {
        refresh_token: refreshToken,
      });

      if (response.data) {
        this.setTokens(response.data.access_token, response.data.refresh_token);
        return true;
      } else {
        this.clearTokens();
        return false;
      }
    } catch (error) {
      this.clearTokens();
      return false;
    }
  }

  // Logout method
  async logout() {
    try {
      const token = this.getAccessToken();
      if (token) {
        await axios.post(`${API_URL}/api/logout`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }
}

// Create global auth service instance
const authService = new AuthService();

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshed = await authService.refreshToken();
      if (refreshed) {
        const token = authService.getAccessToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } else {
        // Redirect to login page
        window.location.href = '/';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// 13
export const signIn = async (email, password, company) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      company: company,
      email: email,
      password: password,
    });

    // Handle JWT tokens
    if (response.data.access_token) {
      authService.setTokens(response.data.access_token, response.data.refresh_token);
      
      // Store user data in sessionStorage for compatibility
      const userData = response.data.user_data;
      const userType = response.data.user_type;

      if (userType === 'admin') {
        sessionStorage.setItem('user_id', 'superadmin');
        sessionStorage.setItem('user_name', 'superAdmin');
        sessionStorage.setItem('user_role', 'superAdmin');
        sessionStorage.setItem('user_email', 'superadmin@gmail.com');
        sessionStorage.setItem('logo', null);
      } else if (userType === 'employee' && userData) {
        const user = userData.user;
        sessionStorage.setItem('user_id', user[0]);
        sessionStorage.setItem('user_name', user[1]);
        sessionStorage.setItem('user_role', user[2]);
        sessionStorage.setItem('user_email', user[3]);
        sessionStorage.setItem('logo', userData.logo_url);
        
        // Store employee-specific data
        if (userData.tables) {
          sessionStorage.setItem('tableNames', JSON.stringify(userData.tables));
        }
        if (userData.permissions) {
          sessionStorage.setItem('user_role_permisiion', userData.permissions);
        }
      } else if (userType === 'user' && userData) {
        // Handle regular user data
        sessionStorage.setItem('user_id', userData.user_id || userData.id);
        sessionStorage.setItem('user_name', userData.name || userData.username);
        sessionStorage.setItem('user_role', userData.role || 'user');
        sessionStorage.setItem('user_email', userData.email);
      }

      // Store common data
      sessionStorage.setItem('email', email);
      if (company) {
        sessionStorage.setItem('company_name', company);
      }
      
      // Generate a session ID for compatibility (not used for auth anymore)
      sessionStorage.setItem('session_id', `jwt_${Date.now()}`);
      sessionStorage.setItem('data', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};


export const logout = async () => {
  try {
    await authService.logout();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error };
  }
};

// Get current user from token
export const getCurrentUser = () => {
  return authService.getCurrentUser();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return authService.isAuthenticated();
};

// Protected API request wrapper
export const makeAuthenticatedRequest = async (url, options = {}) => {
  try {
    const response = await apiClient(url, options);
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// 14
export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/companies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

// Export auth service for direct access if needed
export { authService };



// 15
export const fetchTotalRows = createAsyncThunk('chart/fetchTotalRows', async (user_id) => {
  const company = sessionStorage.getItem('company_name');
  const response = await apiClient.get('/total_rows', {
    params: { user_id: user_id, company },
  });
  return response.data;
});
// 16
export const fetchTotalRowsEdit = createAsyncThunk('chart/fetchTotalRows', async (user_id) => {
  
const company=sessionStorage.getItem('company_name');
  const response = await axios.get(`${API_URL}/total_rows_Edit`,
    {params:{user_id:user_id,company},});
  return response.data;
});
// 17
export const fetchChartData = createAsyncThunk('chart/fetchChartData', async ({chartName,company_name,user_id}) => {
  
  console.log("company_name",company_name)
  // const response = await axios.get(`${API_URL}/chart_data/${chartName}/${company_name}`);
  const response = await axios.get(`${API_URL}/chart_data/${chartName}/${company_name}`, {
      params: { user_id }, // ✅ send user_id as a query param
    });

  return response.data;
});
// 18
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
// 19
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
// 20
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
// 21
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
// 22
export const saveAllCharts = async (user_id, chartData, dashboardfilterXaxis, selectedCategory, fileName, company_name, heading, position, droppableBgColor, imagePositions, projectName) => {
  try {
    const response = await apiClient.post('/save_all_chart_details', {
      user_id,
      charts: chartData,
      dashboardfilterXaxis,
      selectedCategory,
      fileName,
      company_name,
      heading,
      position,
      droppableBgColor,
      imagePositions,
      projectName
    });
    
    if (response.data && response.data.message) {
      sessionStorage.setItem('chartSaveMessage', response.data.message);
    }

    console.log(response.data);
    // alert('Dashboard Saved Successfully!');
  } catch (error) {
    console.error('Error saving chart details:', error);
    // alert('Failed to save the Dashboard. Please try again later.');
  }
};
// 23
export const fetchDashboardTotalRows = createAsyncThunk(
  'chart/fetchDashboardTotalRows',
  async ({ user_id, project_name }, { rejectWithValue }) => {
    try {
      const company = sessionStorage.getItem('company_name');
      const response = await axios.get(`${API_URL}/saved_dashboard_total_rows`, {
        params: { user_id: user_id, company, project_name }, // Pass project_name
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// 24
export const fetchProjectNames = createAsyncThunk(
  'chart/fetchProjectNames',
  async (user_id, { rejectWithValue }) => {
    try {
      const company = sessionStorage.getItem('company_name');
      const response = await apiClient.get('/project_names', {
        params: { user_id: user_id, company },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// 25
export const fetchDashboardTotalRow = createAsyncThunk('chart/fetchDashboardTotalRows', async (user_id) => {
  const company=sessionStorage.getItem('company_name');
  const response = await axios.get(`${API_URL}/saved_Editdashboard_total_rows`,
    {params: { user_id: user_id ,company},});
  return response.data;
});
// 26
export const fetchDashboardData = createAsyncThunk(
  'chart/fetchDashboardData',
  async ({ dashboard_names, company_name ,user_id}, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/Dashboard_data/${dashboard_names}/${company_name}`,{params: { user_id: user_id },}
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
// 27
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
// 28
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
// 29
export const fetchHelloData = async () => {
  try {
    const response = await axios.get(`${API_URL}/fetchglobeldataframe`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};

// 30
export const createRole = async (roleData) => {
  const response = await axios.post(`${API_URL}/updateroles`, roleData);
  return response.data;
};
// 31
export const AichartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/aichartdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};
// 32
export const BoxPlotchartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/boxplotchartdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};
// 33
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
// 34
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
// 35
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
// 36
export const uploadAudioFile = (formData) => {
  return axios.post(`${API_URL}/nlp_upload_audio`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// 37
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
// 38
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

// 39
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

// 40
export const performJoinOperation = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/join-tables`, payload);
    return response.data;
  } catch (error) {
    console.error('Error performing join:', error);
    throw error;
  }
};
// 41
export const deletedashboard = (chartName,user_id,company_name) => async (dispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-chart`, {  params: {
        chart_name: chartName,
        user_id: user_id,
        company_name: company_name
      }});
    dispatch({ type: "DELETE_CHART_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "DELETE_CHART_FAILURE", error });
  }
};
// 42
export const deleteChart = async (chartName) => {
  try {
    const response = await axios.delete(`${API_URL}/api/charts/${chartName}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting chart "${chartName}":`, error);
    throw error;
  }
};

// 43
export const isChartInDashboard = async (chartNames, companyName) => {
  try {
    const response = await apiClient.post('/api/are-charts-in-dashboard', {
      chart_names: chartNames,
      company_name: companyName
    });
    return response.data;
  } catch (error) {
    console.error("Error checking charts in dashboard:", error);
    return {};
  }
};

// 44
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
// 45
export const AiMLchartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/ai_ml_chartdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello data:', error);
    throw error;
  }
};
// 46
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
// 47
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
// 48
export const fetchTableNamesAPI = async (databaseName) => {
  try {
    const response = await apiClient.get('/api/table_names', {
      params: { databaseName },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table names:', error);
    throw error;
  }
};
// 49
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
// 50
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

// 51
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
// 52
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

// 53
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
// 54
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
// 55
export const clearCacheAPI = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/clearCache`);
    return response.data;
  } catch (error) {
    console.error('Error clearing cache:', error);
    throw new Error('Failed to clear cache');
  }
};
// 56
export const getCacheInfoAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/getCacheInfo`);
    return response.data;
  } catch (error) {
    console.error('Error getting cache info:', error);
    throw new Error('Failed to get cache info');
  }
};
// 57
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
// 58
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
// 59
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
// 60
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

// 61
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

// 62
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
// 63
export const fetchTableNamesFromExternalDB = async (databaseName, selectedUser) => {
  try {
    const response = await axios.get(`${API_URL}/external-db/tables`, {
      params: {
        databaseName,
        user: selectedUser,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table names:', error);
    throw new Error('Failed to fetch table names');
  }
};
// 64
export const fetchTableDetailsFromExternalDB = async (selectedTable, databaseName, selectedUser) => {
  try {
    const response = await axios.get(`${API_URL}/external-db/tables/${selectedTable}`, {
      params: {
        databaseName,
        user: selectedUser,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching table details:', error);
    throw new Error('Failed to fetch table details');
  }
};
// 65
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

// 66
export const validateSaveName = async (saveName,company_name,user_id) => {
  try {
    const validationResponse = await axios.post(`${API_URL}/api/checkSaveName`, { saveName,company_name,user_id });
    return validationResponse.data.exists; // Return true if it exists, false otherwise
  } catch (error) {
    console.error("Error validating save name:", error);
    return false; // Assume it doesn't exist in case of an error
  }
};
// 67
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
// 68
export const fetchSingleChartData = async (chartName,company_name,user_id) => {
try {

  console.log("company_name",company_name)
  // const response = await axios.get(`${API_URL}/chart_data/${chartName}/${company_name}`);
  const response = await axios.get(`${API_URL}/chart_data/${chartName}/${company_name}`, {
      params: { user_id }, // ✅ send user_id as a query param
    });
  if (response.data.error) {
    throw new Error(response.data.error); // Throw error if the backend returns an error message
  }
  return response.data;
} catch (error) {
  console.error(`Error fetching data for Chart ${chartName}:`, error);
  throw new Error(error.message || 'Failed to fetch data for the chart');
}
};

// 69
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
// 70
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
// 71
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
// 72
export const fetchColumnNames = async (selectedTable, databaseName, connectionType, selectedUser) => {
  try {
    const response = await axios.get(`${API_URL}/column_names/${selectedTable}`, {
      params: {
        databaseName,
        connectionType,
        selectedUser,
      },
    });

    const data = response.data;

    if (
      data &&
      Array.isArray(data.numeric_columns) &&
      Array.isArray(data.text_columns)
    ) {
      return data;
    } else {
      console.error('Invalid data structure:', data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching column information:', error);
    throw error;
  }
};

// 73
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
// 74
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
// 75
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
// 76
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
// 77
export const fetchTables = async (connectionDetails) => {
  try {
    const response = await axios.post(`${API_URL}/get_tables`, connectionDetails);
    return response.data; // Expected to contain { tables: [...] }
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};
// 78
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
// 79
export const transferData = async (dataTransferDetails) => {
  try {
    const response = await axios.post(`${API_URL}/api/transfer_data`, dataTransferDetails);
    return response.data; // This will contain { success: boolean, message/error: string }
  } catch (error) {
    console.error("Error during data transfer:", error);
    throw error; // Re-throw to allow the calling component to handle UI-specific errors
  }
};
// 80
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
// 81
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
// 82
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
// 83
export const updateChartFilters = async ({
  chartName,
  selectedFilters,
  dashboardFileNames,
  selectedFileName,
  companyName,
  tableName,user_id
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/update_filters`, {
      sourceChart: chartName,
      selectedFilters,
      dashboardFileNames,
      filename: selectedFileName,
      company_name: companyName,
      tableName,user_id
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating filters for ${chartName}:`, error.message);
    throw error;
  }
};
// 84
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
// 85
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
// 86
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
// 87
export const uploadOrganizationLogo = async (selectedFile, organizationName) => {
  const formData = new FormData();
  formData.append("logo", selectedFile);
  formData.append("organizationName", organizationName);

  const response = await axios.post(`${API_URL}/upload_logo`, formData);
  return response.data;
};
// 88
export const checkFileNameExists = async (fileName, companyName,user_id) => {
  try {
    const response = await axios.get(`${API_URL}/check_filename/${fileName}/${companyName}`, {
      params: { user_id }, // ✅ send user_id as a query param
    });
    return response.data.exists;
  } catch (error) {
    console.error("Error checking file name:", error);
    throw error;
  }
};
// 89
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
// 90
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
// 91
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
// 92
export const fetchCalculationSuggestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/calculation-suggestions`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
    throw error;
  }
};
// 93
export const deleteTableAPI = async (database, tableName) => {
  try {
    const response = await axios.post(`${API_URL}/delete_table`, {
      database,
      table: tableName,
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting table:', error);
    throw error;
  }
};
// 94
export const getRolePermissions = async (role, company) => {
  try {
    const response = await axios.get(`${API_URL}/get_role_permissions/${role}/${company}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching role permissions:', error);
    return [];
  }
};
// 95
export const getAllUsers = (company_name, user_id) => {
  return axios.get(
    `${API_URL}/api/get_all_users?company_name=${company_name}&user_id=${user_id}`
  );
};
// 96
export const shareDashboard = (data) => {
  return axios.post(`${API_URL}/api/share_dashboard`, data);
};