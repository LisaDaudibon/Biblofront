import React from 'react';

const BookDetails = ({ book, onCloseDetails }) => {
  return (
    <div className="book-details">
      <div className="book-details-content">
        <h3>{book.volumeInfo.title}</h3>
        {book.volumeInfo.imageLinks && (
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
        )}
        <p>Auteur: {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
        <p>{book.volumeInfo.description}</p>
        {book.volumeInfo.pageCount && (
          <p>Pages: {book.volumeInfo.pageCount}</p>
        )}
        {book.volumeInfo.publishedDate && (
          <p>Publication: {book.volumeInfo.publishedDate}</p>
        )}
        <button onClick={onCloseDetails}>Close</button>
      </div>
    </div>
  );
};

export default BookDetails;
