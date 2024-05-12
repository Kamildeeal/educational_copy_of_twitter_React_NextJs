import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./FirebasePost.module.css";
import example_avatar from "../../../public/example_avatar.png";
import { FaRocketchat } from "react-icons/fa6";
import { FaRegTrashAlt, FaHeart, FaChartBar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useUserAuth } from "@/context/userAuth";
import Moment from "react-moment";
import { db, storage } from "@/firebase/config";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../../atom_state/modalAtom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { userState } from "../../../atom_state/userAtom";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";

const FirebasePost = ({ post, id }: any) => {
  const { user, setIsLoggedOut, setUser } = useUserAuth();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        await deleteDoc(doc(db, "posts", post.id, "likes", currentUser?.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", currentUser?.uid), {
          username: currentUser?.firstName,
        });
        // console.log(currentUser?.uid);
      }
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
                  {post?.data()?.email}
                </span>
                <span className={styles.timestamp}>
                  ・<Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
                </span>
              </div>
              {/* dot icon */}
              <p className={styles.dots}>⋯</p>
            </div>
            {/* post text */}
            <div className={styles.post_user_container}>
              <p
                onClick={() => {
                  setLoading(true);
                  router.push(`/posts/${id}`);
                }}
                className={styles.text}
              >
                {post?.data()?.text}
              </p>
            </div>
            <img
              onClick={() => {
                setLoading(true);
                router.push(`/posts/${id}`);
              }}
              src={post?.data()?.image}
              className={styles.uploadedImage}
            />
            {/* {icons} */}
            <div className={styles.icons}>
              <div className={styles.container_icon_chat}>
                <FaRocketchat
                  onClick={() => {
                    setOpen(!open);
                    setPostId(post.id);
                  }}
                />
                {comments.length - 1 > 0 && (
                  <span className="text-sm">{comments.length - 1}</span>
                )}
              </div>
              <div className={styles.container_icon_repost}>
                <BiRepost />
              </div>
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
                {likes.length - 1 > 0 && (
                  <span className={styles.like_counter}>
                    {" "}
                    {likes.length - 1}
                  </span>
                )}
              </div>
              <div className={styles.container_icon_chart}>
                <FaChartBar />
              </div>
              {currentUser?.uid === post?.data()?.uid && (
                <FaRegTrashAlt
                  onClick={deletePost}
                  className={styles.container_icon_trashcan}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebasePost;
