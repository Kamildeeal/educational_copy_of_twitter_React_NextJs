import { db } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt, FaHeart, FaChartBar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";
import Image from "next/image";
import styles from "./UserComment.module.css";
import example_avatar from "@/../../public/example_avatar.png";
import Moment from "react-moment";

export default function UserComment({
  comment,
  commentId,
  currentPostId,
}: any) {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", currentPostId, "comments", commentId, "likes"),
      (snapshot: any) => setLikes(snapshot.docs)
    );
  }, [commentId, currentPostId]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like: any) => like.id === currentUser?.uid) !== -1
    );
  }, [likes, currentUser]);

  async function likeComment() {
    if (currentUser.uid) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            currentPostId,
            "comments",
            commentId,
            "likes",
            currentUser?.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            currentPostId,
            "comments",
            commentId,
            "likes",
            currentUser?.uid
          ),
          {
            username: currentUser?.firstName,
          }
        );
      }
    }
  }

  async function deleteComment() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", currentPostId, "comments", commentId));
    }
  }

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
                <h4 className={styles.user_styles}>{comment?.userName} </h4>
                <span className={styles.userNick}>
                  {" "}
                  {`@`}
                  {comment?.userEmail}
                </span>
                <span className={styles.timestamp}>
                  ・<Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                </span>
              </div>

              {/* dot icon */}
              <p className={styles.dots}>⋯</p>
            </div>

            {/* post text */}

            <div className={styles.post_user_container}>
              <p className={styles.text}>{comment?.userComment}</p>
            </div>
            {/* {icons} */}
            <div className={styles.icons}>
              <BiRepost />
              <div className={styles.container_icon_heart}>
                {hasLiked ? (
                  <FaHeart
                    fill="red"
                    onClick={likeComment}
                    style={{
                      margin: "4px",
                      height: "1.5em",
                      width: "1.5em",
                      padding: "4px",
                    }}
                  />
                ) : (
                  <FaHeart
                    onClick={likeComment}
                    style={{
                      margin: "4px",
                      height: "1.5em",
                      width: "1.5em",
                      padding: "4px",
                    }}
                  />
                )}
                {likes.length > 0 && (
                  <span className={styles.like_counter}> {likes.length}</span>
                )}
              </div>
              <FaChartBar />
              {currentUser?.uid === comment.userId && (
                <FaRegTrashAlt onClick={deleteComment} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
