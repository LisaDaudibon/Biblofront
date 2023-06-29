import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { loggedInAtom } from '../../atoms/loggedInAtom';
import Logout from '../logout/logout';
import './getmember.css';
import Editmemberbutton from './editmemberbutton';

function Getmember() {
  const usertoken = useAtomValue(userTokenAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [profilemail, setProfilemail] = useState("");
  const [profilpseudo, setProfilpseudo] = useState("");
  const [profilpassword, setProfilpassword] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [editemail, setEditemail] = useState('');
  const [editpseudo, setEditpseudo]= useState('');
  const [editpassword, setEditpassword]=useState('');
  const [iseditingemail, setisEditingemail] = useState(false);

  useEffect(() => {
    setError ('');
    setSuccess('')
    const getprofile = async () => {
      try {

        const response = await fetch('https://bibloback.fly.dev/member-data', {
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

  // useEffect(() => {
  //   setisEditingemail(true)
  // })

  const toggleeditbutton = () => {
    if (iseditingemail === true) {
      setisEditingemail(false);
      return;
    } else {
      setisEditingemail(true);
      return;
    }
  }

  // const editmemberbutton = () => {


  //   return()
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://bibloback.fly.dev/users/${userid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${usertoken}`,
        },
        body: JSON.stringify({
          user: {
            email: `${editemail}`,
            pseudo: pseudo,
            password: password,
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setEditemail(data.user.email)
        setEditpseudo(data.user.pseudo)
        setEditpassword(data.user.password)

        setSuccess('Edition réussie!');
      } else {
        setError('error')
      }
    } catch (error) {
      setError('Erreur lors de la tentative de connection!');
    }
  };

  return (
    <>
      <h2 className='profiletitle'>Mon profil</h2>
      <div className='profilecard'>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <p id="profilecardtitle">Hello {profilpseudo} </p>
        <div id='profilecardinfo'>
          Email :  {iseditingemail? (<>
            <input
            type="email"
            id="email"
            value={editemail}
            placeholder="email"
            onChange={(e) => setEditemail(e.target.value)}
            />
            <button type="submit">Sauvegarder</button>
            <button onClick={toggleeditbutton}>Editer</button> </>
          ) : (<>
          {profilemail}
          <button onClick={toggleeditbutton}>Editer</button></>)}

          <br></br>
          <br></br> ;
          Pseudo : {profilpseudo}
          <br></br>
          <br></br>
          Password : {profilpassword} ******
        </div>
        <br></br>
        <br></br>
        <div id='logout'><Logout /></div>
      </div>
    </>
  )
}

export default Getmember;