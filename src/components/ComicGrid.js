// src/components/ComicGrid.js
import React from 'react';
import ComicCard from './ComicCard';
import './ComicGrid.scss';

const ComicGrid = ({ comics }) => {
  // Step 1: Filter out comics without titles
  const comicsWithTitles = comics.filter((comic) => comic.title && comic.title.trim() !== '');

  // Step 2: Sort the comics array by title
  const sortedComics = [...comicsWithTitles].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return titleA.localeCompare(titleB);
  });

  // Step 3: Group comics by the first letter of their title
  const groupedComics = sortedComics.reduce((groups, comic) => {
    const title = comic.title || '';
    let firstLetter = title.charAt(0).toUpperCase();

    // Handle non-alphabetic characters
    if (!/^[A-Z]$/.test(firstLetter)) {
      firstLetter = '#'; // Group non-alphabetic titles under '#'
    }

    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(comic);
    return groups;
  }, {});

  // Step 4: Get the letters in sorted order
  const sortedLetters = Object.keys(groupedComics).sort();

  // Move the '#' group to the end (or beginning) of the sorted letters array
  if (sortedLetters.includes('#')) {
    sortedLetters.splice(sortedLetters.indexOf('#'), 1);
    sortedLetters.push('#'); // Use unshift('#') if you prefer it at the beginning
  }

  return (
    <div className="comic-grid">
      {sortedLetters.map((letter) => (
        <div key={letter} className="comic-group">
          <h2 className="group-title">--- {letter} ---</h2>
          <div className="group-content">
            {groupedComics[letter].map((comic, index) => (
              <ComicCard key={comic.id || index} comic={comic} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComicGrid