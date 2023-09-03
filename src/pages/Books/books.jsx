import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import './books.css';
import BookDetails from './book';
import { useSetAtom } from 'jotai';
import { bookIdAtom } from '../../atoms/bookIdAtom';
import { bookTitleAtom, bookPublishedAtom, bookAuthorAtom, bookCategoryAtom, bookPagesAtom, bookCountAtom } from '../../atoms/bookAtom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const setbookId = useSetAtom(bookIdAtom)
  const setbookTitle = useSetAtom(bookTitleAtom)
  const setpublishedDate = useSetAtom(bookPublishedAtom)
  const setAuthor = useSetAtom(bookAuthorAtom)
  const setCategory = useSetAtom(bookCategoryAtom)
  const setPages = useSetAtom(bookPagesAtom)
  const setBookCount = useSetAtom(bookCountAtom);

  const resetBookinfos = () => {
    setbookId(null);
    setbookTitle(null)
    setpublishedDate(null)
    setAuthor(null)
    setCategory(null)
    setPages(null)
    setBookCount(null)
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const sanitizedSearchTerm = DOMPurify.sanitize(searchTerm);

        if (sanitizedSearchTerm.trim().length === 0) {
          setBooks([]);
          return;
        }
        const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

        // const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        //   sanitizedSearchTerm
        // )}&key=${config.ApiKey}&maxResults=40`;

        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          sanitizedSearchTerm
        )}&key=${apiKey}&maxResults=40`;

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

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
    resetBookinfos(null);
  };

  const renderBooks = () => {
    return (
      <div className="books-container">
        {books
          .filter(
            (book) =>
              book.volumeInfo &&
              book.volumeInfo.imageLinks &&
              book.volumeInfo.imageLinks.thumbnail
          )
          .map((book) => (
            <div
              className="books-card"
              key={book.id}
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
      <h2>Cherche tes livres favoris !</h2>
      <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Entrer votre recherche"
            className="search-input-left"
          />
          <button type="submit" className="rounded-button-right">
            Search
          </button>
        </form>
      </div>

      {renderBooks()}

      {selectedBook && (
        <div className="popup">
          <BookDetails book={selectedBook} onCloseDetails={handleCloseDetails} resetBookinfos={resetBookinfos}/>
        </div>
      )}
    </div>
  );
};

export default Books;
