import React from "react";
import Image from "next/image";
import styles from "./ExamplePost.module.css";
import example_avatar from "../../../public/example_avatar.png";
import { FaRocketchat } from "react-icons/fa6";
import { FaRegTrashAlt, FaHeart, FaChartBar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

const ExamplePost = () => {
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
                <h4 className={styles.user_styles}>username </h4>
                <span className={styles.userNick}> @userNickName </span>
                <span className={styles.timestamp}>・2h ago</span>
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
              Hard coded example post
            </p>
            <img
              src="https://dummyimage.com/600x400/000/fff"
              alt="post-data"
              className={styles.uploadedImage}
            />

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
              <FaHeart />
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
