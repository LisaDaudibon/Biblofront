import { useSetAtom } from 'jotai';
import { useAtomValue } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { userIdAtom } from '../../atoms/userIdAtom';
import { loggedInAtom } from '../../atoms/loggedInAtom';
import { useState } from 'react';

function Editmemberbutton() {
  // const iseditingemail = 
  // const usertoken = useAtomValue(userTokenAtom);
  // const userid = useAtomValue(userIdAtom);
  // const loggedIn = useAtomValue(loggedInAtom);
  // const setUsertoken = useSetAtom(userTokenAtom);
  // const setUserid = useSetAtom(userIdAtom);

 
  // const [editpseudo, setEditpseudo]= useState;
  // const [editpassword, setEditpassword]=useState;
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');


  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch(`https://bibloback.fly.dev/users/${userid}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `${usertoken}`,
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           email: email,
  //           pseudo: pseudo,
  //           password: password,
  //         }
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();

  //       setEditemail(data.user.email)
  //       setEditpseudo(data.user.pseudo)
  //       setEditpassword(data.user.password)

  //       setSuccess('Edition réussie!');
  //     } else {
  //       setError('error')
  //     }
  //   } catch (error) {
  //     setError('Erreur lors de la tentative de connection!');
  //   }
  // // };

  // const [editemail, setEditemail] = useState('');
  // const [sanitizedemail, setSanitizedemail] = useState('');

  // useEffect(() => {
  //   const handleemail = () => {
  //     const sanitizedemail = DOMPurify.sanitize(email)}
  // })

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   const sanitizedemail = DOMPurify.sanitize(email)

  //   setSanitizedemail = editemail
  // }

  // return (
    
      // {if iseditingemail? (<div>
  //     <>
  //     <input
  //     type="email"
  //     id="email"
  //     value={setSanitizedemail}
  //     placeholder="email"
  //     onChange={(e) => setSanitizedemail(e.target.value)}
  //   /></>
  // {/* //   // </div>): ( <div>
  //   //   <button type="submit">Editer les infos</button> 
  //   // </div>)} */}
  {/* // ) */}
}

export default Editmemberbutton;