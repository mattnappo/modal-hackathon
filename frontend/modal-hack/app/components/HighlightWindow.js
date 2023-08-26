'use client'
import React from 'react';
import { useState } from "react";
import { Input, Button } from '@mui/base';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';

function HighlightWindow() {
  // State to hold the text input value
  const [inputValue, setInputValue] = useState('');

  // Function to handle text input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle button click
  const handleButtonClick = () => {
    // Do something with inputValue, e.g., submit it or perform an action
    console.log('Input Value:', inputValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Input
          label="Enter Text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={3}>
        {/* Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default HighlightWindow;