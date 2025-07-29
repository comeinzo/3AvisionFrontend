
// // import './custom.css';
// import './custom.css';
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import {
//   Box,
//   Typography,
//   AppBar,
//   Toolbar,
//   MenuItem,
//   Button,
//   Menu,
//   FormControl,
//   InputLabel,
//   Select,
//   TextField,
//   Checkbox,
//   Grid,
//   FormControlLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Card,
//   CardContent,
//   CardHeader,
//   IconButton,NativeSelect,alpha
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// import {
//   fetchTableNamesAPI,
//   fetchColumnsAPI,
//   performJoinOperation,
//   fetchUsers,
//   fetchTableNamesFromExternalDB,
// } from '../../utils/api';

// import HomePage from '../HomePage';
// import { useNavigate } from 'react-router';

// // Define drag item types
// const ItemTypes = {
//   TABLE: 'table',
// };

// // Draggable Table Component
// const DraggableTable = ({ tableName,appBarColor,fontStyle }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemTypes.TABLE,
//     item: { name: tableName },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return (
//     <Box
//       ref={drag}
//       sx={{
//         padding: '10px 8px',
//         margin: '4px',
//         cursor: 'grab',
//         opacity: isDragging ? 0.6 : 1,
//         borderRadius: '8px',
//         textAlign: 'center',
//         backgroundColor:  alpha(appBarColor, 0.15),
//         // border: `1px solid ${appBarColor}`,
//         boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
//         '&:hover': {
//           backgroundColor: '#bbdefb',
//           boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
//         },
//         transition: 'all 0.2s ease-in-out',
//         fontSize: '1rem',
//         fontFamily:fontStyle,
//         fontWeight: 'medium',
//         color: appBarColor,
//       }}
//     >
//       {tableName}
//     </Box>
//   );
// };

// // DropZone Component
// const DropZone = ({
//   droppedTables,
//   setDroppedTables,
//   setConnections,
//   handleOpenReviewModal,
//   joinTableName,
//   handleJoinTableNameChange,
//   appBarColor,fontStyle,getInputStyles,getInputLabelStyles
// }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedTableIndex, setSelectedTableIndex] = useState(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const [, drop] = useDrop(() => ({
//     accept: ItemTypes.TABLE,
//     drop: (item) => {
//       const fixedX = 50;
//       const fixedY = 50;
//       setDroppedTables((prev) => {
//         // Avoid duplicates
//         if (prev.some((table) => table.name === item.name)) return prev;

//         const newTable = {
//           name: item.name,
//           x:
//             prev.length === 0
//               ? fixedX
//               : prev[prev.length - 1].x + 350,
//           y:
//             prev.length === 0
//               ? fixedY
//               : prev[prev.length - 1].y,
//         };

//         const updatedTables = [...prev, newTable];

//         // If two tables are dropped, connect them
//         if (updatedTables.length === 2) {
//           setConnections([[0, 1]]);
//         }
//         return updatedTables;
//       });
//     },
//   }));

//   const handleRemoveTable = (index) => {
//     setDroppedTables((prev) => prev.filter((_, i) => i !== index));
//     setConnections((prev) =>
//       prev.filter(
//         ([start, end]) => start !== index && end !== index
//       )
//     );
//     handleClose();
//   };

//   const handleClick = (event, index) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedTableIndex(index);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setSelectedTableIndex(null);
//   };

//   const handleSaveClick = () => {
//     setIsDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setIsDialogOpen(false);
//   };

//   // const handleOpenReviewModal = () => {
//   //   handleOpenReviewModal();
//   // };

//   return (
//     <Box
//       ref={drop}
//       sx={{
//         height: '380px',
//         width: '100%',
//         position: 'relative',
//         backgroundColor: '#f0f0f0',
//         padding: '10px',
//         borderRadius: '8px',
//         border: '2px dashed #ccc',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//         gap: '20px',
//         position: 'relative',
//       }}
//     >
//       {droppedTables.length === 0 && (
//         <Typography
//           sx={{
//             textAlign: 'center',
//             color: 'gray',
//             fontSize: '1.2rem',
//             fontFamily:fontStyle,
//             fontWeight: 'medium',
//           }}
//         >
//           Drag table here to start joining
//         </Typography>
//       )}

//       {/* Connection Lines */}
//       {/* {droppedTables.length > 1 && (
//         <svg
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//             zIndex: 1,
//           }}
//         >
//           {droppedTables.map((_, index) => {
//             if (index === droppedTables.length - 1) return null;
//             const start = droppedTables[index];
//             const end = droppedTables[index + 1];
//             const startX = start.x + 125;
//             const startY = start.y + 25;
//             const endX = end.x + 125;
//             const endY = end.y + 25;

//             return (
//               <line
//                 key={index}
//                 x1={startX}
//                 y1={startY}
//                 x2={endX}
//                 y2={endY}
//                 stroke="#757575"
//                 strokeWidth="2"
//                 strokeDasharray="5,5"
//               />
//             );
//           })} */}
//           {droppedTables.length > 1 && (
//         <svg
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//             zIndex: 1,
//           }}
//         >
//           {droppedTables.map((_, index) => {
//   if (index === droppedTables.length - 1) return null;
//   const start = droppedTables[index];
//   const end = droppedTables[index + 1];
  
//   const tableWidth = 250;
//   const tableHeight = 70;
  
//   const startX = start.x + tableWidth; // right edge of start table
//   const startY = start.y + tableHeight / 2; // middle vertically
  
//   const endX = end.x; // left edge of end table
//   const endY = end.y + tableHeight / 2; // middle vertically

//   return (
//     <line
//       key={index}
//       x1={startX}
//       y1={startY}
//       x2={endX}
//       y2={endY}
//       stroke="#757575"
//       strokeWidth="2"
//       strokeDasharray="5,5"
//     />
//   );
// })}
//         </svg>
//       )}

//       {/* Render dropped tables */}
//       {droppedTables.map((table, index) => (
//         <Card
//           key={index}
//           sx={{
//             position: 'absolute',
//             left: table.x,
//             top: table.y,
//             width: '250px',
//             height: '70px',
//             backgroundColor:  alpha(appBarColor, 0.15),
//             cursor: 'default',
//             textAlign: 'center',
//             userSelect: 'none',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0px 3px 6px rgba(0,0,0,0.15)',
//             borderRadius: '10px',
//             fontFamily:fontStyle ,
//             zIndex: 2,
//           }}
//         >
//           <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px' } }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', color: appBarColor, fontFamily: fontStyle, color: appBarColor }}>
//               {table.name}
//             </Typography>
//           </CardContent>
//           <IconButton
//             onClick={(e) => handleClick(e, index)}
//             sx={{ position: 'absolute', top: 5, right: 5, color:appBarColor }}
//             size="small"
//           >
//             <ArrowDropDownIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={selectedTableIndex === index}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={() => handleRemoveTable(index)}>
//               <DeleteIcon sx={{ mr: 1 }} /> Remove
//             </MenuItem>
//           </Menu>
//         </Card>
//       ))}

//       {/* Action Buttons */}
//       {droppedTables.length > 1 && (
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: '20px',
//             right: '20px',
//             zIndex: 1000,
//             display: 'flex',
//             gap: '16px',
//           }}
//         >
//           <Button
//             variant="contained"
//             onClick={handleOpenReviewModal}
//             sx={{
//               backgroundColor: appBarColor,
//               '&:hover': { backgroundColor: '#388e3c' },
//               padding: '10px 20px',
//               fontSize: '1rem',
//               fontFamily:fontStyle ,
//               textTransform: 'none',
//               borderRadius: '8px',
//               boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
//             }}
//           >
//             Join
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSaveClick}
//             sx={{
//               backgroundColor: '#2196f3',
//               '&:hover': { backgroundColor: '#1976d2' },
//               padding: '10px 20px',
//               fontSize: '1rem',
//               textTransform: 'none',
//               borderRadius: '8px',
//               boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
//               fontFamily:fontStyle 
//             }}
//           >
//             Save
//           </Button>

//           {/* Save Dialog */}
//           <Dialog open={isDialogOpen} onClose={handleDialogClose}>
//             <DialogTitle sx={{ fontWeight: 'bold' ,color:appBarColor}}>Save Joined Table</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Joined Table Name"
//                 variant="outlined"
//                 value={joinTableName}
//                 onChange={handleJoinTableNameChange}
//                 placeholder="Enter join table name"
//                 fullWidth
//                 sx={{ mt: 2 ,fontFamily:fontStyle,color:appBarColor}}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleDialogClose} color="secondary" sx={{fontFamily:fontStyle,color:appBarColor}}>
//                 Cancel
//               </Button>
//               <Button onClick={handleDialogClose} color="primary" variant="contained" sx={{fontFamily:fontStyle,color:appBarColor}}>
//                 Save
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </Box>
//       )}
//     </Box>
//   );
// };

// // Join Configuration Section
// const JoinConfigSection = ({
//   droppedTables,
//   handleJoinKeyChange,
//   handleJoinTypeChange,
//   handleRemoveJoin,
//   columns,appBarColor,fontStyle,getInputStyles,getInputLabelStyles
// }) => {
//   const table1 = droppedTables[0] || {};
//   const table2 = droppedTables[1] || {};

//   return (
//     <Card
//       sx={{
//         height: '100%',
//         padding: '20px',
//         borderRadius: '8px',
//         backgroundColor: 'white',
//         boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       <Typography
//         variant="h5"
//         gutterBottom
//         sx={{
//           textAlign: 'center',
//           marginBottom: '20px',
//           fontWeight: 'bold',
//           fontFamily:fontStyle,color:appBarColor,
//           textTransform: 'uppercase',
//         }}
//       >
//         Configure Joins
//       </Typography>
//       {droppedTables.length > 1 ? (
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '20px',
//             padding: '15px',
//            backgroundColor:  alpha(appBarColor, 0.15),
//             borderRadius: '10px',
//             marginBottom: '20px',
//             boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
//           }}
//         >
//           {/* Table 1 */}
//           <Box sx={{ textAlign: 'center', flex: 1 }}>
//             <Typography variant="subtitle1" sx={{ marginBottom: '10px', fontWeight: 'bold',fontFamily:fontStyle,color:appBarColor }}>
//               {table1?.name || 'Table 1'}
//             </Typography>
//             <FormControl fullWidth>
//               {/* <InputLabel variant="standard" htmlFor="table1-join-key" sx={{fontFamily:fontStyle,...getInputLabelStyles(appBarColor)}}>
//                   Select Join Key
//               </InputLabel> */}
//               <NativeSelect
//                 id="table1-join-key"
//                 value={table1?.joinKey || ''}
//                 onChange={(e) => handleJoinKeyChange(0, e.target.value)}
//                 label="Join Key"
//                 sx={{fontFamily:fontStyle,  ...getInputStyles(appBarColor),}}
//               >
               
//                 {columns[table1?.name] &&
//                   [
//                     ...(columns[table1?.name]?.text_columns || []),
//                     ...(columns[table1?.name]?.numeric_columns || []),
//                   ].map((col, idx) => (
//                     <option key={idx} value={col} sx={{fontFamily:fontStyle,color:appBarColor}}>
//                       {col}
//                     </option>
//                   ))}
//               </NativeSelect>
//             </FormControl>
//           </Box>

//           {/* Join Type */}
//           <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
//             <FormControl sx={{ minWidth: 150 }}>
//               <InputLabel id="join-type-label" sx={{fontSize: '0.875rem',
//               ...getInputLabelStyles(appBarColor),
//               fontFamily: fontStyle}}>Join Type</InputLabel>
//               <Select
//                 labelId="join-type-label"
//                 value={table1?.joinType || 'INNER JOIN'}
//                 onChange={(e) => handleJoinTypeChange(0, e.target.value)}
//                 label="Join Type"
//                   sx={{fontSize: '0.875rem',
//               ...getInputLabelStyles(appBarColor),
//               fontFamily: fontStyle}}
//               >
//                 <MenuItem value="INNER JOIN" style={{ fontFamily: fontStyle, color: appBarColor }}>INNER JOIN</MenuItem>
//                 <MenuItem value="LEFT JOIN"  style={{ fontFamily: fontStyle, color: appBarColor }}>LEFT JOIN</MenuItem>
//                 <MenuItem value="RIGHT JOIN"  style={{ fontFamily: fontStyle, color: appBarColor }}>RIGHT JOIN</MenuItem>
//                 <MenuItem value="FULL JOIN"  style={{ fontFamily: fontStyle, color: appBarColor }}>FULL JOIN</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Table 2 */}
//           <Box sx={{ textAlign: 'center', flex: 1 }}>
//             <Typography variant="subtitle1" sx={{ marginBottom: '10px', fontWeight: 'bold',fontFamily:fontStyle,color:appBarColor }}>
//               {table2?.name || 'Table 2'}
//             </Typography>
//             <FormControl fullWidth>
//               {/* <InputLabel variant="standard" htmlFor="table1-join-key" sx={{fontFamily:fontStyle,...getInputLabelStyles(appBarColor)}}>
//                   Select Join Key
//               </InputLabel> */}
//               <NativeSelect
//                 id="table2-join-key"
//                 value={table2?.joinKey || ''}
//                 onChange={(e) => handleJoinKeyChange(0, e.target.value)}
//                 label="Join Key"
//                 sx={{fontFamily:fontStyle,  ...getInputStyles(appBarColor),}}
//               >
               
//                 {columns[table1?.name] &&
//                   [
//                     ...(columns[table2?.name]?.text_columns || []),
//                     ...(columns[table2?.name]?.numeric_columns || []),
//                   ].map((col, idx) => (
//                     <option key={idx} value={col} sx={{fontFamily:fontStyle,color:appBarColor}}>
//                       {col}
//                     </option>
//                   ))}
//               </NativeSelect>
//             </FormControl>
//           </Box>
//           {/* Remove Join Button */}
//           <IconButton
//             onClick={() => handleRemoveJoin(1)}
//             color="error"
//             aria-label="remove join"
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       ) : (
//         <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <Typography variant="h6" color="textSecondary">
//             Drag at least two tables to configure joins.
//           </Typography>
//         </Box>
//       )}
//     </Card>
//   );
// };

// // Main Component
// const CustomJoinWithFetchTables = () => {
//   const navigate = useNavigate();

//   const [tableNames, setTableNames] = useState([]);
//   const [columns, setColumns] = useState({});
//   const [droppedTables, setDroppedTables] = useState([]);
//   const [connections, setConnections] = useState([]);
//   const [joinedData, setJoinedData] = useState(null);
//   const [joinType, setJoinType] = useState('INNER JOIN');
//   const [selectedUser1, setSelectedUser] = useState(sessionStorage.getItem('selectedUser1') );
//   const [joinTableName, setJoinTableName] = useState('');
//   const [selectedColumns, setSelectedColumns] = useState({});
//   const [reviewModalOpen, setReviewModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
//  const fontStyle = useSelector((state) => state.barColor.fontStyle);
//   const databaseName = sessionStorage.getItem('company_name');
//  const getInputLabelStyles = (appBarColor) => ({
//     '&.Mui-focused': {
//       color: appBarColor,
//     },
//   });

//   const getInputStyles = (appBarColor) => ({
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: '#ccc', // Default
//     },
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: '#aaa', // Hover
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: appBarColor, // On focus
//     },
//     '&.Mui-focused .MuiSelect-select': {
//       color: appBarColor, // Selected value on focus
//     },
//     '& .MuiSelect-icon': {
//       color: appBarColor, // Dropdown arrow
//     },
//   });


//   // Effect to disable back button
//   useEffect(() => {
//     const disableBack = () => {
//       navigate('/');
//     };
//     window.history.pushState(null, '', window.location.href);
//     window.addEventListener('popstate', disableBack);
//     return () => window.removeEventListener('popstate', disableBack);
//   }, [navigate]);

//   // Fetch users list
//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchUsers(databaseName);
//         setUsers(data.sort((a, b) => a.saveName.localeCompare(b.saveName)));
//       } catch (err) {
//         console.error('Error fetching users:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchAllUsers();
//   }, [databaseName]);

//   // Fetch table names
//   useEffect(() => {
//     const fetchTables = async () => {
//       setIsLoading(true);
//       try {
//         let data = [];
//         if (selectedUser1 === 'Local db' || !selectedUser1) {
//           data = await fetchTableNamesAPI(databaseName);
//           setTableNames(data);
//         } else {
//           sessionStorage.setItem('selectedUser11', selectedUser1);
//           sessionStorage.setItem('connectionType', 'external');
//           data = await fetchTableNamesFromExternalDB(databaseName, selectedUser1);
//           setTableNames(data);
//         }
//       } catch (err) {
//         console.error('Error fetching table names:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchTables();
//   }, [databaseName, selectedUser1]);

//   // Fetch columns for all tables
//   // const fetchColumns = async () => {
//   //   console.log('Fetched droppedTables:', droppedTables);
//   //   const fetchedColumns = {};
//   //   await Promise.all(
       
//   //     droppedTables.map(async (table) => {
//   //       try {
//   //         const connectionType = getTableConnectionType(table);
//   //         if (connectionType === 'external' && !selectedUser1)
//   //           throw new Error(`Connection details required for ${table}`);
//   //         const cols = await fetchColumnsAPI(
//   //           table,
//   //           databaseName,
//   //           connectionType,
//   //           selectedUser1
//   //         );
//   //         fetchedColumns[table] = cols;
//   //       } catch (err) {
//   //         console.error(`Error fetching columns for ${table}:`, err);
//   //       }
//   //     })
//   //   );
//   //   setColumns((prev) => ({ ...prev, ...fetchedColumns }));
//   //   console.log('Fetched columns:', fetchedColumns);
//   // };
//   const fetchColumns = async () => {
//   console.log('Fetched droppedTables:', droppedTables);
//   const fetchedColumns = {};
//   await Promise.all(
//     droppedTables.map(async (table) => {
//       try {
//         const connectionType = getTableConnectionType(table);
//         if (connectionType === 'external' && !selectedUser1)
//           throw new Error(`Connection details required for ${table}`);
//         const cols = await fetchColumnsAPI(
//           table.name,
//           databaseName,
//           connectionType,
//           selectedUser1
//         );
//         console.log(`Fetched columns for ${table.name}:`, cols); // Debug
//         fetchedColumns[table.name] = cols;
//       } catch (err) {
//         console.error(`Error fetching columns for ${table.name}:`, err);
//       }
//     })
//   );
//   setColumns((prev) => ({ ...prev, ...fetchedColumns }));
//   console.log('Updated columns state:', { ...columns, ...fetchedColumns });
// };

//   useEffect(() => {
//     fetchColumns();
    
//   }, [droppedTables, selectedUser1]);

//   const getTableConnectionType = (table) => {
//     const found = droppedTables.find((dt) => dt.name === table);
//     return found ? found.connectionType : sessionStorage.getItem('connectionType') || 'local';
//   };

//   // Modal handlers
//   const handleOpenReviewModal = () => setReviewModalOpen(true);
//   const handleCloseReviewModal = () => setReviewModalOpen(false);

//   // User selection
//   const handleUserChange = (e) => {
//     const user = e.target.value;
//     setSelectedUser(user);
//     sessionStorage.setItem('selectedUser1', user);
//     sessionStorage.setItem('connectionType', user === 'Local db' ? 'local' : 'external');
//     setTableNames([]);
//     setDroppedTables([]);
//     setConnections([]);
//     setColumns({});
//     setSelectedColumns({});
//   };

//   // Construct SQL query (for display)
//   const constructSQLQuery = () => {
//     const tables = droppedTables.map((t) => t.name);
//     if (
//       tables.length < 2 ||
//       !droppedTables[0]?.joinKey ||
//       !droppedTables[1]?.joinKey
//     )
//       return 'Please drag at least two tables and select join keys to generate SQL.';
//     const selectedCols = Object.entries(selectedColumns)
//       .flatMap(([table, cols]) => cols.map((col) => `${table}.${col}`))
//       .join(', ');
//     const joinCondition = `${tables[0]}.${droppedTables[0].joinKey} = ${tables[1]}.${droppedTables[1].joinKey}`;
//     const joinTypeFinal = droppedTables[0]?.joinType || 'INNER JOIN';

//     return `
//       CREATE OR REPLACE VIEW ${joinTableName || 'joined_table'} AS
//       SELECT ${selectedCols || '*'}
//       FROM ${tables[0]}
//       ${joinTypeFinal} ${tables[1]} ON ${joinCondition};
//     `.trim();
//   };

//   // Handlers for join configuration
//   const handleJoinKeyChange = (index, value) => {
//     const updated = [...droppedTables];
//     if (updated[index]) {
//       updated[index] = { ...updated[index], joinKey: value };
//       setDroppedTables(updated);
//     }
//   };

//   const handleJoinTypeChange = (index, value) => {
//     const updated = [...droppedTables];
//     if (updated[index]) {
//       updated[index] = { ...updated[index], joinType: value };
//       setDroppedTables(updated);
//     }
//   };

//   const handleColumnSelection = (table, column, checked) => {
//     setSelectedColumns((prev) => {
//       const prevCols = prev[table] || [];
//       const newCols = checked
//         ? [...prevCols, column]
//         : prevCols.filter((col) => col !== column);
//       return { ...prev, [table]: newCols };
//     });
//   };

//   const handleRemoveJoin = (index) => {
//     setDroppedTables((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleJoinTableNameChange = (e) => setJoinTableName(e.target.value);

//   const handleConfirmJoin = async () => {
//     const query = constructSQLQuery();
//     console.log('SQL Query:', query);
//     setReviewModalOpen(false);

//     // Validation before perform join
//     if (droppedTables.length < 2) {
//       alert('Please drag at least two tables.');
//       return;
//     }
//     if (!droppedTables[0]?.joinKey || !droppedTables[1]?.joinKey) {
//       alert('Select join keys for both tables.');
//       return;
//     }
//     if (!joinTableName) {
//       alert('Enter a name for the joined table.');
//       return;
//     }
//     if (Object.keys(selectedColumns).length === 0) {
//       alert('Select columns for the joined table.');
//       return;
//     }

//     const tables = droppedTables.map((t) => t.name);
//     const selectedCols = Object.entries(selectedColumns)
//       .flatMap(([table, cols]) => cols.map((col) => `${table}.${col}`));

//     const joinColumns = {};
//     droppedTables.forEach((t) => {
//       joinColumns[t.name] = t.joinKey;
//     });

//     const payload = {
//       tables,
//       selectedColumns: selectedCols,
//       joinColumns,
//       joinType: droppedTables[0]?.joinType || 'INNER JOIN',
//       databaseName: sessionStorage.getItem('company_name'),
//       joinedTableName: joinTableName,
//     };

//     try {
//       const result = await performJoinOperation(payload);
//       setJoinedData(result);
//       alert('Join successful!');
//       // Reset states if needed
//       setJoinTableName('');
//       setDroppedTables([]);
//       setConnections([]);
//       setSelectedColumns({});
//     } catch (err) {
//       console.error('Join error:', err);
//       alert('Error performing join operation.');
//     }
//   };



//   return (
//     <DndProvider backend={HTML5Backend}>
//       {/* Header */}
//       {/* <AppBar position="static" sx={{ backgroundColor: '#222', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1, color: appBarColor, fontFamily:fontStyle }}>Data Joiner</Typography>
//         </Toolbar>
//       </AppBar> */}
//  <HomePage />
//       {/* Layout */}
//       <Grid container spacing={3} sx={{ height: 'calc(100vh - 64px)', pt: 0 }}>
//         {/* Sidebar */}
//         <Grid item xs={12} md={3} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
         

//           {/* Connection Selector */}
//           <Card sx={{ mb: 3, borderRadius: 2, bgcolor: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',pt:0 }}>
//             <CardHeader
//               title={
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: appBarColor, fontFamily:fontStyle }}>
//                   Select DB Connection
//                 </Typography>
//               }
//             />
//             <CardContent>
//               <FormControl fullWidth>
//                 <InputLabel
//                   id="user-select-label"
//                   sx={getInputLabelStyles(appBarColor)}
//                 >
//                   DB Connection
//                 </InputLabel>
//                 <Select
//                   labelId="user-select-label"
//                   value={selectedUser1}
//                   onChange={handleUserChange}
//                   label="DB Connection"
//                   sx={getInputStyles(appBarColor)}
//                 >
//                   <MenuItem value="Local db" sx={{ fontFamily:fontStyle, color: appBarColor}}>Local db</MenuItem>
//                   {users.map((user) => (
//                     <MenuItem key={user.id} value={user.saveName} sx={{ fontFamily:fontStyle, color: appBarColor}}>
//                       {user.saveName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: appBarColor, fontFamily:"fontStyle" }}>
//                 Current connection: <strong>{selectedUser1}</strong>
//               </Typography>
//             </CardContent>
//           </Card>

//           {/* Available Tables */}
//           <Card sx={{ borderRadius: 2, bgcolor: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
//             <CardHeader
//               title={
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: appBarColor, fontFamily:fontStyle }}>
//                   Available Tables
//                 </Typography>
//               }
//             />
//             <CardContent sx={{ maxHeight: 'calc(100vh - 420px)', overflowY: 'auto',width:'562px' }}>
//               {isLoading ? (
//                 <Typography align="center" sx={{color: appBarColor, fontFamily:fontStyle }}>Loading tables...</Typography>
//               ) : tableNames.length > 0 ? (
//                 tableNames.map((table) => (
//                   <DraggableTable key={table} tableName={table} appBarColor={appBarColor} fontStyle={fontStyle} />
//                 ))
//               ) : (
//                 <Typography align="center" sx={{color: appBarColor, fontFamily:fontStyle }}>No tables available.</Typography>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Main Workspace */}
//         <Grid item xs={12} md={9} sx={{ height: '100%' }}>
//           <Grid container spacing={3} sx={{ height: '100%' }}>
//             {/* Drop Zone */}
//             <Grid item xs={12} sx={{ height: '45%', position: 'relative' }}>
//               <DropZone
//                 droppedTables={droppedTables}
//                 setDroppedTables={setDroppedTables}
//                 setConnections={setConnections}
//                 handleOpenReviewModal={handleOpenReviewModal}
//                 joinTableName={joinTableName}
//                 handleJoinTableNameChange={handleJoinTableNameChange}
//                 appBarColor={appBarColor}
//                 fontStyle={fontStyle}
//                 getInputStyles={getInputStyles}
//                 getInputLabelStyles={getInputLabelStyles}
//               />
//             </Grid>

//             {/* Join Config & Columns Preview */}
//             <Grid item xs={12} sx={{ height: '55%' }}>
//               <Grid container spacing={3} sx={{ height: '100%' }}>
//                 {/* Join Configuration */}
//                 <Grid item xs={12} md={6} sx={{ height: '100%' }}>
//                   <JoinConfigSection
//                     droppedTables={droppedTables}
//                     handleJoinKeyChange={handleJoinKeyChange}
//                     handleJoinTypeChange={handleJoinTypeChange}
//                     handleRemoveJoin={handleRemoveJoin}
//                     columns={columns}
//                     appBarColor={appBarColor}
//                     fontStyle={fontStyle}
//                     getInputStyles={getInputStyles}
//                     getInputLabelStyles={getInputLabelStyles}
//                   />
//                 </Grid>

//                 {/* Columns Preview */}
//                 <Grid item xs={12} md={6} sx={{ height: '100%' }}>
//                   <Card
//                     sx={{
//                       bgcolor: droppedTables.length === 0 ? '#f5f5f5' : '#fff',
//                       p: 2,
//                       height: '100%',
//                       borderRadius: 2,
//                       boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//                       display: 'flex',
//                       flexDirection: 'column',
//                       overflowY: 'auto',
//                       fontFamily:fontStyle,
//                     }}
//                   >
//                     <Typography
//                       variant="h5"
//                       align="center"
//                       sx={{
//                         mb: 2,
//                         fontWeight: 'bold',
//                         color: appBarColor,
//                         textTransform: 'uppercase',
//                         fontFamily:fontStyle,
//                       }}
//                     >
//                       Columns Preview
//                     </Typography>
//                     {droppedTables.length > 0 ? (
//                       <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
//                         {droppedTables.slice(0, 2).map((table) => (
//                           <Box
//                             key={table.name}
//                             sx={{
//                               minWidth: 280,
//                               p: 2,
//                               border: '1px solid #ddd',
//                               borderRadius: '12px',
//                               backgroundColor: '#fafafa',
//                               boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//                               display: 'flex',
//                               flexDirection: 'column',
//                             }}
//                           >
//                             <Typography
//                               variant="h6"
//                               sx={{ fontWeight: 'bold', mb: 1, color: appBarColor }}
//                             >
//                               {table.name}
//                             </Typography>
//                             <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
//                               {columns[table.name] ? (
//                                 [...(columns[table.name].text_columns || []), ...(columns[table.name].numeric_columns || [])].map((col, idx) => (
//                                   <FormControlLabel
//                                     key={idx}
//                                     control={
//                                       <Checkbox
//                                         checked={selectedColumns[table.name]?.includes(col) || false}
//                                         onChange={(e) => handleColumnSelection(table.name, col, e.target.checked)}
//                                       />
//                                     }
//                                     label={col}
//                                     sx={{
//                                       '& .MuiFormControlLabel-label': {
//                                         fontSize: '0.9rem',
//                                         fontFamily:fontStyle,

//                                       },
//                                     }}
//                                   />
//                                 ))
//                               ) : (
//                                 <Typography variant="body2" sx={{ color: appBarColor, textAlign: 'center' }}>
//                                   No columns available.
//                                 </Typography>
//                               )}
//                             </Box>
//                           </Box>
//                         ))}
//                       </Box>
//                     ) : (
//                       <Typography align="center" sx={{ mt: 4, color: appBarColor }}>
//                         Drag tables here to preview columns.
//                       </Typography>
//                     )}
//                   </Card>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       {/* Review SQL Modal */}
//       <Dialog
//         open={reviewModalOpen}
//         onClose={handleCloseReviewModal}
//         maxWidth="md"
//         fullWidth
//         sx={{
//           '& .MuiDialog-paper': {
//             borderRadius: 2,
//             bgcolor: '#fff',
//           },
//         }}
//       >
//         <DialogTitle sx={{ fontWeight: 'bold', color: '#222', fontFamily :fontStyle}}>Review SQL Query</DialogTitle>
//         <DialogContent dividers>
//           <Box
//             sx={{
//               p: 2,
//               backgroundColor: '#f0f0f0',
//               borderRadius: 2,
//               overflowX: 'auto',
//               fontFamily:fontStyle,
//             }}
//           >
//             <Typography
//               variant="body1"
//               component="pre"
//               sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.9rem' }}
//             >
//               {constructSQLQuery()}
//             </Typography>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseReviewModal} color="secondary" sx={{ fontFamily:fontStyle }}>
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmJoin} color="primary" variant="contained" sx={{ fontFamily :fontStyle}}>
//             Confirm Join
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </DndProvider>
//   );
// };

// export default CustomJoinWithFetchTables;

// import './custom.css';
import './custom.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  MenuItem,
  Button,
  Menu,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Checkbox,
  Grid,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  NativeSelect,
  alpha,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
  fetchTableNamesAPI,
  fetchColumnsAPI,
  performJoinOperation,
  fetchUsers,
  fetchTableNamesFromExternalDB,
} from '../../utils/api';

import HomePage from '../HomePage';
import { useNavigate } from 'react-router';

// Define drag item types
const ItemTypes = {
  TABLE: 'table',
};

// Draggable Table Component
const DraggableTable = ({ tableName, appBarColor, fontStyle }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TABLE,
    item: { name: tableName },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      sx={{
        padding: '10px 8px',
        margin: '4px',
        cursor: 'grab',
        opacity: isDragging ? 0.6 : 1,
        borderRadius: '8px',
        textAlign: 'center',
        backgroundColor: alpha(appBarColor, 0.15),
        // border: `1px solid ${appBarColor}`,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          backgroundColor: '#bbdefb',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
        },
        transition: 'all 0.2s ease-in-out',
        fontSize: '1rem',
        fontFamily: fontStyle,
        fontWeight: 'medium',
        color: appBarColor,
      }}
    >
      {tableName}
    </Box>
  );
};

// DropZone Component
const DropZone = ({
  droppedTables,
  setDroppedTables,
  setConnections,
  handleOpenReviewModal,
  joinTableName,
  handleJoinTableNameChange,
  appBarColor,
  fontStyle,
  getInputStyles,
  getInputLabelStyles,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TABLE,
    drop: (item) => {
      const fixedX = 50;
      const fixedY = 50;
      setDroppedTables((prev) => {
        // Avoid duplicates
        if (prev.some((table) => table.name === item.name)) return prev;

        const newTable = {
          name: item.name,
          x: prev.length === 0 ? fixedX : prev[prev.length - 1].x + 350,
          y: prev.length === 0 ? fixedY : prev[prev.length - 1].y,
        };

        const updatedTables = [...prev, newTable];

        // If two tables are dropped, connect them
        if (updatedTables.length === 2) {
          setConnections([[0, 1]]);
        }
        return updatedTables;
      });
    },
  }));

  const handleRemoveTable = (index) => {
    setDroppedTables((prev) => prev.filter((_, i) => i !== index));
    setConnections((prev) =>
      prev.filter(([start, end]) => start !== index && end !== index)
    );
    handleClose();
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedTableIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTableIndex(null);
  };

  const handleSaveClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box
      ref={drop}
      sx={{
        height: '380px',
        width: '100%',
        position: 'relative',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '8px',
        border: '2px dashed #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        position: 'relative',
      }}
    >
      {droppedTables.length === 0 && (
        <Typography
          sx={{
            textAlign: 'center',
            color: 'gray',
            fontSize: '1.2rem',
            fontFamily: fontStyle,
            fontWeight: 'medium',
          }}
        >
          Drag table here to start joining
        </Typography>
      )}

      {droppedTables.length > 1 && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {droppedTables.map((_, index) => {
            if (index === droppedTables.length - 1) return null;
            const start = droppedTables[index];
            const end = droppedTables[index + 1];

            const tableWidth = 250;
            const tableHeight = 70;

            const startX = start.x + tableWidth; // right edge of start table
            const startY = start.y + tableHeight / 2; // middle vertically

            const endX = end.x; // left edge of end table
            const endY = end.y + tableHeight / 2; // middle vertically

            return (
              <line
                key={index}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#757575"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            );
          })}
        </svg>
      )}

      {/* Render dropped tables */}
      {droppedTables.map((table, index) => (
        <Card
          key={index}
          sx={{
            position: 'absolute',
            left: table.x,
            top: table.y,
            width: '250px',
            height: '70px',
            backgroundColor: alpha(appBarColor, 0.15),
            cursor: 'default',
            textAlign: 'center',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 3px 6px rgba(0,0,0,0.15)',
            borderRadius: '10px',
            fontFamily: fontStyle,
            zIndex: 2,
          }}
        >
          <CardContent sx={{ padding: '10px', '&:last-child': { paddingBottom: '10px' } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: appBarColor, fontFamily: fontStyle }}
            >
              {table.name}
            </Typography>
          </CardContent>
          <IconButton
            onClick={(e) => handleClick(e, index)}
            sx={{ position: 'absolute', top: 5, right: 5, color: appBarColor }}
            size="small"
          >
            <ArrowDropDownIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={selectedTableIndex === index} onClose={handleClose}>
            <MenuItem onClick={() => handleRemoveTable(index)}>
              <DeleteIcon sx={{ mr: 1 }} /> Remove
            </MenuItem>
          </Menu>
        </Card>
      ))}

      {/* Action Buttons */}
      {droppedTables.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            display: 'flex',
            gap: '16px',
          }}
        >
          <Button
            variant="contained"
            onClick={handleOpenReviewModal}
            sx={{
              backgroundColor: appBarColor,
              '&:hover': { backgroundColor: '#388e3c' },
              padding: '10px 20px',
              fontSize: '1rem',
              fontFamily: fontStyle,
              textTransform: 'none',
              borderRadius: '8px',
              boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
            }}
          >
            Join
          </Button>
          {/* <Button
            variant="contained"
            onClick={handleSaveClick}
            sx={{
              backgroundColor: '#2196f3',
              '&:hover': { backgroundColor: '#1976d2' },
              padding: '10px 20px',
              fontSize: '1rem',
              textTransform: 'none',
              borderRadius: '8px',
              boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
              fontFamily: fontStyle,
            }}
          >
            Save
          </Button> */}

          {/* Save Dialog */}
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogTitle sx={{ fontWeight: 'bold', color: appBarColor }}>
              Save Joined Table
            </DialogTitle>
            <DialogContent>
              <TextField
                label="Joined Table Name"
                variant="outlined"
                value={joinTableName}
                onChange={handleJoinTableNameChange}
                placeholder="Enter join table name"
                fullWidth
                sx={{ mt: 2, fontFamily: fontStyle, color: appBarColor }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary" sx={{ fontFamily: fontStyle, color: appBarColor }}>
                Cancel
              </Button>
              <Button onClick={handleDialogClose} color="primary" variant="contained" sx={{ fontFamily: fontStyle, color: appBarColor }}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

// Join Configuration Section
const JoinConfigSection = ({
  droppedTables,
  handleJoinKeyChange,
  handleJoinTypeChange,
  handleRemoveJoin,
  columns,
  appBarColor,
  fontStyle,
  getInputStyles,
  getInputLabelStyles,
}) => {
  const table1 = droppedTables[0] || {};
  const table2 = droppedTables[1] || {};

  return (
    <Card
      sx={{
        height: '100%',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: 'center',
          marginBottom: '20px',
          fontWeight: 'bold',
          fontFamily: fontStyle,
          color: appBarColor,
          textTransform: 'uppercase',
        }}
      >
        Configure Joins
      </Typography>
      {droppedTables.length > 1 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '15px',
            backgroundColor: alpha(appBarColor, 0.15),
            borderRadius: '10px',
            marginBottom: '20px',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
          }}
        >
          {/* Table 1 */}
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: '10px', fontWeight: 'bold', fontFamily: fontStyle, color: appBarColor }}
            >
              {table1?.name || 'Table 1'}
            </Typography>
            <FormControl fullWidth>
              <NativeSelect
                id="table1-join-key"
                value={table1?.joinKey || ''}
                onChange={(e) => handleJoinKeyChange(0, e.target.value)}
                label="Join Key"
                sx={{ fontFamily: fontStyle, ...getInputStyles(appBarColor) }}
              >
                <option value="">Select Join Key</option> {/* Added a default empty option */}
                {columns[table1?.name] &&
                  [
                    ...(columns[table1?.name]?.text_columns || []),
                    ...(columns[table1?.name]?.numeric_columns || []),
                  ].map((col, idx) => (
                    <option key={idx} value={col} sx={{ fontFamily: fontStyle, color: appBarColor }}>
                      {col}
                    </option>
                  ))}
              </NativeSelect>
            </FormControl>
          </Box>

          {/* Join Type */}
          <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel
                id="join-type-label"
                sx={{
                  fontSize: '0.875rem',
                  ...getInputLabelStyles(appBarColor),
                  fontFamily: fontStyle,
                }}
              >
                Join Type
              </InputLabel>
              <Select
                labelId="join-type-label"
                value={table1?.joinType || 'INNER JOIN'}
                onChange={(e) => handleJoinTypeChange(0, e.target.value)}
                label="Join Type"
                sx={{
                  fontSize: '0.875rem',
                  ...getInputLabelStyles(appBarColor),
                  fontFamily: fontStyle,
                }}
              >
                <MenuItem value="INNER JOIN" style={{ fontFamily: fontStyle, color: appBarColor }}>
                  INNER JOIN
                </MenuItem>
                <MenuItem value="LEFT JOIN" style={{ fontFamily: fontStyle, color: appBarColor }}>
                  LEFT JOIN
                </MenuItem>
                <MenuItem value="RIGHT JOIN" style={{ fontFamily: fontStyle, color: appBarColor }}>
                  RIGHT JOIN
                </MenuItem>
                <MenuItem value="FULL JOIN" style={{ fontFamily: fontStyle, color: appBarColor }}>
                  FULL JOIN
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Table 2 */}
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: '10px', fontWeight: 'bold', fontFamily: fontStyle, color: appBarColor }}
            >
              {table2?.name || 'Table 2'}
            </Typography>
            <FormControl fullWidth>
              <NativeSelect
                id="table2-join-key"
                value={table2?.joinKey || ''}
                onChange={(e) => handleJoinKeyChange(1, e.target.value)}
                label="Join Key"
                sx={{ fontFamily: fontStyle, ...getInputStyles(appBarColor) }}
              >
                <option value="">Select Join Key</option> {/* Added a default empty option */}
                {columns[table2?.name] && // Changed table1?.name to table2?.name
                  [
                    ...(columns[table2?.name]?.text_columns || []),
                    ...(columns[table2?.name]?.numeric_columns || []),
                  ].map((col, idx) => (
                    <option key={idx} value={col} sx={{ fontFamily: fontStyle, color: appBarColor }}>
                      {col}
                    </option>
                  ))}
              </NativeSelect>
            </FormControl>
          </Box>
          {/* Remove Join Button */}
          <IconButton onClick={() => handleRemoveJoin(1)} color="error" aria-label="remove join">
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            Drag at least two tables to configure joins.
          </Typography>
        </Box>
      )}
    </Card>
  );
};

// Main Component
const CustomJoinWithFetchTables = () => {
  const navigate = useNavigate();

  const [tableNames, setTableNames] = useState([]);
  const [columns, setColumns] = useState({});
  const [droppedTables, setDroppedTables] = useState([]);
  const [connections, setConnections] = useState([]);
  const [joinedData, setJoinedData] = useState(null);
  const [joinType, setJoinType] = useState('INNER JOIN'); // This state is not being used
  const [selectedUser1, setSelectedUser] = useState(sessionStorage.getItem('selectedUser1'));
  const [joinTableName, setJoinTableName] = useState('');
  const [selectedColumns, setSelectedColumns] = useState({});
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
  const fontStyle = useSelector((state) => state.barColor.fontStyle);
  const databaseName = sessionStorage.getItem('company_name');

  const getInputLabelStyles = (appBarColor) => ({
    '&.Mui-focused': {
      color: appBarColor,
    },
  });

  const getInputStyles = (appBarColor) => ({
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ccc', // Default
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#aaa', // Hover
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: appBarColor, // On focus
    },
    '&.Mui-focused .MuiSelect-select': {
      color: appBarColor, // Selected value on focus
    },
    '& .MuiSelect-icon': {
      color: appBarColor, // Dropdown arrow
    },
  });

  // Effect to disable back button
  useEffect(() => {
    const disableBack = () => {
      navigate('/');
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', disableBack);
    return () => window.removeEventListener('popstate', disableBack);
  }, [navigate]);

  // Fetch users list
  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsers(databaseName);
        setUsers(data.sort((a, b) => a.saveName.localeCompare(b.saveName)));
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllUsers();
  }, [databaseName]);

  // Fetch table names
  useEffect(() => {
    const fetchTables = async () => {
      setIsLoading(true);
      try {
        let data = [];
        if (selectedUser1 === 'Local db' || !selectedUser1) {
          data = await fetchTableNamesAPI(databaseName);
          setTableNames(data);
        } else {
          sessionStorage.setItem('selectedUser11', selectedUser1);
          sessionStorage.setItem('connectionType', 'external');
          data = await fetchTableNamesFromExternalDB(databaseName, selectedUser1);
          setTableNames(data);
        }
      } catch (err) {
        console.error('Error fetching table names:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTables();
  }, [databaseName, selectedUser1]);

  const fetchColumns = async () => {
    console.log('Fetched droppedTables:', droppedTables);
    const fetchedColumns = {};
    await Promise.all(
      droppedTables.map(async (table) => {
        try {
          const connectionType = getTableConnectionType(table.name); // Pass table.name
          if (connectionType === 'external' && !selectedUser1)
            throw new Error(`Connection details required for ${table.name}`);
          const cols = await fetchColumnsAPI(
            table.name,
            databaseName,
            connectionType,
            selectedUser1
          );
          console.log(`Fetched columns for ${table.name}:`, cols); // Debug
          fetchedColumns[table.name] = cols;
        } catch (err) {
          console.error(`Error fetching columns for ${table.name}:`, err);
        }
      })
    );
    setColumns((prev) => ({ ...prev, ...fetchedColumns }));
    console.log('Updated columns state:', { ...columns, ...fetchedColumns });
  };

  useEffect(() => {
    if (droppedTables.length > 0) { // Only fetch columns if there are dropped tables
      fetchColumns();
    } else {
      setColumns({}); // Clear columns if no tables are dropped
      setSelectedColumns({}); // Clear selected columns too
    }
  }, [droppedTables, selectedUser1]);

  const getTableConnectionType = (tableName) => {
    const found = droppedTables.find((dt) => dt.name === tableName);
    return found ? found.connectionType : sessionStorage.getItem('connectionType') || 'local';
  };

  // Modal handlers
  const handleOpenReviewModal = () => setReviewModalOpen(true);
  const handleCloseReviewModal = () => setReviewModalOpen(false);

  // User selection
  const handleUserChange = (e) => {
    const user = e.target.value;
    setSelectedUser(user);
    sessionStorage.setItem('selectedUser1', user);
    sessionStorage.setItem('connectionType', user === 'Local db' ? 'local' : 'external');
    setTableNames([]);
    setDroppedTables([]);
    setConnections([]);
    setColumns({});
    setSelectedColumns({});
  };

  // Construct SQL query (for display)
  const constructSQLQuery = () => {
    const tables = droppedTables.map((t) => t.name);
    if (
      tables.length < 2 ||
      !droppedTables[0]?.joinKey ||
      !droppedTables[1]?.joinKey
    )
      return 'Please drag at least two tables and select join keys to generate SQL.';
    const selectedCols = Object.entries(selectedColumns)
      .flatMap(([table, cols]) => cols.map((col) => `${table}.${col}`))
      .join(', ');
    const joinCondition = `${tables[0]}.${droppedTables[0].joinKey} = ${tables[1]}.${droppedTables[1].joinKey}`;
    const joinTypeFinal = droppedTables[0]?.joinType || 'INNER JOIN';

    return `
      CREATE OR REPLACE VIEW ${joinTableName || 'joined_table'} AS
      SELECT ${selectedCols || '*'}
      FROM ${tables[0]}
      ${joinTypeFinal} ${tables[1]} ON ${joinCondition};
    `.trim();
  };

  // Handlers for join configuration
  const handleJoinKeyChange = (index, value) => {
    const updated = [...droppedTables];
    if (updated[index]) {
      updated[index] = { ...updated[index], joinKey: value };
      setDroppedTables(updated);
    }
  };

  const handleJoinTypeChange = (index, value) => {
    const updated = [...droppedTables];
    if (updated[index]) {
      updated[index] = { ...updated[index], joinType: value };
      setDroppedTables(updated);
    }
  };

  const handleColumnSelection = (table, column, checked) => {
    setSelectedColumns((prev) => {
      const prevCols = prev[table] || [];
      const newCols = checked
        ? [...prevCols, column]
        : prevCols.filter((col) => col !== column);
      return { ...prev, [table]: newCols };
    });
  };

  const handleRemoveJoin = (index) => {
    // This function seems to be intended to remove a join configuration,
    // but its current implementation removes a table from droppedTables.
    // If you intend to remove a specific join between two tables,
    // the logic for connections and droppedTables needs to be more complex.
    // For now, it will remove the second dropped table (at index 1) if called with index 1.
    setDroppedTables((prev) => prev.filter((_, i) => i !== index));
    // Also remove relevant connections
    setConnections((prev) => prev.filter(([start, end]) => start !== index && end !== index));
    // Clear selected columns for the removed table
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };
      delete newSelectedColumns[droppedTables[index]?.name];
      return newSelectedColumns;
    });
  };

  const handleJoinTableNameChange = (e) => setJoinTableName(e.target.value);

  const handleConfirmJoin = async () => {
    const query = constructSQLQuery();
    console.log('SQL Query:', query);
    setReviewModalOpen(false);

    // Validation before perform join
    if (droppedTables.length < 2) {
      alert('Please drag at least two tables.');
      return;
    }
    if (!droppedTables[0]?.joinKey || !droppedTables[1]?.joinKey) {
      alert('Select join keys for both tables.');
      return;
    }
    if (!joinTableName) {
      alert('Enter a name for the joined table.');
      return;
    }
    if (Object.keys(selectedColumns).length === 0) {
      alert('Select columns for the joined table.');
      return;
    }

    const tables = droppedTables.map((t) => t.name);
    const selectedCols = Object.entries(selectedColumns).flatMap(([table, cols]) =>
      cols.map((col) => `${table}.${col}`)
    );

    const joinColumns = {};
    droppedTables.forEach((t) => {
      joinColumns[t.name] = t.joinKey;
    });

    const payload = {
      tables,
      selectedColumns: selectedCols,
      joinColumns,
      joinType: droppedTables[0]?.joinType || 'INNER JOIN',
      databaseName: sessionStorage.getItem('company_name'),
      joinedTableName: joinTableName,
    };

    try {
      const result = await performJoinOperation(payload);
      setJoinedData(result);
      alert('Join successful!');
      // Reset states if needed
      setJoinTableName('');
      setDroppedTables([]);
      setConnections([]);
      setSelectedColumns({});
    } catch (err) {
      console.error('Join error:', err);
      alert('Error performing join operation.');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <HomePage />
      <Grid container spacing={3} sx={{ height: 'calc(100vh - 64px)', pt: 0 }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
          {/* Connection Selector */}
          <Card sx={{ mb: 3, borderRadius: 2, bgcolor: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', pt: 0 }}>
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', textAlign: 'center', color: appBarColor, fontFamily: fontStyle }}
                >
                  Select DB Connection
                </Typography>
              }
            />
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="user-select-label" sx={getInputLabelStyles(appBarColor)}>
                  DB Connection
                </InputLabel>
                <Select
                  labelId="user-select-label"
                  value={selectedUser1}
                  onChange={handleUserChange}
                  label="DB Connection"
                  sx={getInputStyles(appBarColor)}
                >
                  <MenuItem value="Local db" sx={{ fontFamily: fontStyle, color: appBarColor }}>
                    Local db
                  </MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.saveName} sx={{ fontFamily: fontStyle, color: appBarColor }}>
                      {user.saveName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: appBarColor, fontFamily: fontStyle }}>
                Current connection: <strong>{selectedUser1}</strong>
              </Typography>
            </CardContent>
          </Card>

          {/* Available Tables */}
          <Card sx={{ borderRadius: 2, bgcolor: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', textAlign: 'center', color: appBarColor, fontFamily: fontStyle }}
                >
                  Available Tables
                </Typography>
              }
            />
            <CardContent sx={{ maxHeight: 'calc(100vh - 420px)', overflowY: 'auto', width: 'auto' }}>
              {isLoading ? (
                <Typography align="center" sx={{ color: appBarColor, fontFamily: fontStyle }}>
                  Loading tables...
                </Typography>
              ) : tableNames.length > 0 ? (
                tableNames.map((table) => (
                  <DraggableTable key={table} tableName={table} appBarColor={appBarColor} fontStyle={fontStyle} />
                ))
              ) : (
                <Typography align="center" sx={{ color: appBarColor, fontFamily: fontStyle }}>
                  No tables available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Main Workspace */}
        <Grid item xs={12} md={9} sx={{ height: '100%' }}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            {/* Drop Zone */}
            <Grid item xs={12} sx={{ height: '45%', position: 'relative' }}>
              <DropZone
                droppedTables={droppedTables}
                setDroppedTables={setDroppedTables}
                setConnections={setConnections}
                handleOpenReviewModal={handleOpenReviewModal}
                joinTableName={joinTableName}
                handleJoinTableNameChange={handleJoinTableNameChange}
                appBarColor={appBarColor}
                fontStyle={fontStyle}
                getInputStyles={getInputStyles}
                getInputLabelStyles={getInputLabelStyles}
              />
            </Grid>

            {/* Join Config & Columns Preview */}
            <Grid item xs={12} sx={{ height: '55%' }}>
              <Grid container spacing={3} sx={{ height: '100%' }}>
                {/* Join Configuration */}
                <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                  <JoinConfigSection
                    droppedTables={droppedTables}
                    handleJoinKeyChange={handleJoinKeyChange}
                    handleJoinTypeChange={handleJoinTypeChange}
                    handleRemoveJoin={handleRemoveJoin}
                    columns={columns}
                    appBarColor={appBarColor}
                    fontStyle={fontStyle}
                    getInputStyles={getInputStyles}
                    getInputLabelStyles={getInputLabelStyles}
                  />
                </Grid>

                {/* Columns Preview */}
                <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                  <Card
                    sx={{
                      bgcolor: droppedTables.length === 0 ? '#f5f5f5' : '#fff',
                      p: 2,
                      height: '100%',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflowY: 'auto',
                      fontFamily: fontStyle, // Removed semicolon here
                    }}
                  >
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        color: appBarColor,
                        textTransform: 'uppercase',
                        fontFamily: fontStyle,
                      }}
                    >
                      Columns Preview
                    </Typography>
                    {droppedTables.length > 0 ? (
                      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
                        {droppedTables.slice(0, 2).map((table) => (
                          <Box
                            key={table.name}
                            sx={{
                              minWidth: 280,
                              p: 2,
                              border: '1px solid #ddd',
                              borderRadius: '12px',
                              backgroundColor: '#fafafa',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 'bold', mb: 1, color: appBarColor }}
                            >
                              {table.name}
                            </Typography>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                              {columns[table.name] ? (
                                <>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#555', mb: 1, fontFamily: fontStyle }}>
                                    Text Columns:
                                  </Typography>
                                  {(columns[table.name].text_columns || []).map((col, idx) => (
                                    <FormControlLabel
                                      key={`text-${idx}`}
                                      control={
                                        <Checkbox
                                          checked={selectedColumns[table.name]?.includes(col) || false}
                                          onChange={(e) =>
                                            handleColumnSelection(table.name, col, e.target.checked)
                                          }
                                        />
                                      }
                                      label={
                                        <Typography sx={{ fontSize: '0.9rem', fontFamily: fontStyle }}>
                                          {col}
                                        </Typography>
                                      }
                                      sx={{ '& .MuiFormControlLabel-label': { color: appBarColor } }}
                                    />
                                  ))}
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#555', mt: 2, mb: 1, fontFamily: fontStyle }}>
                                    Numeric Columns:
                                  </Typography>
                                  {(columns[table.name].numeric_columns || []).map((col, idx) => (
                                    <FormControlLabel
                                      key={`numeric-${idx}`}
                                      control={
                                        <Checkbox
                                          checked={selectedColumns[table.name]?.includes(col) || false}
                                          onChange={(e) =>
                                            handleColumnSelection(table.name, col, e.target.checked)
                                          }
                                        />
                                      }
                                      label={
                                        <Typography sx={{ fontSize: '0.9rem', fontFamily: fontStyle }}>
                                          {col}
                                        </Typography>
                                      }
                                      sx={{ '& .MuiFormControlLabel-label': { color: appBarColor } }}
                                    />
                                  ))}
                                </>
                              ) : (
                                <Typography sx={{ color: 'text.secondary', fontFamily: fontStyle }}>
                                  Loading columns...
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'text.secondary', fontFamily: fontStyle }}>
                          Drag tables into the drop zone to see their columns.
                        </Typography>
                      </Box>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Review Join Modal */}
      <Dialog open={reviewModalOpen} onClose={handleCloseReviewModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', color: appBarColor, fontFamily: fontStyle }}>
          Review Join Operation
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '8px', bgcolor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: fontStyle, color: appBarColor }}>
              Selected Tables:
            </Typography>
            {droppedTables.map((table, index) => (
              <Typography key={index} sx={{ ml: 2, fontFamily: fontStyle }}>
                - {table.name} (Join Key: {table.joinKey || 'N/A'}, Join Type:{' '}
                {table.joinType || 'INNER JOIN'})
              </Typography>
            ))}

            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontFamily: fontStyle, color: appBarColor }}>
              Columns to Select:
            </Typography>
            {Object.entries(selectedColumns).length > 0 ? (
              Object.entries(selectedColumns).map(([table, cols]) => (
                <Box key={table} sx={{ ml: 2 }}>
                  <Typography sx={{ fontWeight: 'bold', fontFamily: fontStyle }}>
                    {table}:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {cols.map((col, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          bgcolor: alpha(appBarColor, 0.1),
                          color: appBarColor,
                          p: '4px 8px',
                          borderRadius: '4px',
                          fontFamily: fontStyle,
                        }}
                      >
                        {col}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))
            ) : (
              <Typography sx={{ ml: 2, fontFamily: fontStyle, color: 'text.secondary' }}>
                No columns selected. All columns will be selected by default.
              </Typography>
            )}

            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontFamily: fontStyle, color: appBarColor }}>
              Joined Table Name:
            </Typography>
            <TextField
              variant="outlined"
              value={joinTableName}
              onChange={handleJoinTableNameChange}
              placeholder="Enter joined table name"
              fullWidth
              size="small"
              sx={{ ml: 2, mt: 1, fontFamily: fontStyle }}
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 2, fontFamily: fontStyle, color: appBarColor }}>
              Generated SQL Query:
            </Typography>
            <Box
              sx={{
                bgcolor: '#e8eaf6',
                p: 2,
                borderRadius: '8px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: '0.9rem',
                color: '#3f51b5',
              }}
            >
              {constructSQLQuery()}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewModal} sx={{ fontFamily: fontStyle, color: appBarColor }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmJoin}
            variant="contained"
            sx={{ backgroundColor: appBarColor, '&:hover': { backgroundColor: '#388e3c' }, fontFamily: fontStyle }}
          >
            Confirm Join
          </Button>
        </DialogActions>
      </Dialog>
    </DndProvider>
  );
};

export default CustomJoinWithFetchTables;