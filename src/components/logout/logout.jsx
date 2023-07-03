import React from 'react';
import { useSetAtom } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { userIdAtom } from '../../atoms/userIdAtom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

function Logout() {
  const setUserToken = useSetAtom(userTokenAtom);
  const setUserId = useSetAtom(userIdAtom);

  const handleLogout = () => {
    setUserToken(null);
    setUserId(null);
  };

  return (
    <div>
      <button href="/home" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOut} className="icon" title="Logout" />
      </button>
    </div>
  );
}

export default Logout;
