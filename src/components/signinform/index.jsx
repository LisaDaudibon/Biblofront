import { Link } from "react-router-dom";
import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtom';
import Cookies from 'js-cookie';

function SigninForm() {
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:3000/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            pseudo: pseudo,
            password: password,
            admin: admin
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', response.headers.get("Authorization"));
        Cookies.set('id', data.user.id);

        setUser({
          id: data.user.id,
          email: data.user.email,
          pseudo: data.user.pseudo,
          token: data.user.token,
          admin: data.user.admin,
          isLoggedIn: true,
        });

        setSuccess('Login avec succès!'); // Set success flash message
      } else {
        setError('Erreur lors du login!');
      }
    } catch (error) {
      setError('Erreur lors de la tentative de connection!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Se connecter</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <div>
        <label htmlFor="email">Email :   </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="pseudo">Pseudo :   </label>
        <input
          type="text"
          id="pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="password">Mot de passe :   </label>
        <input
          type="password"
          id="password"
          value={password}
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
