import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage({
  id: "",id: "",
  email: "",
  pseudo:"",
  token: "",
  admin: false,
  isLoggedIn: false,
});
