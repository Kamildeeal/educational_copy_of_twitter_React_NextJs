"use client";
import React, { PropsWithChildren, useState } from "react";
import { RecoilRoot } from "recoil";

type State = {
  isLoggedOut: boolean;
  setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: any;
  currentUser: any;
  setCurrentUser: any;
};

export const UserAuthContext = React.createContext<State>({
  isLoggedOut: true,
  setIsLoggedOut: () => {},
  user: "",
  setUser: () => null,
  currentUser: [],
  setCurrentUser: () => null,
});

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true);
  const [user, setUser] = useState<any>("");
  const [currentUser, setCurrentUser] = useState([]);

  return (
    <UserAuthContext.Provider
      value={{
        isLoggedOut,
        setIsLoggedOut,
        user,
        setUser,
        currentUser,
        setCurrentUser,
      }}
    >
      <RecoilRoot>{children}</RecoilRoot>
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => React.useContext(UserAuthContext);
