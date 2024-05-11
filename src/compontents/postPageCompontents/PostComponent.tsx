import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./PostComponent.module.css";
import example_avatar from "@/../../public/example_avatar.png";
import { FaRocketchat } from "react-icons/fa6";
import { FaRegTrashAlt, FaHeart, FaChartBar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useUserAuth } from "@/context/userAuth";
import Moment from "react-moment";
import { db, storage } from "@/firebase/config";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/../../atom_state/modalAtom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { userState } from "@/../../atom_state/userAtom";
import { useRouter } from "next/navigation";

const FirebasePost = ({ post, id }: any) => {
  const { user, setIsLoggedOut, setUser } = useUserAuth();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [comments, setComments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot: any) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot: any) => setComments(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like: any) => like.id === currentUser?.uid) !== -1
    );
  }, [likes, currentUser]);

  async function likePost() {
    if (currentUser.uid) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
          username: currentUser?.firstName,
        });
        console.log(currentUser?.uid);
      }
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post?.image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/home");
    }
  }

  // useEffect(() => {
  //   setHasLiked(likes.findIndex((like: any) => like.id === user.uid) !== -1);
  // }, [likes]);

  return (
    <div>
      <div className={styles.post_box}>
        <div className={styles.image_user_container}>
          {/* user image */}
          <Image
            className={styles.image_user}
            src={example_avatar}
            alt="user-img"
            width={50}
            height={50}
          />

          {/* right side */}

          <div className={styles.post_content}>
            {/* Header */}
            <div className={styles.post_header}>
              {/* post user info */}
              <div className={styles.post_info}>
                <h4 className={styles.user_styles}>{post?.firstName} </h4>
                <span className={styles.userNick}>
                  {" "}
                  {`@`}
                  {post?.email}
                </span>
                <span className={styles.timestamp}>
                  ・<Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                </span>
              </div>

              {/* dot icon */}
              <p className={styles.dots}>⋯</p>
            </div>

            {/* post text */}

            <div className={styles.post_user_container}>
              <p className={styles.text}>{post?.text}</p>
            </div>
            <img src={post?.image} className={styles.uploadedImage} />

            {/* {icons} */}
            <div className={styles.icons}>
              {/* <div className={styles.container_icon_heart}>
                <FaRocketchat
                  onClick={() => {
                    setOpen(!open);
                    console.log(post?.uid);
                    setPostId(post?.uid);
                  }}
                />
                {comments.length > 0 && (
                  <span className="text-sm">{comments.length-1}</span>
                )}
              </div> */}
              <BiRepost />
              <div className={styles.container_icon_heart}>
                {hasLiked ? (
                  <FaHeart
                    fill="red"
                    onClick={likePost}
                    style={{
                      margin: "4px",
                      height: "1.5em",
                      width: "1.5em",
                      padding: "4px",
                    }}
                  />
                ) : (
                  <FaHeart
                    onClick={likePost}
                    style={{
                      margin: "4px",
                      height: "1.5em",
                      width: "1.5em",
                      padding: "4px",
                    }}
                  />
                )}
                {likes.length > 0 && (
                  <span className={styles.like_counter}>
                    {" "}
                    {likes.length - 1}
                  </span>
                )}
              </div>
              <FaChartBar />
              {currentUser?.uid === post?.uid && (
                <FaRegTrashAlt onClick={deletePost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebasePost;
