import { useEffect, useState, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { bookTitleAtom, bookPublishedAtom, bookCountAtom, bookAuthorAtom, bookCategoryAtom, bookPagesAtom } from '../atoms/bookAtom';
import { bookIdAtom } from '../atoms/bookIdAtom';
import { userIdAtom } from '../atoms/userIdAtom';
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

const AddToReadingItem = ({ ReadingItem }) => {
  const bookTitle = useAtomValue(bookTitleAtom);
  const bookAuthor = useAtomValue(bookAuthorAtom);
  const bookPublishedDate = useAtomValue(bookPublishedAtom);
  const bookPages = useAtomValue(bookPagesAtom);
  const bookCategory = useAtomValue(bookCategoryAtom);
  const userid = useAtomValue(userIdAtom);
  const bookId = useAtomValue(bookIdAtom);
  const setbookId = useSetAtom(bookIdAtom);
  const bookcount = useAtomValue(bookCountAtom);
  const setbookCount = useSetAtom(bookCountAtom)

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
      try {
        const response = await fetch('https://bibloback.fly.dev/books', {
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
    getBookId(bookData, bookTitle, setbookId);
  }, [bookData, bookTitle, setbookId]);

  const createReadingItem = async () => {
    try {
      const readingItemResponse = await fetch('https://bibloback.fly.dev/reading_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reading_item: {
            read: false,
            book_id: bookId === null ? bookcount : bookId,
            reading_list_id: userid,
          },
        }),
      });

      if (readingItemResponse.ok) {
        setSuccess('Reading item saved');
      } else {
        setError('Error saving reading item');
      }
    } catch (error) {
      setError('Error saving reading item');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (bookId === null) {
      setbookCount((prevCount) => prevCount + 1);
    }

    if (bookId === null) {
      setLoading(true);
      try {
        const bookResponse = await fetch('https://bibloback.fly.dev/books', {
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
          const bookData = await bookResponse.json();
          const newBookId = bookcount;
          setbookId(newBookId);
          setSuccess('Book saved');
          createReadingItem(); // Create reading item after book is saved
        } else {
          setError('Error saving book');
        }
      } catch (error) {
        setError('Error saving book');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      createReadingItem(); // Create reading item directly if bookId exists
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <button id="addtori" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Loading...' : 'Ajouter'}
      </button>
    </div>
  );
};

export default AddToReadingItem;