// src/components/ComicGrid.js
import React from 'react';
import ComicCard from './ComicCard';
import './ComicGrid.scss';

const ComicGrid = ({ comics }) => {
  return (
    <div className="comic-grid">
      {comics.map((comic, index) => (
        <ComicCard key={index} comic={comic} />
      ))}
    </div>
  );
};

export default ComicGrid;

