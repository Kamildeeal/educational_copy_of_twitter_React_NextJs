import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./FirebasePost.module.css";
import example_avatar from "../../public/example_avatar.png";
import { FaRocketchat } from "react-icons/fa6";
import { FaRegTrashAlt, FaHeart, FaChartBar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useUserAuth } from "@/context/userAuth";
import Moment from "react-moment";
import { db, storage } from "@/firebase/config";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../atom_state/modalAtom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

const FirebasePost = ({ post, id }: any) => {
  const { user, setIsLoggedOut, setUser } = useUserAuth();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", user.uid), {
        username: user.firstName,
      });
      console.log("done");
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
    }
  }

  useEffect(() => {
    console.log(user.uid);
  }, []);
  useEffect(() => {
    const unsubsribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot: any) => setLikes(snapshot.docs)
    );
    setHasLiked(likes.findIndex((like: any) => like.id === user.uid) !== -1);
  }, [db, likes]);

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
                <h4 className={styles.user_styles}>
                  {post?.data()?.firstName}{" "}
                </h4>
                <span className={styles.userNick}>
                  {" "}
                  {`@`}
                  {post?.data()?.email}{" "}
                </span>
                <span className={styles.timestamp}>
                  ・<Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
                </span>
              </div>

              {/* dot icon */}
              <p className={styles.dots}>⋯</p>
            </div>

            {/* post text */}

            <p
              className={styles.post_user_container}
              // onClick={() => router.push(`/posts/${id}`)}
              // className="text-gray-800 text-[15px sm:text-[16px] mb-2"
            >
              {post?.data()?.text}
            </p>
            <img src={post?.data()?.image} className={styles.uploadedImage} />

            {/* post image */}

            {/* <Image
        // onClick={() => router.push(`/posts/${id}`)}
        className="rounded-2xl mr-2"
        src={post?.data()?.image}
        alt=""
      /> */}
            {/* {icons} */}
            <div className={styles.icons}>
              <FaRocketchat
                onClick={() => {
                  setOpen(!open);
                  setPostId(post.id);
                }}
              />
              <BiRepost />
              <div className={styles.container_icon_heart}>
                {hasLiked ? (
                  <FaHeart fill="red" onClick={likePost} />
                ) : (
                  <FaHeart onClick={likePost} />
                )}
                {likes.length > 0 && (
                  <span className={styles.like_counter}> {likes.length}</span>
                )}
              </div>
              <FaChartBar />
              {user?.uid === post?.data()?.id && (
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
