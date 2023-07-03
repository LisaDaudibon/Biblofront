import { useEffect, useState } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { bookTitleAtom, bookPublishedAtom, bookAuthorAtom, bookCategoryAtom, bookPagesAtom, bookCountAtom } from '../../atoms/bookAtom';
import AddToReadingItem from '../../components/AddToReadingItemButton';
import { loggedInAtom } from '../../atoms/loggedInAtom';

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
  const bookCount = useAtomValue(bookCountAtom)
  const setBookCount = useSetAtom(bookCountAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [setError] = useState('');

  useEffect(() => {
    const setBookInfo = (book) => {
      setBookTitle(book.volumeInfo.title);
      setBookAuthor(book.volumeInfo.authors && book.volumeInfo.authors[0] || 'Non précisé');
      setBookPublished(book.volumeInfo.publishedDate || 'non précisé');
      setBookPages(book.volumeInfo.pageCount || 100);
      setBookCategory(book.volumeInfo.categories && book.volumeInfo.categories[0] || "Autre");
    };

    const getCount = async () => {
      try {

        const url = 'https://bibloback.fly.dev/books'
        // const url = 'http://localhost:3000/books'

        const response = await fetch(url, {
          method: 'GET',
          headers: {
          "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const last = data.length
          setBookCount(last)
        } else {
          setError('Erreur de récupération des données');
        }
      } catch (error) {
        setError('Erreur!');
      }
    };
    if (loggedIn) {
    getCount() }

    setBookInfo(book);
  }, [ bookTitle, bookAuthor, bookPublishedDate, bookPages, bookCategory, bookCount, loggedIn ]);

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
