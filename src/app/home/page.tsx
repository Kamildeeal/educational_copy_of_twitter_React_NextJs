"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./page.module.css";
import Image from "next/image";
import { useUserAuth } from "@/context/userAuth";
import { doc, onSnapshot } from "firebase/firestore";
import Sidebar from "@/compontents/Sidebar";
import MiddleInput from "@/compontents/MiddleInput";
import MiddlePost from "@/compontents/MiddlePost";

const HomePage = () => {
  const { user, setIsLoggedOut, setUser } = useUserAuth();
  const router = useRouter();
  // const userSession = sessionStorage.getItem("user");

  // if (!user && !userSession) {
  //   router.push("/");
  // }

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedOut(false);
        const userDocRef = doc(db, "users", currentUser.uid);
        onSnapshot(userDocRef, (doc) => {
          // if (doc.exists()) {
          setUser(doc.data());
        });
      } else {
        setIsLoggedOut(true);
      }
    });
    return () => {
      authUnsubscribe();
    };
  }, [setIsLoggedOut, setUser]);

  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.center}>
          HomePage
          <button
            onClick={() => {
              auth.signOut();
              sessionStorage.removeItem("user");
              router.push("/");
            }}
          >
            Log out
          </button>
          <MiddleInput />
          <MiddlePost />
        </div>
        <div className={styles.right_wing}>RIHGHT WING</div>
      </div>
    </>
  );
};

export default HomePage;
