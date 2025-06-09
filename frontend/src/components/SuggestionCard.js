import React from 'react';
import '../styles/suggestionCard.css';

const SuggestionCard = ({ title, content }) => {
  return (
    <div className="suggestion-card">
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  );
};

export default SuggestionCard;