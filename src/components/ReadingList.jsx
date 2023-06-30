import { useState, useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../atoms/loggedInAtom';
import { userIdAtom } from '../atoms/userIdAtom';

const ReadingList = () => {
  const loggedIn = useAtomValue(loggedInAtom);
  const userId = useAtomValue(userIdAtom);
  const [readingItems, setReadingItems] = useState('');
  const [books, setBooks] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchReadinglist = async () => {
      try {
        if (!loggedIn || !userId) {
          setBooks([]);
          return;
        }

        const url = `http://bibloback.fly.dev/reading_lists/${userId}/books`;

        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include any required authentication headers
          },
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error fetching reading items');
            }
          })
          .then(data => {
            const { books } = data;
            console.log(books);
            setBooks(books);
          })
          .catch(error => {
            console.error('Error fetching reading items:', error);
          });
      } catch (error) {
        console.error('Error fetching reading items:', error);
      }
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchReadinglist();
  }, [loggedIn, userId]);


  return (
    <div>
      <h2>Reading List:</h2>
      <ul>
        {/* Iterate over the 'books' array and render the titles */}
        {books.length > 0 ? (
          books.map((book, index) => (
            <li key={index}>{book.title}</li>
          ))
        ) : (
          <li>No books found.</li>
        )}
      </ul>
    </div>
  );
};

export default ReadingList;
