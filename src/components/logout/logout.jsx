import { useSetAtom, useAtomValue } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { userIdAtom } from '../../atoms/userIdAtom';

function Logout() {
  const setUsertoken = useSetAtom(userTokenAtom);
  const setUserid = useSetAtom(userIdAtom)

    const HandleLogout = () => {
      setUsertoken(null)
      setUserid(null)
    }

  return (
    <div>
      <button href="/home" onClick={HandleLogout}>Se déconnecter</button>
  </div>

  )
}

export default Logout;