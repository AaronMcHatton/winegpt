"use client"
import React, { useState } from 'react';
import './SelectionPage.css'; // You can create this CSS file to style the button if needed
import CheckboxWithLabel from '../../components/CheckboxWithLabel';
import options from '../../util/options'; // Import the options array
import WineRecommendations from '../../components/WineRecommendations'; // Import the WineRecommendations component
import LoadingAnimation from '../../components/LoadingAnimation'

const SelectionPage = () => {
    const [checkboxes, setCheckboxes] = useState(
        options.reduce((acc, option) => {
          acc[option.value] = false;
          return acc;
        }, {})
      );
      const [apiResponse, setApiResponse] = useState(null); // State to store the API response

    
      const handleCheckboxChange = (name) => (event) => {
        setCheckboxes({
          ...checkboxes,
          [name]: event.target.checked,
        });
      };
    
      const handleSubmit = () => {
        const selectedValues = Object.keys(checkboxes).filter((option) => checkboxes[option]);
        const selectedValuesString = selectedValues.join(', ');
        console.log('Selected Values:', selectedValuesString);
        // Perform your submit logic here
        fetch('http://localhost:4200/recommendations/tasting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flavors: selectedValues,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data from the API
        console.log('API response:', data.message);
        setApiResponse(data.message); // Store the API response in the state
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      }
    
      return (
        <div>
        <h1>Choose your flavors</h1>
        <div className="checkboxes-container">
          {options.map((option) => (
            <div key={option.id} className="checkbox-item">
            <CheckboxWithLabel
              label={option.label}
              checked={checkboxes[option.value]}
              onChange={handleCheckboxChange(option.value)}
            />
          </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
          {apiResponse ? (
        <WineRecommendations recommendations={apiResponse} />
      ) : (
        <LoadingAnimation />
      )}
        </div>
        </div>
      );
};

export default SelectionPage;