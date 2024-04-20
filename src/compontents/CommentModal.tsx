"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { userState } from "../../atom_state/userAtom";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState<any>();
  const { user, setIsLoggedOut, setUser } = useUserAuth();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const filePickerRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot: any) => {
      setPost(snapshot);
    });
  }, [postId, db]);

  const reader = new FileReader();
  const addImageToPost = (e: any) => {
    setLoading(true);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = async (readerEvent: any) => {
        const fileData = await readerEvent.target.result;
        setSelectedFile(fileData);
      };
      console.log(selectedFile);
    }
    setLoading(false);
  };

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
              <XMarkIcon onClick={() => setOpen(false)} />
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
            <span className={styles.connect_line}></span>
            <div className={styles.post_header}>
              {/* post user info */}
              <div className={styles.post_info}>
                <h4 className={styles.user_styles}>
                  {post?.data()?.firstName}
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
              <div className={styles.current_post_container}>
                {post?.data()?.text}
              </div>
              <div className={styles.current_post_img_container}>
                {post?.data()?.image && (
                  <img
                    src={post?.data()?.image}
                    className={styles.uploadedImage}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={styles.modal_comment_reply_container}>
            <Image
              className={styles.modal_comment_current_post_img}
              src={example_avatar}
              alt="user-img"
              width={50}
              height={50}
            />

            <div className={styles.modal_comment_reply_area}>
              <div className={styles.modal_comment_current_user_info_container}>
                <h4 className={styles.user_styles}>{currentUser?.firstName}</h4>
                <span className={styles.userNick}>
                  {" "}
                  {`@`}
                  {currentUser?.email}
                </span>
              </div>
              <textarea
                className={styles.modal_comment_text_reply}
                name="answer_to_post"
                placeholder="Post your reply"
              ></textarea>
            </div>
          </div>
          <div className={styles.comment_modal_footer_container}>
            <div className={styles.comment_modal_footer_emoji_container}>
              <p
                className={styles.add_photo}
                onClick={() => {
                  filePickerRef.current.click();
                }}
              >
                🖼️
                <input
                  type="file"
                  hidden
                  ref={filePickerRef}
                  accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                  onChange={addImageToPost}
                />
              </p>
              <p className={styles.add_emoji}>😄</p>
            </div>
            <button className={styles.post_btn}>reply</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
