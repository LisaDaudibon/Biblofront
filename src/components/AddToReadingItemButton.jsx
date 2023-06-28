import React, { useEffect, useState, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { bookTitleAtom } from '../atoms/bookTitleAtom';
import { bookAuthorAtom } from '../atoms/bookAuthorAtom';
import { bookPublishedAtom } from '../atoms/bookPublishedAtom';
import { bookPagesAtom } from '../atoms/bookPagesAtom';
import { bookCategoryAtom } from '../atoms/bookCategoryAtom';
import { bookIdAtom } from '../atoms/bookIdAtom';
import { userIdAtom } from '../atoms/userIdAtom';

const AddToReadingItem = ({ ReadingItem }) => {
  const bookTitle = useAtomValue(bookTitleAtom)
  const bookAuthor = useAtomValue(bookAuthorAtom)
  const bookPublishedDate = useAtomValue(bookPublishedAtom)
  const bookPages = useAtomValue(bookPagesAtom)
  const bookCategory = useAtomValue(bookCategoryAtom)
  const userid = useAtomValue(userIdAtom)
  const bookId = useAtomValue(bookIdAtom)
  const setbookId = useSetAtom(bookIdAtom)


  // const [bookId, setbookId] = useState('');  
  const [bookData, setBookData] = useState({ titles: [], ids: [] });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    };

    console.log("is only running once")
    const getBookDatabase = async () => {

      try {

        const response = await fetch('https://bibloback.fly.dev/books', {
          method: 'GET',
          headers: {
          "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const titles = data.map(book => book.title);
          const ids = data.map(book => book.id);

          setBookData({ titles, ids });
        } else {
          setError('Erreur de récupération des données');
        }
      } catch (error) {
        setError('Erreur!');
      }
    };

    const getBookId = () => {
      const { titles, ids } = bookData;
      const index = titles.findIndex(title => title === bookTitle);
      if (index !== -1) {
        setbookId(ids[index]);
      }
    };

      getBookDatabase();
      getBookId();  

    }, [bookTitle]);

console.log(bookData)
    useEffect(() => {
      console.log(bookId);
    }, [bookId]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      setError('');
      setSuccess('');

      if (bookId === null) {
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
                category: bookCategory
              }
            }),
          });

          if (bookResponse.ok) {
            const bookData = await bookResponse.json();
            const newBookId = bookData.book.id; // Set the desired book ID here
            setbookId(newBookId);
            setSuccess('Book saved'); // Set success flash message
  
            handleSubmit(event);
            return;
          } else {
            setError('Error saving book');
            return;
          }
        } catch (error) {
          setError('Error saving book');
        }
      }
    
      try {
        const readingItemResponse = await fetch('https://bibloback.fly.dev/reading_items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reading_item: {
              read: false,
              book_id: bookId === null ? 2 : bookId,
              reading_list_id: userid
            }
          }),
        });
    
        if (readingItemResponse.ok) {
          setSuccess('Reading item saved'); // Set success flash message
        } else {
          setError('Error saving reading item');
        }
      } catch (error) {
        setError('Error saving reading item');
      }
    };

     return(
      <div>
        <button href="/books" onClick={handleSubmit}>Ajouter</button>
      </div>
     )
   }

export default AddToReadingItem;