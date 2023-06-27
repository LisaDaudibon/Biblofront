import SigninForm from "../components/signinform/signinform";
import Getmember from "../components/getmember/getmember";
import { useAtomValue } from 'jotai';
import { loggedInAtom } from "../atoms/loggedInAtom";

function SignIn() {
  const loggedIn = useAtomValue(loggedInAtom);

  return (
    <>
    {loggedIn? (
      <Getmember />
      ) : (
      <SigninForm />
      )}
    </>
  );
}

export default SignIn;