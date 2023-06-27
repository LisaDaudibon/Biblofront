import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import '../Books/books.css';
import BookDetails from './book';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);

  const REACT_APP_API_KEY = 'AIzaSyBw9dOsg8QRJ0FtafUZ29mSbpsdg7nNAoY';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm);

        if (sanitizedSearchTerm.trim().length === 0) {
          setBooks([]);
          return;
        }

        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          sanitizedSearchTerm
        )}&key=${REACT_APP_API_KEY}&maxResults=40`;

        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setBooks(data.items || []);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();

    const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm);

    setSearchTerm(sanitizedSearchTerm);
  };

  const handleBookHover = (book) => {
    setHoveredBook(book);
  };

 const handleBookClick = (book) => {
  setSelectedBook(book);
};


  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  const renderBooks = () => {
    return (
      <div className="container">
        {books
          .filter(
            (book) =>
              book.volumeInfo &&
              book.volumeInfo.imageLinks &&
              book.volumeInfo.imageLinks.thumbnail
          )
          .map((book) => (
            <div
              className="card"
              key={book.id}
              onMouseEnter={() => handleBookHover(book)}
              onMouseLeave={() => setHoveredBook(null)}
              onClick={() => handleBookClick(book)}
            >
              <div className="card-content">
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                />
                <h3>{book.volumeInfo.title}</h3>
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="page-container">
      <h2>Book Search</h2>
      <div className="navbar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Enter a book title or keyword"
            className="search-input-left"
          />
          <button type="submit" className="rounded-button-right">
            Search
          </button>
        </form>
      </div>

      <h2>Search Results:</h2>
      {renderBooks()}

      {selectedBook && (
        <div className="popup">
          <BookDetails book={selectedBook} onCloseDetails={handleCloseDetails} />
        </div>
      )}
    </div>
  );
};

export default Books;
