import React, { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../atoms/loggedInAtom';
import { userIdAtom } from '../atoms/userIdAtom';

const ReadingList = () => {
  const loggedIn = useAtomValue(loggedInAtom);
  const userId = useAtomValue(userIdAtom);
  const [readingItems, setReadingItems] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchReadingItems = async () => {
      try {
        if (!loggedIn || !userId) {
          setReadingItems([]);
          return;
        }

        const url = `http://bibloback.fly.dev/users/${userId}/reading_items`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include any required authentication headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReadingItems(data);
        } else {
          console.error('Error fetching reading items');
        }
      } catch (error) {
        console.error('Error fetching reading items:', error);
      }
    };

    fetchReadingItems();
  }, [userId, loggedIn]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookIds = readingItems.map((item) => item.book_id);

        const url = `http://bibloback.fly.dev/books?ids=${bookIds.join(',')}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include any required authentication headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error('Error fetching books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [readingItems]);

  return (
    <div>
      <h2>Reading List:</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingList;
