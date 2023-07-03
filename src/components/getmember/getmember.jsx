import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { loggedInAtom } from '../../atoms/loggedInAtom';
import ReadingList from '../readinglist/ReadingList';
import Logout from '../logout/logout';
import './getmember.css';

function Getmember() {
  const userToken = useAtomValue(userTokenAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [profileEmail, setProfilEmail] = useState("");
  const [profilePseudo, setProfilPseudo] = useState("");
  const [profilePassword, setProfilPassword] = useState("");
  const [error, setError] = useState('');

  useEffect(() => {
    setError ('');
    const getProfile = async () => {
      try {

        // const url = 'http://localhost:3000/member-data'
        const url = 'https://bibloback.fly.dev/member-data'

        const response = await fetch(url, {
          method: 'GET',
          headers: {
          "Authorization": `${userToken}`,
          "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfilEmail(data.user.email)
          setProfilPseudo(data.user.pseudo);
          setProfilPassword(data.user.password)
        }
      } catch (error) {
        setError("Le serveur est indisponible pour l'instant, veuillez essayer dans quelques instants ! ");
      }
    };
    if (loggedIn) {
    getProfile()} // Call the profile function to fetch the data

  }, [userToken, profileEmail]);


  return (
    <div id="getmembercontainer">
      <h1 className="profiletitle">Mon profil</h1>
      <div id="profile-container">
        <div className="profilecard">
          {error && <p>{error}</p>}
          <h2 id="profilecardtitle">Hello {profilePseudo} </h2>
          <div id="profilecardinfo">
            Email : {profileEmail}
            <br></br><br></br>
            Pseudo : {profilePseudo}
            <br></br><br></br>
            Password : {profilePassword} ******
            <br></br>
            <br></br>
            <span> Dans le cadre du RGPD, si tu souhaites supprimer ou </span><br></br>
            <span>modifier tes données, tu peux nous contacter ici : </span><br></br>
            <a href="mailto:bibliophilea@yopmail.com">bibliophilea@yopmail.com</a>
          </div>
          <br></br>
          <div id="logout"><Logout /></div>
        </div>
        <div id="readinglistcontainer">
          <h2 id="readinglisttitle">Ma liste de lecture</h2>
            <ReadingList />
        </div>
      </div>
    </div>
  )
}

export default Getmember;