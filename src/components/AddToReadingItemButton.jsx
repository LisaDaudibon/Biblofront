import { useEffect, useState, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { bookTitleAtom, bookPublishedAtom, bookCountAtom, bookAuthorAtom, bookCategoryAtom, bookPagesAtom } from '../atoms/bookAtom';
import { bookIdAtom } from '../atoms/bookIdAtom';
import { userIdAtom } from '../atoms/userIdAtom';
import { loggedInAtom } from '../atoms/loggedInAtom';
import { Link } from 'react-router-dom';
import '../pages/Books/books.css';

const getBookId = (bookData, bookTitle, setbookId) => {
  if (bookData) {
    const { titles, ids } = bookData;
    const index = titles.findIndex((title) => title === bookTitle);
    if (index !== -1) {
      setbookId(ids[index]);
    }
  }
};

const AddToReadingItem = () => {
  const bookTitle = useAtomValue(bookTitleAtom);
  const bookAuthor = useAtomValue(bookAuthorAtom);
  const bookPublishedDate = useAtomValue(bookPublishedAtom);
  const bookPages = useAtomValue(bookPagesAtom);
  const bookCategory = useAtomValue(bookCategoryAtom);
  const userId = useAtomValue(userIdAtom);
  const bookId = useAtomValue(bookIdAtom);
  const setBookId = useSetAtom(bookIdAtom);
  const bookCount = useAtomValue(bookCountAtom);
  const setBookCount = useSetAtom(bookCountAtom);
  const loggedIn = useAtomValue(loggedInAtom)

  const [bookData, setBookData] = useState({ titles: [], ids: [] });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isFirstRender = useRef(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLoading(true);
    const getBookDatabase = async () => {

      // const url = 'http://localhost:3000/books'
      const url = 'https://bibloback.fly.dev/books'

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const titles = data.map((book) => book.title);
          const ids = data.map((book) => book.id);

          setBookData({ titles, ids });

        } else {
          setError('Erreur de récupération des données');
        }
      } catch (error) {
        setError('Erreur!');
      } finally {
        setLoading(false);
      }
    };

    getBookDatabase();
  }, [bookTitle]);

  useEffect(() => {
    getBookId(bookData, bookTitle, setBookId);
  }, [bookData, bookTitle, setBookId]);

  const createReadingItem = async () => {

    // const url = 'http://localhost:3000/reading_items'
    const url = 'https://bibloback.fly.dev/reading_items'

    try {
      const readingItemResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reading_item: {
            read: false,
            book_id: bookId === null ? bookCount : bookId,
            reading_list_id: userId,
          },
        }),
      });

      if (readingItemResponse.ok) {
        setSuccess("Livre sauvegardé dans ta liste de lecture !");
      } else {
        setError("Erreur lors de l'enregistrement dans la base de données");
      }
    } catch (error) {
      setError("Le serveur n'est pas accessible pour le moment, veuillez essayer dans quelques instants !");
    } finally {
      setLoading(false);
    }
  };

  const onClick = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (bookId === null) {
      setBookCount((prevCount) => prevCount + 1);
    }

    // const url = 'http://localhost:3000/books
    const url = 'https://bibloback.fly.dev/books'

    if (bookId === null) {
      setLoading(true);
      try {
        const bookResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            book: {
              title: bookTitle,
              author: bookAuthor,
              pages: bookPages,
              published_date: bookPublishedDate,
              category: bookCategory,
            },
          }),
        });

        if (bookResponse.ok) {
          // const bookData = await bookResponse.json();
          const newBookId = bookCount;
          setBookId(newBookId);
          setSuccess('Livre enregistré')
          createReadingItem(); // Create reading item after book is saved
        } else {
          setError("Les données sont incorrectes! Veuillez essayer dans quelques instants");
        }
      } catch (error) {
        setError("Le serveur n'est pas accessible pour le moment, veuillez essayer dans quelques instants !");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      createReadingItem(); // Create reading item directly if bookId exists
    }
  };

  const isBookInReadingList = () => {
    return bookId !== null && bookData.ids.includes(bookId);
  };

  return (
    <div>
      { loggedIn ? (
        <>
      <button className="addtori" onClick={onClick} disabled={loading || isBookInReadingList(bookId)}>
        {loading ? 'Loading...' : 'Ajouter'}
      </button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      {isBookInReadingList() && <p>Ce livre est déjà dans votre liste de lecture !</p>}</>
      ) : (
        <>
        <Link to="/users/sign_in" role="button" className="addtori button">Ajouter</Link>
        </>
      )}
    </div>
  );
};

export default AddToReadingItem;