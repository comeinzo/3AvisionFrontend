import React ,{useEffect}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { setAggregate } from '../../features/Dashboard-Slice/chartSlice';
import { Select,MenuItem } from '@mui/material';
function AggregationInput({ aggregate }) {
  const appBarColor = useSelector((state) => state.barColor.appBarColor) || '#1976d2';
    const dispatch = useDispatch();
      const fontStyle = useSelector((state) => state.barColor.fontStyle);
    useEffect(() => {
  if (!aggregate) {
    dispatch(setAggregate('sum'));
  }
}, [aggregate, dispatch]);
const getInputLabelStyles = (appBarColor) => ({
  '&.Mui-focused': {
    color: appBarColor,
  },
});
const getSelectStyles = (appBarColor) => ({
  color: appBarColor,
  '& .MuiNativeSelect-root': {
    color: appBarColor,
  },
  '& svg': {
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


    return (
      <div className="input-fields" style={{
        display: 'flex',
        justifyContent: 'center',
        // width: '100%',
        marginLeft: '10px',
        position: 'relative'
      }}>
        {/* <FormControl style={{ 
          width: '150px', 
          maxWidth: '100%',
          margin: '5px auto',
          // height: '10px' // <-- Add this line to adjust height
        }}>
          <InputLabel id="aggregation-select-label" sx={getInputLabelStyles(appBarColor)}>Aggregation</InputLabel> */}
          {/* <NativeSelect
            value={aggregate}
            onChange={(event) => dispatch(setAggregate(event.target.value))}
            inputProps={{
              name: 'aggregation',
              id: 'aggregation-select',
            }}
            style={{
              width: '100%'
            }}
            sx={{
    color: appBarColor, // selected value text color
    '& svg': {
      color: appBarColor, // dropdown arrow
    }
  }}
          >
            <option value="sum">Sum</option>
            <option value="average">Average</option>
            <option value="count">Count</option>
            <option value="minimum">Minimum</option>
            <option value="maximum">Maximum</option>
            <option value="variance">Variance</option>
          </NativeSelect> */}
        <FormControl
  size="small" // makes label and select compact
  sx={{
    width: '120px', // adjust width as needed
    margin: '5px auto',
  }}
>
  
  {/* <InputLabel
    id="aggregation-select-label"
    shrink 
    sx={{
              fontSize: '0.875rem',
              ...getInputLabelStyles(appBarColor),
            }}
  >
    Aggregation
  </InputLabel> */}
   {/* <InputLabel
              sx={{
                fontSize: '0.875rem',
                ...getInputLabelStyles(appBarColor),
              }}
            >
              Aggregation
            </InputLabel>
  <Select
    labelId="aggregation-select-label"
    id="aggregation-select"
    value={aggregate}
    onChange={(event) => dispatch(setAggregate(event.target.value))}
    size="small" // compact height
     displayEmpty
    sx={{
              ...getInputStyles(appBarColor),
            }}
  > */}
  <InputLabel
            sx={{
              fontSize: '0.875rem',
              ...getInputLabelStyles(appBarColor),
              fontFamily:fontStyle
            }}
          >
           Aggregation
          </InputLabel>
          <Select
            value={aggregate}
            onChange={(event) => dispatch(setAggregate(event.target.value))}
             label="Aggregation"
            sx={{
              
              ...getInputStyles(appBarColor),fontFamily:fontStyle
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 280,
                  borderRadius: 1,
                },
              },
            }}
          >
    {['sum', 'average', 'count', 'minimum', 'maximum', 'variance'].map((val) => (
      <MenuItem key={val} value={val} sx={{ fontSize: '0.8rem' ,fontFamily:fontStyle}}>
        {val.charAt(0).toUpperCase() + val.slice(1)}
      </MenuItem>
    ))}
  </Select>
</FormControl>

      </div>
    );
  }

export default AggregationInput;

