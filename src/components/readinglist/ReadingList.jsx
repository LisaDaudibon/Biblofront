import { useState, useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../atoms/loggedInAtom';
import { userIdAtom } from '../../atoms/userIdAtom';
import '../../pages/Books/books.css'


const ReadingList = () => {
  const loggedIn = useAtomValue(loggedInAtom);
  const userId = useAtomValue(userIdAtom);
  const [ books, setBooks ] = useState([]);
  const isFirstRender = useRef(true);
  const [isBookDeleted, setIsBookDeleted] = useState(false);

  const [ error, setError ] = useState('')

  useEffect(() => {
    const fetchReadinglist = async () => {
      try {
        if (!loggedIn || !userId) {
          setBooks([]);
          return;
        }

        // const url = `https://bibloback.fly.dev/reading_lists/${userId}/books`;
        const url = `http://localhost:3000/reading_lists/${userId}/books`

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


  const handleClick = async (event, bookId) => {
    event.preventDefault();

    // const selectedBook = books.find(book => book.id === bookId);

    const url = `http://localhost:3000/reading_lists/${userId}/remove_book/${bookId}`;
    // const url = `https://bibloback.fly.dev/${userid}/remove_book/${bookId}`;

    try {
      const deletebook = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (deletebook.ok) {
        // Book deleted successfully
        // Update the books state by filtering out the deleted book
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        setIsBookDeleted(true);
        setSuccess('Livre supprimé de ta liste de lecture !');
      } else {
        setError("Je n'ai pas réussi à supprimer le livre ! Veuillez essayer dans quelques instants");
      }
    } catch (error) {
      setError("Le serveur n'est pas accessible pour le moment, veuillez essayer dans quelques instants !");
    }
  };


  return (
    <div id="readinglistinfo">
      <ul>
        {/* Iterate over the 'books' array and render the titles */}
        {books.length > 0 ? (
          books.map(book => (
            <li key={book.id}>
              <div id="booktitlerl"> {book.title}</div>
              <button id="deletebookfromrl" onClick={event => handleClick(event, book.id)}>
                  <strong>Supprimer</strong>
                </button>
            </li>
          ))
        ) : (
          <li>No books found.</li>
        )}
      </ul>
    </div>
  );
};

export default ReadingList;
