import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ExamplePost.module.css";
import example_avatar from "../../public/example_avatar.png";
import { FaRocketchat } from "react-icons/fa6";
import { FaRegTrashAlt, FaHeart, FaChartBar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useUserAuth } from "@/context/userAuth";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const ExamplePost = ({ post, id }: any) => {
  const { user, setIsLoggedOut, setUser } = useUserAuth();

  async function likePost() {
    await setDoc(doc(db, "posts", post.id, "likes", user.uid), {
      username: user.firstName,
    });
    console.log("done");
  }
  useEffect(() => {
    console.log("post.id:", post.id);
    console.log("user.id:", user.uid);
  }, []);

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
                <h4 className={styles.user_styles}>{user?.firstName} </h4>
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
              <FaRocketchat />
              <BiRepost />
              <FaHeart onClick={likePost} />
              <FaChartBar />
              <FaRegTrashAlt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplePost;
