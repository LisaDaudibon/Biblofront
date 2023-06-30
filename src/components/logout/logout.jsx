import React from 'react';
import { useSetAtom } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { userIdAtom } from '../../atoms/userIdAtom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

function Logout() {
  const setUsertoken = useSetAtom(userTokenAtom);
  const setUserid = useSetAtom(userIdAtom);

  const HandleLogout = () => {
    setUsertoken(null);
    setUserid(null);
  };

  return (
    <div>
      <button href="/home" onClick={HandleLogout}>
        <FontAwesomeIcon icon={faSignOut} className="icon" title="Logout" />
      </button>
    </div>
  );
}

export default Logout;
