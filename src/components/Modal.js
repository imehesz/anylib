// src/components/Modal.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Modal.scss';

const Modal = ({ comic, onClose }) => {
  const { title, artist, date, pages, genre, summary, notes, coverImg } = comic;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <img src={coverImg} alt={title} />
        <p><strong>Artist:</strong> {artist}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Pages:</strong> {pages}</p>
        <p><strong>Genre:</strong> {genre}</p>
        <div>
          <strong>Summary:</strong>
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
        <div>
          <strong>Notes:</strong>
          <ReactMarkdown>{notes}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Modal;

