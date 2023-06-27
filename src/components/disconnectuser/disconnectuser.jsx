import { useSetAtom } from 'jotai';
import { userTokenAtom } from '../../atoms/userTokenAtom';
import { userIdAtom } from '../../atoms/userIdAtom';

function disconnectUser() {
  const setUsertoken = useSetAtom(userTokenAtom);
  const setUserid = useSetAtom(userIdAtom)

  // Get the current timestamp
  const currentTimestamp = Date.now();

  // Calculate the timestamp for 24 hours later
  // const disconnectTimestamp = currentTimestamp + 24 * 60 * 60 * 1000;
  const disconnectTimestamp = currentTimestamp + 5 * 60 * 1000;

  // Calculate the time remaining until the token should be deleted
  const timeRemaining = disconnectTimestamp - currentTimestamp;

  useEffect(() => {
    // Reset the token value to an empty string
    setUsertoken(null)
    setUserid(null)

    console.log("Hello, je suis lancé !")
    // Set a timeout to disconnect the user and delete the token after 24 hours
    setTimeout(disconnectUser, timeRemaining);
  });
};

export default disconnectUser