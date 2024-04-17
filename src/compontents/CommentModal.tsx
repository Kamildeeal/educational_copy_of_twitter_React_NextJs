"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../atom_state/modalAtom";
import Modal from "react-modal";
import styles from "../compontents/CommentModal.module.css";
import { XMarkIcon } from "@heroicons/react/20/solid";
import example_avatar from "../../public/example_avatar.png";
import Image from "next/image";
import Moment from "react-moment";
import { useUserAuth } from "@/context/userAuth";
import { db } from "@/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState<any>();
  const { user, setIsLoggedOut, setUser } = useUserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot: any) => {
      setPost(snapshot);
    });
  }, [postId, db]);

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          className={styles.modal_comment_container}
          onRequestClose={() => setOpen(false)}
        >
          <div className={styles.moda_comment_header}>
            <span className={styles.modal_comment_header_close_btn}>
              <XMarkIcon />
            </span>
          </div>
          <div className={styles.modal_comment_containier_current_post}>
            <Image
              className={styles.modal_comment_current_post_img}
              src={example_avatar}
              alt="user-img"
              width={50}
              height={50}
            />
            <div className={styles.post_header}>
              {/* post user info */}
              <div className={styles.post_info}>
                <h4 className={styles.user_styles}>
                  userName
                  {/* {user?.firstName}  */}
                </h4>
                <span className={styles.userNick}>
                  {" "}
                  {`@`}
                  email
                  {/* {post?.data()?.email}{" "} */}
                </span>
                <span className={styles.timestamp}>
                  ・
                  <Moment fromNow>
                    timestamp
                    {/* {post?.data()?.timestamp?.toDate()} */}
                  </Moment>
                </span>
              </div>
              {/* dot icon */}
              <div className={styles.current_post_container}>POST TEXT</div>
            </div>
          </div>
          <div className={styles.modal_comment_container_reply}>
            <Image
              className={styles.modal_comment_current_post_img}
              src={example_avatar}
              alt="user-img"
              width={50}
              height={50}
            />
            <div>
              {user?.firstName}
              {post?.data()?.email}
              <textarea
                name="answer_to_post"
                placeholder="Post your reply"
              ></textarea>
            </div>
          </div>
          <div>
            <div>emojis</div>
            <div>reply</div>
          </div>
        </Modal>
      )}
    </div>
  );
}
