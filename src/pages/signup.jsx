import SignupForm from "../components/signupform/signupform";
import Getmember from "../components/getmember/getmember";
import { useAtomValue } from 'jotai';
import { loggedInAtom } from "../atoms/loggedInAtom";

function SignUp () {
  const loggedIn = useAtomValue(loggedInAtom);

  return (
    <>
    {loggedIn? (
      <Getmember />
      ) : (
        <SignupForm />
      )}
    </>
  );
}

export default SignUp;