import React, { useState } from "react";
import styles from "./MiddleInput.module.css";
import Image from "next/image";
import example_avatar from "../../public/example_avatar.png";

export default function MiddleInput() {
  const [input, setInput] = useState("");
  return (
    <div className={styles.input_box}>
      <div className={styles.cointainer}>
        <div className={styles.nav_btns}>
          <button className={styles.set_btn}>For you</button>
          <button className={styles.set_btn}>Following</button>
          <button className={styles.gear_btn}>x</button>
        </div>
      </div>
      <div className={styles.input_container}>
        <Image
          src={example_avatar}
          height={50}
          width={50}
          alt="user_avatar"
          className={styles.user_img}
        />
        <div className={styles.container_text}>
          <textarea
            className={styles.textarea}
            placeholder="What's happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <div className={styles.container_emojis}>
            <div className={styles.container_left}>
              <p>🖼️</p>
              <p>😄</p>
            </div>
            <p className={styles.post_btn}>Post</p>
          </div>
        </div>
      </div>
    </div>
  );
}
