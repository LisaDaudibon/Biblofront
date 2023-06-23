import React, { useEffect, useState } from 'react';
import '../pages/Books/books.css';

const BooksCategories = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const REACT_APP_API_KEY = 'AIzaSyBoB6wZ0fqhwPsVGDe6QQZ6sDyFjZ5y4Hc';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (selectedCategory === '') {
          setBooks([]);
          return;
        }

        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
            selectedCategory
          )}&key=${REACT_APP_API_KEY}`
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
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const categoryButtons = [
    { category: 'fiction', label: 'Fiction' },
    { category: 'science fiction', label: 'Science Fiction' },
    { category: 'mystery', label: 'Mystery' },
    { category: 'romance', label: 'Romance' },
    // Add more category buttons here
  ];

  return (
    <div>
      <h2></h2>

      <div className="category-buttons">
        {categoryButtons.map((button) => (
          <button
            key={button.category}
            className={selectedCategory === button.category ? 'selected' : ''}
            onClick={() => handleCategoryClick(button.category)}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="container">
        {books.map((book) => (
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

export default BooksCategories;
