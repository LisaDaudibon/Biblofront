import React, { useEffect, useState } from 'react';

const BookFilter = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onFilter(category);
  };

  return (
    <div>
      <h2>Books by Category</h2>

      <div className="category-buttons">
        {categories.map((button) => (
          <button
            key={button.category}
            className={selectedCategory === button.category ? 'selected' : ''}
            onClick={() => handleCategoryClick(button.category)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const BooksCategories = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const REACT_APP_API_KEY = 'AIzaSyBoB6wZ0fqhwPsVGDe6QQZ6sDyFjZ5y4Hc';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let apiUrl = `https://www.googleapis.com/books/v1/volumes?key=${REACT_APP_API_KEY}`;

        if (selectedCategory) {
          apiUrl += `&q=subject:${encodeURIComponent(selectedCategory)}`;
        }

        if (searchQuery) {
          apiUrl += `&q=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(apiUrl);

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
  }, [selectedCategory, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const categoryButtons = [
    { category: 'fiction', label: 'Fiction' },
    { category: 'science fiction', label: 'Science Fiction' },
    { category: 'mystery', label: 'Mystery' },
    { category: 'romance', label: 'Romance' },
  ];

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <BookFilter categories={categoryButtons} onFilter={handleFilter} />

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
