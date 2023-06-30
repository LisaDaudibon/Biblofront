import { useState, useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../atoms/loggedInAtom';
import { userIdAtom } from '../../atoms/userIdAtom';
import './readingliststyle.css';

const ReadingList = () => {
  const loggedIn = useAtomValue(loggedInAtom);
  const userId = useAtomValue(userIdAtom);
  const [books, setBooks] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchReadinglist = async () => {
      try {
        if (!loggedIn || !userId) {
          setBooks([]);
          return;
        }

        const url = `https://bibloback.fly.dev/reading_lists/${userId}/books`;
        // const url = `http://localhost::3000/reading_lists/${userId}/books`

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
              throw new Error("Nous ne pouvons accéder à la base de donnée ! Veuillez nous excuser pour la gêne occasionnée");
            }
          })
          .then(data => {
            const { books } = data;
            console.log(books);
            setBooks(books);
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des données !", error);
          });
      } catch (error) {
        console.error("Le serveur n'est pas accessible pour le moment, veuillez essayer dans quelques instants !", error);
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
