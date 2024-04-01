import React from "react";
import { IoSearch } from "react-icons/io5";
import styles from "./RightSideBar.module.css";

export default function RightSideBar() {
  return (
    <div>
      <div className={styles.container_searchBox}>
        <div className={styles.searchBox}>
          <IoSearch className={styles.icon} />
          <input
            className={styles.input}
            type="text"
            placeholder="Search Twitter"
          ></input>
        </div>
      </div>
    </div>
  );
}
