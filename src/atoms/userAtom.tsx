import { atom } from "recoil";
import { AtomKeys } from "./atomKeys";

interface UserState {
  email: string;
  uid: string;
  image: string;
  text: string;
  timestamp: string;
  firstName: string;
}

export const userState = atom<UserState>({
  key: AtomKeys.UserState,
  default: {
    email: "",
    uid: "",
    image: "",
    text: "",
    timestamp: "",
    firstName: "",
  },
});
