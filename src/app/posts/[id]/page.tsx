"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import styles from "./page.module.css";
import { useUserAuth } from "@/context/userAuth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Sidebar from "@/compontents/Sidebar";
import MiddleInput from "@/compontents/MiddleInput";
import MiddlePost from "@/compontents/MiddlePost";
import RightSideBar from "@/compontents/RightSideBar";
import CommentModal from "@/compontents/CommentModal";
import { RecoilRoot, useRecoilState } from "recoil";
import { userState } from "@/../atom_state/userAtom";
import Head from "next/head";
import { FaArrowLeft } from "react-icons/fa6";
import FirebasePost from "@/compontents/FirebasePost";
import PostCompontent from "@/compontents/postPageCompontents/PostComponent";
import UserComment from "@/compontents/postPageCompontents/UserComment";

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

const PostPage = ({ newsResults }: any) => {
  const { user, setIsLoggedOut, setUser } = useUserAuth();

  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const idToString: any = useParams();
  const id = idToString.id;
  const [post, setPost] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);

  //fetch post
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "posts", id), (snapshot: any) => {
      setPost(snapshot.data());
    });

    return () => unsubscribe();
  }, [db, id]);

  // fetch post's comments
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        )
      );
      const commentsData = querySnapshot.docs;
      setComments(commentsData);
    };

    fetchData(); // Wywołanie funkcji asynchronicznej
  }, [db, id]);

  return (
    <body className={styles.body}>
      <div className={styles.container}>
        <Head>
          <title>Post</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.left_wing}>
          <Sidebar />
        </div>
        <div className={styles.center}>
          <div className={styles.post_header}>
            <div className={styles.post_header_left}>
              <div className={styles.arrow_background}>
                <FaArrowLeft
                  onClick={router.back}
                  className={styles.post_header_left_arrow}
                />
              </div>
              <b>Post</b>
            </div>
            <button
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
              Log out
            </button>
          </div>
          <PostCompontent post={post} id={id} />
          {comments.length > 0 &&
            comments.map((comment: any) => (
              <UserComment
                key={comment.id}
                comment={comment.data()}
                commentId={comment.id}
                currentPostId={id}
              />
            ))}
        </div>
        <div className={styles.right_wing}>
          <RightSideBar />
        </div>
        {/* Modal */}
        <CommentModal />
      </div>
    </body>
  );
};

export default PostPage;
