

import React, { useState, useEffect, useRef } from 'react';
import { TextField, Tooltip, MenuItem, Paper, List, ListItemButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Column from '../dashbord-Elements/columns';
import './calculation.css';
import { useDispatch } from 'react-redux';
import { addCalculation } from '../../features/calculation-Slice/calculation-Slice';

import{fetchCalculationSuggestions} from '../../utils/api';
const TextAreaComponent = ({ onChange, initialCalculation = '', initialColumnName = '' }) => {
  const [text, setText] = useState(initialCalculation);
  const [columnName, setColumnName] = useState(initialColumnName);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sampleExpression, setSampleExpression] = useState('');
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
const [suggestionsList, setSuggestionsList] = useState([]);

useEffect(() => {
  const getSuggestions = async () => {
    try {
      const data = await fetchCalculationSuggestions();
      console.log('Received suggestions:', data);
      setSuggestionsList(data);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    }
  };

  getSuggestions();
}, []);

  useEffect(() => {
    onChange({ calculation: text, columnName });
  }, [text, columnName, onChange]);

  useEffect(() => {
    setText(initialCalculation);
    setColumnName(initialColumnName);
  }, [initialCalculation, initialColumnName]);

  useEffect(() => {
    const trimmed = text.toLowerCase().trim();
    // const match = suggestionsList.find(s => trimmed.startsWith(s.keyword));
    // setSampleExpression(match?.template || '');
    const match = suggestionsList.find(s => trimmed.startsWith(s.keyword));
  setSampleExpression(match?.template || '');
}, [text, suggestionsList]);
  

  const handleTextChange = (event) => {
    const inputText = event.target.value;
    setText(inputText);

    if (inputText.length > 0) {
      const match = suggestionsList.filter(s =>
        s.keyword.startsWith(inputText.toLowerCase())
      );
      setFilteredSuggestions(match);
      setShowSuggestions(match.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (template) => {
    setText(template);
    setShowSuggestions(false);
    textareaRef.current.focus();
  };
  

  const handleColumnNameChange = (event) => {
    setColumnName(event.target.value);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedColumnName = event.dataTransfer.getData('columnName');
    const formattedColumnName = `[${droppedColumnName}]`;
    const newText = text + formattedColumnName;
    setText(newText);
    // dispatch(addCalculation({ calculation: newText, columnName }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="row" style={{ display: 'flex', gap: '24px', padding: '20px' }}>
      <div className="column" style={{ flex: '0 0 200px' }}>
        <Column />
      </div>

      <div className="textarea-container" style={{ flex: 1 }}>
        <TextField
          label="Column Name"
          size="medium"
          value={columnName}
          onChange={handleColumnNameChange}
          sx={{ width: '100%', mb: 2 }}
          InputProps={{ style: { fontSize: '16px', padding: '12px' } }}
          InputLabelProps={{ style: { fontSize: '16px' } }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label htmlFor="calculation" style={{ fontSize: '18px', fontWeight: 'bold' }}>Calculation</label>
          {sampleExpression && (
            <Tooltip title={sampleExpression} arrow>
              <InfoIcon style={{ color: '#666', fontSize: '20px', cursor: 'pointer' }} />
            </Tooltip>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <textarea
            id="calculation"
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            rows="14"
            style={{
              width: '100%',
              height: '280px',
              padding: '16px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontFamily: 'monospace',
              backgroundColor: '#fdfdfd',
              marginTop: '5px',
              lineHeight: '1.6'
            }}
            onFocus={() => {
              if (text === '') {
                setFilteredSuggestions(suggestionsList);
                setShowSuggestions(true);
              }
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

        
{showSuggestions && (
  <div className="suggestion-list">
    <Paper
      elevation={3}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        zIndex: 10,
        maxHeight: '220px',
        overflowY: 'auto',
        marginTop: '4px',
        borderRadius: '8px'
      }}
    >
      <List>
        {filteredSuggestions.map((suggestion, index) => (
          <ListItemButton
            key={index}
            onMouseDown={() => handleSuggestionClick(suggestion.template)} // <-- use onMouseDown
            sx={{ fontSize: '14px' }}
          >
            {suggestion.template}
          </ListItemButton>
        ))}
      </List>
    </Paper>
  </div>
)}
  </div> 

        {sampleExpression && (
          <div style={{ marginTop: '8px', fontSize: '14px', color: '#444', fontStyle: 'italic' }}>
            Example: {sampleExpression}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextAreaComponent;
