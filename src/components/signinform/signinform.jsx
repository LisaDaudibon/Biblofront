import { Link } from "react-router-dom";
import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { userIdAtom } from '../../atoms/userIdAtom';
import './signinstyle.css';

function SigninForm() {
  const setUsertoken = useSetAtom(userTokenAtom);
  const setUserid = useSetAtom(userIdAtom)
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://bibloback.fly.dev/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            pseudo: pseudo,
            password: password,
          }
        }),
      });

      if (response.ok) {
        const token = await response.headers.get("Authorization");
        setUsertoken(token);
        const responseData = await response.json();
        setUserid(responseData.user.id);

       setSuccess('Login avec succès!'); // Set success flash message
      } else { 
        setError('Erreur lors du login!');
      }
    } catch (error) {
      setError('Erreur lors de la tentative de connection!');
    }
    // <disconnectUser /> aller chercher dans la branche getmembers 
  };

  return (
    <form className="signinform" onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <div>
        <label htmlFor="email">Email :   </label>
        <br></br>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="pseudo">Pseudo :   </label>
        <br></br>
        <input
          type="text"
          id="pseudo"
          placeholder="pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="password">Mot de passe :   </label>
        <br></br>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <br></br>
      <button type="submit">Se connecter !</button>
      <br></br>
      <p className="signUpLink"> Tu n'as pas de compte ? <Link to="/users">Inscris-toi</Link></p>

    </form>
  );
}

export default SigninForm;
