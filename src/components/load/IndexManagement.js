// IndexManagement.js - Component to manage database indexes
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Speed as SpeedIcon,
  Assessment as AssessmentIcon,
  Add as AddIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import axios from 'axios';
import {
  analyzeTableIndexes as fetchTableIndexes,
  createCompositeIndex,
  explainSQLQuery
} from '../../utils/api';

const IndexManagement = ({ databaseName, tableName }) => {
  const [indexAnalysis, setIndexAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creatingIndex, setCreatingIndex] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [explainDialog, setExplainDialog] = useState(false);
  const [queryPlan, setQueryPlan] = useState(null);

  useEffect(() => {
    if (databaseName && tableName) {
      analyzeTableIndexes();
    }
  }, [databaseName, tableName]);

const analyzeTableIndexes = async () => {
  setLoading(true);
  try {
    const result = await fetchTableIndexes(databaseName, tableName);
    setIndexAnalysis(result);
    setMessage('Index analysis completed successfully');
    setMessageType('success');
  } catch {
    setMessage('Failed to analyze table indexes');
    setMessageType('error');
  } finally {
    setLoading(false);
  }
};

const createIndex = async (suggestion) => {
  setCreatingIndex(true);
  try {
    const result = await createCompositeIndex(databaseName, tableName, suggestion.columns);
    setMessage(`Index created successfully: ${result.index_name}`);
    setMessageType('success');

    setTimeout(() => {
      analyzeTableIndexes();
    }, 2000);
  } catch {
    setMessage('Failed to create index');
    setMessageType('error');
  } finally {
    setCreatingIndex(false);
  }
};

const explainQuery = async (query) => {
  try {
    const result = await explainSQLQuery(databaseName, query);
    setQueryPlan(result);
    setExplainDialog(true);
  } catch {
    setMessage('Failed to analyze query performance');
    setMessageType('error');
  }
};

  const getIndexTypeColor = (type) => {
    switch (type) {
      case 'date_range':
        return 'primary';
      case 'composite':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getPerformanceScore = (tableStats) => {
    if (!tableStats) return 0;
    const totalRows = tableStats.total_rows;
    if (totalRows < 1000) return 100;
    if (totalRows < 10000) return 80;
    if (totalRows < 100000) return 60;
    if (totalRows < 1000000) return 40;
    return 20;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
        <Typography ml={2}>Analyzing table indexes...</Typography>
      </Box>
    );
  }

  if (!indexAnalysis) {
    return (
      <Box p={2}>
        <Button variant="contained" onClick={analyzeTableIndexes} startIcon={<AssessmentIcon />}>
          Analyze Table Indexes
        </Button>
      </Box>
    );
  }

  const performanceScore = getPerformanceScore(indexAnalysis.table_stats);

  return (
    <Box p={2}>
      {message && (
        <Alert severity={messageType} onClose={() => setMessage('')} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {/* Performance Overview */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Performance Overview: {tableName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Rows: {indexAnalysis.table_stats?.total_rows?.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Table Size: {indexAnalysis.table_stats?.table_size}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <SpeedIcon color={performanceScore > 70 ? 'success' : performanceScore > 40 ? 'warning' : 'error'} />
                <Typography variant="h4" ml={1} color={performanceScore > 70 ? 'success.main' : performanceScore > 40 ? 'warning.main' : 'error.main'}>
                  {performanceScore}%
                </Typography>
                <Typography variant="body2" color="textSecondary" ml={1}>
                  Performance Score
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Existing Indexes */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Existing Indexes ({indexAnalysis.existing_indexes?.length || 0})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {indexAnalysis.existing_indexes?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Index Name</TableCell>
                    <TableCell>Definition</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {indexAnalysis.existing_indexes.map((index, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {index.indexname}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                          {index.indexdef}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View performance impact">
                          <IconButton size="small" onClick={() => explainQuery(`SELECT * FROM ${tableName} ORDER BY 1 LIMIT 100`)}>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info">No indexes found for this table</Alert>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Index Suggestions */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Index Suggestions ({indexAnalysis.index_suggestions?.length || 0})
          </Typography>
          {indexAnalysis.index_suggestions?.length > 0 && (
            <Chip 
              label="Performance Boost Available" 
              color="warning" 
              size="small" 
              sx={{ ml: 2 }}
            />
          )}
        </AccordionSummary>
        <AccordionDetails>
          {indexAnalysis.index_suggestions?.length > 0 ? (
            <Grid container spacing={2}>
              {indexAnalysis.index_suggestions.map((suggestion, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Typography variant="h6" component="div">
                          {suggestion.index_name}
                        </Typography>
                        <Chip 
                          label={suggestion.type} 
                          color={getIndexTypeColor(suggestion.type)} 
                          size="small"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="textSecondary" mb={2}>
                        {suggestion.reason}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', fontFamily: 'monospace', mb: 2 }}>
                        Columns: {suggestion.columns.join(', ')}
                      </Typography>
                      
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => createIndex(suggestion)}
                          disabled={creatingIndex}
                        >
                          {creatingIndex ? 'Creating...' : 'Create Index'}
                        </Button>
                        
                        <Tooltip title="View SQL">
                          <IconButton size="small" onClick={() => alert(suggestion.sql)}>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="success" icon={<CheckCircleIcon />}>
              All recommended indexes are already in place for optimal performance!
            </Alert>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Column Analysis */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Column Analysis
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Date/Time Columns ({indexAnalysis.date_columns?.length || 0})
              </Typography>
              {indexAnalysis.date_columns?.length > 0 ? (
                indexAnalysis.date_columns.map((col, i) => (
                  <Chip key={i} label={col} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No date columns found
                </Typography>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Numeric Columns ({indexAnalysis.numeric_columns?.length || 0})
              </Typography>
              {indexAnalysis.numeric_columns?.length > 0 ? (
                indexAnalysis.numeric_columns.map((col, i) => (
                  <Chip key={i} label={col} variant="outlined" sx={{ mr: 1, mb: 1 }} />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No numeric columns found
                </Typography>
              )}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Query Performance Dialog */}
      <Dialog open={explainDialog} onClose={() => setExplainDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Query Execution Plan</DialogTitle>
        <DialogContent>
          {queryPlan && (
            <Box>
              <Typography variant="body2" gutterBottom>
                Query: {queryPlan.query}
              </Typography>
              <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                <pre style={{ fontSize: '0.8rem', overflow: 'auto' }}>
                  {JSON.stringify(queryPlan.execution_plan, null, 2)}
                </pre>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExplainDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Refresh Button */}
      <Box mt={3} display="flex" justifyContent="center">
        <Button 
          variant="outlined" 
          onClick={analyzeTableIndexes}
          startIcon={<AssessmentIcon />}
        >
          Refresh Analysis
        </Button>
      </Box>
    </Box>
  );
};

export default IndexManagement;