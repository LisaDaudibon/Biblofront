import Getmember from "../components/getmember/getmember";
import { useAtomValue } from 'jotai';
import { loggedInAtom } from "../atoms/loggedInAtom";
import SignIn from "./signin";

function Profile() {
  const loggedIn = useAtomValue(loggedInAtom);

  return (
    <>
      {loggedIn? (
          <Getmember />
      ) : (
        <SignIn />
        )
      }
    </>
  )
}

export default Profile