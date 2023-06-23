import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import '../pages/Books/books.css';

const BooksSearch = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const REACT_APP_API_KEY = 'AIzaSyBoB6wZ0fqhwPsVGDe6QQZ6sDyFjZ5y4Hc';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm);

        if (sanitizedSearchTerm.trim().length === 0) {
          setBooks([]);
          return;
        }

        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(sanitizedSearchTerm)}&key=${REACT_APP_API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          setBooks(data.items);
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

  return (
    <div>
      <h2>Book Search</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Enter a book title or keyword"
          className="search-input-left"
        />
        <button type="submit" className="rounded-button-right">
          Rechercher
        </button>
      </form>

      <h2>Les petits trésors cachés:</h2>
      <div className="container">
        {books
          .filter((book) => book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail)
          .map((book) => (
            <div className="card" key={book.id}>
              <div className="card-content">
                <h3>{book.volumeInfo.title}</h3>
                {book.volumeInfo.imageLinks && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                  />
                )}
                <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
                <p className="description">
                  {book.volumeInfo.description && book.volumeInfo.description.length > 250
                    ? `${book.volumeInfo.description.slice(0, 250)}...`
                    : book.volumeInfo.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BooksSearch;
