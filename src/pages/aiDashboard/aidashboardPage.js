



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/ui/spinner';
import { API_URL } from '../../utils/api'; // Adjust the import path as necessary

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardUrl, setDashboardUrl] = useState('');
  const dbName = sessionStorage.getItem('company_name'); 
  const tableName = sessionStorage.getItem('selectedTable');
  
  useEffect(() => {
const generateDashboard = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await axios.get(`${API_URL}/api/generate-dashboard`, {
      params: {
        db_name: dbName,
        table_name: tableName
      }
    });
    
    if (response.data.success) {
      // Use the full URL from your Flask server
      setDashboardUrl(`${response.data.dashboard_url}`);
      console.log("Dashboard URL set to:", `${API_URL}${response.data.dashboard_url}`);
    } else {
      throw new Error(response.data.error || 'Failed to generate dashboard');
    }
  } catch (err) {
    console.error('Error generating dashboard:', err);
    setError(err.response?.data?.error || err.message || 'Failed to generate dashboard');
  } finally {
    setLoading(false);
  }
};
    
    generateDashboard();
  }, []);
  
  if (loading) return <div> <Spinner /></div>;
  if (error) return <div className="error">Error: {error}</div>;
  
  return (
    <div className="dashboard-container">
      {/* <h2>Data Analysis Dashboard</h2> */}
      {/* <HomePage/> */}
      {dashboardUrl ? (
        <iframe 
          src={dashboardUrl}
          title="Data Analysis Dashboard"
          width="100%"
          height="850px"
          style={{ border: 'none' }}
          onError={() => setError("Failed to load dashboard iframe")}
        />
      ) : (
        <div>No dashboard URL available</div>
      )}
      
    </div>
  );
};

export default Dashboard;





