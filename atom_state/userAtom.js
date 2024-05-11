import { atom } from "recoil";
export const userState = atom({
  key: "userState",
  default: {
    email: "",
    uid: "",
    image: "",
    text: "",
    timestamp: "",
    firstName: "",
  },
});
