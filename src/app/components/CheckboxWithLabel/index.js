import React from 'react';
import './CheckboxWithLabel.css'; // Create this CSS file for styling

const CheckboxWithLabel = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <label className="checkbox-label">{label}</label>
    </div>
  );
};

export default CheckboxWithLabel;