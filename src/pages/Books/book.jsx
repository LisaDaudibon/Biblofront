import React from 'react';

const BookDetails = ({ book, onCloseDetails }) => {
  return (
    <div className="book-details">
      <div className="book-details-content">
        <div id="booktitlebox">
          <h3 id="booktitle">{book.volumeInfo.title}</h3>
          <button id="book-close" onClick={onCloseDetails}>X</button></div>
          {book.volumeInfo.imageLinks && (
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
          )}
          <p><strong>Auteur: </strong>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
          <p className="book-infos">{book.volumeInfo.description}</p>
          {book.volumeInfo.pageCount && (
            <p className="book-infos">Pages: {book.volumeInfo.pageCount}</p>
          )}
          {book.volumeInfo.publishedDate && (
            <p className="book-infos">Publication: {book.volumeInfo.publishedDate}</p>
          )}
      </div>
    </div>
  );
};

export default BookDetails;
