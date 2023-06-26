import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { loggedInAtom } from '../../atoms/loggedInAtom';

function Getmember() {
  const usertoken = useAtomValue(userTokenAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [profilemail, setProfilemail] = useState("");
  const [profilpseudo, setProfilpseudo] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  useEffect(() => {
    setError ('');
    setSuccess('')
    const getprofile = async () => {
      console.log(usertoken)
      try {

        const response = await fetch('http://localhost:3000/member-data', {
          method: 'GET',
          headers: {
          "Authorization": `${usertoken}`,
          "Content-Type": "application/json",
          },
        });
        console.log(usertoken)
        if (response.ok) {
          const data = await response.json();
          setProfilemail(data.user.email)
          setProfilpseudo(data.user.pseudo);
        } else {
          setError('Erreur de récupération des données');
        }
      } catch (error) {
        setError('Erreur!');
      }
    };
    if (loggedIn) {
    getprofile()} // Call the profile function to fetch the data

  }, [usertoken, profilemail]);


  return (
    <div>
      <p>getmembers</p>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <p>Hello {profilpseudo} </p>
    </div>
  )
}

export default Getmember;