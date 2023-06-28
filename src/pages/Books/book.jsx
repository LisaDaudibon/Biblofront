import React, { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { bookTitleAtom } from '../../atoms/bookTitleAtom';
import { bookAuthorAtom } from '../../atoms/bookAuthorAtom';

const BookDetails = ({ book, onCloseDetails }) => {
  const bookTitle = useAtomValue(bookTitleAtom)
  const setBookTitle = useSetAtom(bookTitleAtom);
  const bookAuthor = useAtomValue(bookAuthorAtom)
  const setBookAuthor = useSetAtom(bookAuthorAtom);
  useEffect(() => {
    const setBookInfo = (book) => {
      setBookTitle(book.volumeInfo.title);
      setBookAuthor(book.volumeInfo.authors);

    };

    setBookInfo(book);
  }, [book, bookTitle,bookAuthor]);

  return (
    <div className="book-details">
      <div className="book-details-content">
        <h3>{bookTitle}</h3>
        {book.volumeInfo.imageLinks && (
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={bookTitle} />
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
