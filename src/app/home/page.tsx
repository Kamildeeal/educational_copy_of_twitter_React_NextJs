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
import RightSideBar from "@/compontents/RightSideBar";

type NewsData = {
  newsData: any[];
};

const HomePage = ({ newsResults }: any) => {
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
        <div className={styles.left_wing}>
          <Sidebar />
        </div>
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
        <div className={styles.right_wing}>
          <RightSideBar />
        </div>
      </div>
    </>
  );
};

export default HomePage;

// type Repo = {
//   article: string;
//   title: string;
// };

// export async function getStaticProps() {
//   const response = await fetch(
//     "https://saurav.tech/NewsAPI/everything/cnn.json"
//   );
//   const newsData = await response.json();

//   return {
//     props: {
//       newsData,
//     },
//   };
// }

// export async function getStaticProps() {
//   const newsResults = await fetch(
//     "https://saurav.tech/NewsAPI/everything/cnn.json"
//   ).then((res) => res.json());
//   return {
//     props: {
//       newsResults,
//     },
//   };
// }
