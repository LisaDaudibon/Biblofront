import { useState } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { userIdAtom } from '../../atoms/userIdAtom';
import { Link } from "react-router-dom";
import '../signinform/signinstyle.css';


function SignupForm () {
  const setUsertoken = useSetAtom(userTokenAtom);
  const setUserid = useSetAtom(userIdAtom)
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_Confirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://bibloback.fly.dev/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            pseudo: pseudo,
            password: password,
            password_confirmation: password_confirmation,
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

  return (
    <form className="signinform" onSubmit={handleSubmit}>
      <h2>Crée ton compte</h2>
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
          value={pseudo}
          placeholder="pseudo"
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
      <div>
        <label htmlFor="password-confirmation">Confirme ton mot de passe :   </label>
        <br></br>
        <input
          type="password"
          id="password-confirmation"
          value={password_confirmation}
          placeholder="confirmation du mot de passe"
          onChange={(e) => setPassword_Confirmation(e.target.value)}
          required
        />
      </div>
      <br></br>
      <button type="submit">Créer un compte</button>
      <p className="signInLink"> Tu as déjà un compte ? <Link to="/users/sign_in">Connecte-toi !</Link></p>
    </form>
  );
}

export default SignupForm;
