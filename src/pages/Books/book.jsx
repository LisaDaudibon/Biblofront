import { useEffect, useState, useRef } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { bookTitleAtom, bookPublishedAtom, bookAuthorAtom, bookCategoryAtom, bookPagesAtom } from '../../atoms/bookAtom';
import AddToReadingItem from '../../components/AddToReadingItemButton';

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
      setBookAuthor(book.volumeInfo.authors && book.volumeInfo.authors[0]);
      setBookPublished(book.volumeInfo.publishedDate);
      setBookPages(book.volumeInfo.pageCount);
      setBookCategory(book.volumeInfo.categories && book.volumeInfo.categories[0]);
    };

    setBookInfo(book);
  }, [ bookTitle, bookAuthor, bookPublishedDate, bookPages, bookCategory ]);

  return (
    <div className="book-details">
      <div className="book-details-content">
        <div id="booktitlebox">
          <h3 id="booktitle">{bookTitle}</h3>
          <AddToReadingItem />
          <button id="book-close" onClick={onCloseDetails}>X</button></div>
          {book.volumeInfo.imageLinks && (
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={bookTitle} />
          )}
          <p><strong>Auteur: </strong>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
          <p className="book-infos">{book.volumeInfo.description}</p>
          {book.volumeInfo.pageCount && (
            <p className="book-infos">Pages: {book.volumeInfo.pageCount}</p>
          )}
          {book.volumeInfo.publishedDate && (
            <p className="book-infos">Publication: {book.volumeInfo.publishedDate}</p>
          )}
        {book.volumeInfo.categories &&(
          <p className="book-infos">Genre: {book.volumeInfo.categories}</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
