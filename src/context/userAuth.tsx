"use client";

import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { PropsWithChildren, useEffect, useState } from "react";

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
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => React.useContext(UserAuthContext);
