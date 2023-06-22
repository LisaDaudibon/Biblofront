import React, { useEffect, useState } from 'react';
// import dotenv from 'dotenv';
import './books.css'
// dotenv.config();

const BooksSearch = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

const REACT_APP_API_KEY = 'AIzaSyBoB6wZ0fqhwPsVGDe6QQZ6sDyFjZ5y4Hc'
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${REACT_APP_API_KEY}`
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
    fetchBooks();
  };

  return (
    <div>
      <h2>Book Search</h2>
      <form onSubmit={handleSearch} class="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Enter a book title or keyword"
          class="search-input-left"/>
        <button type="submit" class="rounded-button-right">Rechercher</button>
      </form>

      <h2>Les petits trésors cachés:</h2>
      <div className="container">
        {books.map((book) => (
          <div className="card" key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
            <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
            <p className="description">
              {book.volumeInfo.description && book.volumeInfo.description.length > 150
                ? `${book.volumeInfo.description.slice(0, 150)}...`
                : book.volumeInfo.description}
           </p>  
          </div>
        ))}
      </div>
    </div>
);

};

export default BooksSearch;
