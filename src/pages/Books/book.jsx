import React, { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { bookTitleAtom } from '../../atoms/bookTitleAtom';
import { bookAuthorAtom } from '../../atoms/bookAuthorAtom';
import { bookPublishedAtom } from '../../atoms/bookPublishedAtom';
import { bookPagesAtom } from '../../atoms/bookPagesAtom';
import { bookCategoryAtom } from '../../atoms/bookCategoryAtom';


const BookDetails = ({ book, onCloseDetails }) => {
  const bookTitle = useAtomValue(bookTitleAtom)
  const setBookTitle = useSetAtom(bookTitleAtom);
  const bookAuthor = useAtomValue(bookAuthorAtom)
  const setBookAuthor = useSetAtom(bookAuthorAtom);
  const bookPublishedDate = useAtomValue(bookPublishedAtom)
  const setBookPublished = useSetAtom(bookPublishedAtom);
  const bookPages = useAtomValue(bookPagesAtom)
  const setBookPages = useSetAtom(bookPagesAtom);
  const bookCategory = useAtomValue(bookCategoryAtom)
  const setBookCategory = useSetAtom(bookCategoryAtom);



  useEffect(() => {
    const setBookInfo = (book) => {
      setBookTitle(book.volumeInfo.title);
      setBookAuthor(book.volumeInfo.authors);
      setBookPublished(book.volumeInfo.publishedDate);
      setBookPages(book.volumeInfo.pageCount);
      setBookCategory(book.volumeInfo.categories && book.volumeInfo.categories[0]);

    };

    setBookInfo(book);
  }, [ bookTitle,bookAuthor,bookPublishedDate,bookPages,bookCategory ]);

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
        {book.volumeInfo.categories &&(
          <p>Genre: {book.volumeInfo.categories}</p>
        )
        
        }
        <button onClick={onCloseDetails}>Close</button>
      </div>
    </div>
  );
};

export default BookDetails;
