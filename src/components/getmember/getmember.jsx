import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { loggedInAtom } from '../../atoms/loggedInAtom';
import Logout from '../logout/logout';
import './getmember.css';

function Getmember() {
  const usertoken = useAtomValue(userTokenAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [profilemail, setProfilemail] = useState("");
  const [profilpseudo, setProfilpseudo] = useState("");
  const [profilpassword, setProfilpassword] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setError ('');
    setSuccess('')
    const getprofile = async () => {
      try {

        const response = await fetch('http://localhost:3000/member-data', {
          method: 'GET',
          headers: {
          "Authorization": `${usertoken}`,
          "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfilemail(data.user.email)
          setProfilpseudo(data.user.pseudo);
          setProfilpassword(data.user.password)
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
    <div className='profilecard'>
      <h2 className='profiletitle'>Mon profil</h2>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <p id="profilecardtitle">Hello {profilpseudo} </p>
        <div id='profilecardinfo'>
          Email : {profilemail}
          <br></br>
          <br></br>
          Pseudo : {profilpseudo}
          <br></br>
          <br></br>
          Password : {profilpassword} ******
        </div>
        <br></br>
        <br></br>
        <div id='logout'><Logout /></div>
    </div>
  )
}

export default Getmember;