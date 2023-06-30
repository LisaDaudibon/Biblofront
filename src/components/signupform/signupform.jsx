import { useEffect, useState } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { userIdAtom } from '../../atoms/userIdAtom';
import { Link } from "react-router-dom";
import '../signinform/signinstyle.css';

function SignupForm () {
  const setUsertoken = useSetAtom(userTokenAtom);
  const setUserid = useSetAtom(userIdAtom)
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const InitialValues = { email: "",  pseudo: "", password: "", password_confirmation:""};
  const [formValues, setFormValues] = useState(InitialValues);
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setisSubmit] = useState(false)
  const [usersPseudo, setUsersPseudo] = useState([])

  const handleChange = (event) =>{
    const { id, value } = event.target

    setFormValues({...formValues, [id] : value })

    console.log(formValues)

  }

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && setisSubmit){
      console.log(formValues)
    }

    const getalluserspseudo = async () => {
      try {
        const response = await fetch('http://localhost:3000/member-datas', {
          method: 'GET',
          headers: {
          "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          const usersPseudoarray = data.map((user) => user.pseudo)
          console.log(usersPseudoarray)
          setUsersPseudo(usersPseudoarray)
        } else {
          setError('Erreur de récupération des données');
        }
      } catch (error) {
        setError('Erreur!');
      }
    };
    getalluserspseudo();
  })

  const validates = (values) => {
    const errors = {}

    if (values.password !== values.password_confirmation) {
      errors.password = "Le mot de passe est différent de sa confirmation"
    } else if (values.password.length < 6) {
      errors.password = "Le mot de passe doit faire au moins 6 caractères"
    } else if (values.password.length > 128) {
      errors.password = "Le mot de passe doit faire moins de 128 caractères"
    }
    return errors
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setFormErrors(validates(formValues));
    setisSubmit(true)

    const email = formValues.email;
    const pseudo = formValues.pseudo;
    const password = formValues.password;
    const password_confirmation = formValues.password_confirmation;

    const url = 'https://bibloback.fly.dev/users'

    try {
      const response = await fetch(url, {
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
      <h2 className='signintitle'>Crée ton compte</h2>
      <div>
        <label htmlFor="email">Email :   </label>
        <br></br>
        <input
          type="email"
          id="email"
          value={formValues.email}
          placeholder="email"
          onChange={handleChange}
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
          value={formValues.pseudo}
          placeholder="pseudo"
          onChange={handleChange}
          required
        />
      </div>
      <br></br>
      <p>{formErrors.password}</p>
      <div>
        <label htmlFor="password">Mot de passe :   </label>
        <br></br>
        <input
          type="password"
          id="password"
          value={formValues.password}
          placeholder="password"
          onChange={handleChange}
          required
        />
      </div>
      <br></br>
      <div>
        <label htmlFor="password-confirmation">Confirme ton mot de passe :   </label>
        <br></br>
        <input
          type="password"
          id="password_confirmation"
          value={formValues.password_confirmation}
          placeholder="confirmation du mot de passe"
          onChange={handleChange}
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
