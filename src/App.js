// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchSheetData } from './api/fetchData';
import ComicGrid from './components/ComicGrid';
import './App.scss';

function App() {
  const [comics, setComics] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');
  const [itemsToShow, setItemsToShow] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const getData = async () => {
      try {
        const comicsData = await fetchSheetData(); // Data is already in the correct format
        setComics(comicsData);
        setFilteredComics(comicsData.slice(0, itemsToShow));
        setError(false); // Reset error state in case of previous errors
      } catch (err) {
        console.error('Error in getData:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [itemsToShow]);

  // Handle search
  useEffect(() => {
    const results = comics.filter((comic) =>
      Object.values(comic).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredComics(results.slice(0, itemsToShow));
  }, [searchTerm, comics, itemsToShow]);

  // Infinite scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setItemsToShow((prev) => prev + 20);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme toggle
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Couldn't load comicbook info</div>;

  return (
    <div className={`App ${theme}`}>
      <header>
        <input
          type="text"
          placeholder="Search comics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </header>
      <ComicGrid comics={filteredComics} />
    </div>
  );
}

export default App;

