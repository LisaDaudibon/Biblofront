import { useState, useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { userIdAtom } from '../../atoms/userIdAtom';
import { loggedInAtom } from '../../atoms/loggedInAtom';


function Getmember() {
  const usertoken = useAtomValue(userTokenAtom);
  const setUsertoken = useSetAtom(userTokenAtom);
  const userid = useAtomValue(userIdAtom);
  const setUserid = useSetAtom(userIdAtom)
  const loggedIn = useAtomValue(loggedInAtom);
  const [profile, setProfile] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // console.log(user.token)
  // console.log("#"*60)
  // console.log(usertoken)
  useEffect(() => {
    
    setError ('');
    // console.log(user.token)
    // console.log("#"*60)
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
          // setProfile({
          //   email: data.user.email,
          //   pseudo: data.user.pseudo});
        } else {
          console.error('error:', response.status);
        }
      } catch (error) {
        console.error('error:', 'error');
      }
    };
    if (loggedIn) {
    getprofile();} // Call the profile function to fetch the data

  }, [usertoken]);


  return (
    <div>
      <p>getmembers</p>
      {/* <p>Hello {profile.email} </p> */}
    </div>
  )
}

export default Getmember;