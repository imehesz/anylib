// src/components/ComicCard.js
import React, { useState } from 'react';
import Modal from './Modal';
import './ComicCard.scss';

const ComicCard = ({ comic }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => setIsModalOpen(true);

  return (
    <>
      <div className="comic-card" onClick={handleClick}>
        <img src={comic.coverImg} alt={comic.title} />
        <h3>{comic.title}</h3>
      </div>
      {isModalOpen && <Modal comic={comic} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ComicCard;

