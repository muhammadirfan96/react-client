import React, { useState } from 'react';

const ComboBox = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = event => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      <option value="">Pilih opsi</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;
