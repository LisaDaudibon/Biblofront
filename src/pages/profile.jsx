import React from 'react';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../atoms/loggedInAtom';
import ReadingList from '../components/ReadingList';
import Getmember from '../components/getmember/getmember';
import SigninForm from '../components/signinform/signinform'; // Import the SignIn component

const Profile = () => {
  const loggedIn = useAtomValue(loggedInAtom);

  return (
    <>
      {loggedIn ? (
        <>
          <Getmember />
          <ReadingList />
        </>
      ) : (
        <SigninForm /> 
      )}
    </>
  );
};

export default Profile;
