import React, { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { bookTitleAtom } from '../atoms/bookTitleAtom';
import { bookAuthorAtom } from '../atoms/bookAuthorAtom';
import { bookPublishedAtom } from '../atoms/bookPublishedAtom';
import { bookPagesAtom } from '../atoms/bookPagesAtom';
import { bookCategoryAtom } from '../atoms/bookCategoryAtom';

const AddToReadingItem = ({ ReadingItem }) => {
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
            title: title,
            author: author,
            description: description,
            image_url: image_url,
            pages: pages,
            published_date: published_date,
            category: category,
          }
        }),
      });

      if (response.ok) {
        const token = await response.headers.get("Authorization");
        setUsertoken(token);
        const responseData = await response.json();
        setUserid(responseData.user.id);

        setSuccess('Compte créé avec succès!'); // Set success flash message
      } else {
        setError("Erreur lors de l'enregistrement du compte");
      }
    } catch (error) {
      setError('Erreur lors de la création du compte');
    }
    // <disconnectUser /> aller chercher le code dans la branche getmembers, code à retravailler
  };

     return(

     )

   }