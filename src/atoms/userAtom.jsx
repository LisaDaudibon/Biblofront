import { atom } from "jotai";

const userAtom = atom({
  email: "",
  pseudo:"",
  id: "",
  token: "",
  admin: false,
  isLoggedIn: false,
});

export default userAtom
