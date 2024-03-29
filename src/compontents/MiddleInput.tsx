import React, { useState } from "react";
import styles from "./MiddleInput.module.css";

export default function MiddleInput() {
  const [input, setInput] = useState("");
  return (
    <div>
      <div className={styles.cointainer}>
        <div className={styles.nav_btns}>
          <button className={styles.set_btn}>For you</button>
          <button className={styles.set_btn}>Following</button>
          <button className={styles.gear_btn}>x</button>
        </div>
      </div>
      <div className={styles.input_container}>
        <img
          src="@public\logo.svg"
          alt="user-img"
          className={styles.user_img}
        />
        <div>
          <textarea
            className={styles.textarea}
            placeholder="What's happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <h1 className={styles.h1e}>ELO ELO ELDDEO</h1>
        <p>ddddddddddddddd</p>
      </div>
    </div>
  );
}
