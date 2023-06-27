import React from 'react';

const BookDetails = ({ book, onCloseDetails }) => {
  return (
    <div className="book-details">
      <div className="book-details-content">
        <h3>{book.volumeInfo.title}</h3>
        {book.volumeInfo.imageLinks && (
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
        )}
        <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
        <p>{book.volumeInfo.description}</p>
        <button onClick={onCloseDetails}>Close</button>
      </div>
    </div>
  );
};

export default BookDetails;
