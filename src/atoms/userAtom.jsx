import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage({
  id: "",
  email: "",
  pseudo:"",
  token: "",
  admin: false,
  isLoggedIn: false,
});
