import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { bookTitleAtom } from '../atoms/bookTitleAtom';
import { bookAuthorAtom } from '../atoms/bookAuthorAtom';
import { bookPublishedAtom } from '../atoms/bookPublishedAtom';
import { bookPagesAtom } from '../atoms/bookPagesAtom';
import { bookCategoryAtom } from '../atoms/bookCategoryAtom';
import { userIdAtom } from '../atoms/userIdAtom';

const AddToReadingItem = ({ ReadingItem }) => {
  const bookTitle = useAtomValue(bookTitleAtom)
  const bookAuthor = useAtomValue(bookAuthorAtom)
  const bookPublishedDate = useAtomValue(bookPublishedAtom)
  const bookPages = useAtomValue(bookPagesAtom)
  const bookCategory = useAtomValue(bookCategoryAtom)
  const userid = useAtomValue(userIdAtom)

  const [bookId, setbookId] = useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://bibloback.fly.dev/books', {
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

      if (response.ok) {
        // const responseData = await response.json();
        // console.log(responseData)
        // setbookId(responseData.book.id)


        setSuccess('Livre enregistré'); // Set success flash message
      } else {
        setError("Erreur lors de l'enregistrement du compte");
      }
    } catch (error) {
      setError('Erreur lors de la création du compte');
    }
    console.log(bookId)
    try {
      const response = await fetch('https://bibloback.fly.dev/reading_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "reading_item":{
            "read": false,
            "book_id":1,
            "reading_list_id": userid}
        }),
      });

      if (response.ok) {
        // const responseData = await response.json();

        setSuccess('Livre enregistré'); // Set success flash message
      } else {
        setError("Erreur lors de l'enregistrement du compte");
      }
    } catch (error) {
      setError('Erreur lors de la création du compte');
    }
  };

     return(
      <div>
        <button href="/books" onClick={handleSubmit}>Ajouter</button>
      </div>
     )
   }

export default AddToReadingItem;