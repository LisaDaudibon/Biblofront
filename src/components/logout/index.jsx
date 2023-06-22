import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/userAtom';
import Cookies from 'js-cookie';


function Logout() {
  const [, setUser] = useAtom(userAtom);
    const HandleLogout = () => {
      setUser({
        id: "",
        email: "",
        pseudo:"",
        token: "",
        admin: false,
        isLoggedIn: false,
      });

      Cookies.remove('token');
      Cookies.remove('id');
    }

  return (
    <div>
      <a href="/home" onClick={HandleLogout}>Se déconnecter</a>
  </div>

  )
}

export default Logout;