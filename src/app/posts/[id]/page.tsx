"use client";
import React from "react";
import styles from "./page.module.css";
import Sidebar from "@/components/leftSideHomePage/Sidebar";
import RightSideBar from "@/components/rightSideHomePage/RightSideBar";
import { FaArrowLeft } from "react-icons/fa6";
import PostCompontent from "@/components/postPageCompontents/PostComponent";
import UserComment from "@/components/postPageCompontents/UserComment";
import CommentModal from "@/components/middleSideHomePage/CommentModal";
import Head from "next/head";
import usePostPageLogic from "@/hooks/usePostPageLogic";
import { useRouter } from "next/navigation";

const PostPage = () => {
  const router = useRouter();
  const { currentUser, post, comments, handleLogout, id } = usePostPageLogic();

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Head>
          <title>Post</title>
          <meta name="description" content="Generated by create next app" />
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
              className={styles.center_button_logout}
              onClick={handleLogout}
            >
              Logout
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
    </div>
  );
};

export default PostPage;
