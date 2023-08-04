import React from 'react';

const WineRecommendations = ({ recommendations }) => {
  return (
    <div className="wine-recommendations">
      <h2>Wine Recommendations:</h2>
      {recommendations.map((wine) => (
        <div key={wine.number} className="wine-item">
          <h3 className="wine-name">{wine.name}</h3>
          <p>Percentage Match: {wine.percentage}%</p>
          <p>Description: {wine.description}</p>
          <hr className="wine-divider" />
        </div>
      ))}
    </div>
  );
};

export default WineRecommendations;
