"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./page.module.css";

import { useUserAuth } from "@/context/userAuth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import Sidebar from "@/compontents/leftSideHomePage/Sidebar";
import MiddleInput from "@/compontents/MiddleSideHomePage/MiddleSideInput";
import MiddlePost from "@/compontents/MiddleSideHomePage/MiddlePost";
import RightSideBar from "@/compontents/rightSideHomePage/RightSideBar";
import CommentModal from "@/compontents/MiddleSideHomePage/CommentModal";
import { RecoilRoot, useRecoilState } from "recoil";
import { userState } from "../../../atom_state/userAtom";
import MiddleTestInput from "@/compontents/MiddleSideHomePage/MiddleTestInput";
import { SyncLoader } from "react-spinners";

type NewsData = {
  newsData: any[];
};
interface UserData {
  email: string;
  uid: string;
  image: string;
  text: string;
  timestamp: string;
  firstName: string;
}

const HomePage = ({ newsResults }: any) => {
  const { user, setIsLoggedOut, setUser } = useUserAuth();

  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        if (uid) {
          const fetchUser = async () => {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data() as UserData;
              setCurrentUser(userData);
              // console.log(currentUser);
            }
          };
          fetchUser();
        }
        setLoading(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth, loading]);
  // question
  // should I add cleanup function after this compontent "unmounts"(render another compontent)??
  // like: return () => unsubscribe(); // Cleanup function
  if (loading) {
    return (
      <div>
        {loading && (
          <div className={styles.overlay}>
            <SyncLoader
              color="white"
              loading={loading}
              size={15}
              className={styles.loader}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {auth.currentUser ? (
        <div className={styles.container}>
          <div className={styles.left_wing}>
            <Sidebar />
          </div>
          <div className={styles.center}>
            <div className={styles.center_header}>
              <p>HomePage</p>
              <button
                className={styles.center_button_logout}
                onClick={() => {
                  auth.signOut();
                  setCurrentUser({
                    email: "",
                    uid: "",
                    image: "",
                    text: "",
                    timestamp: "",
                    firstName: "",
                  });
                  sessionStorage.removeItem("user");
                  router.push("/");
                }}
              >
                Logout
              </button>
            </div>
            <MiddleTestInput />
            {/* <MiddleInput /> */}
            <MiddlePost />
          </div>
          <div className={styles.right_wing}>
            <RightSideBar />
          </div>

          {/* Modal */}
          <CommentModal />
        </div>
      ) : (
        <div className={styles.auth_user}>
          <h1>Login first to tweet</h1>
          <div>
            <button
              className={styles.button_89}
              onClick={() => {
                router.push("/signup");
              }}
            >
              Create acount to join
            </button>
            <button
              className={styles.button_89}
              onClick={() => {
                router.push("/");
              }}
            >
              Entry page
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
