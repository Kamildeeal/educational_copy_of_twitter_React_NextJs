import Image from "next/image";
import React from "react";
import styles from "./Sidebar.module.css";
import { useUserAuth } from "@/context/userAuth";
import { useRecoilState } from "recoil";
import { userState } from "../../atom_state/userAtom";

export default function Sidebar() {
  const { user, setIsLoggedOut, setUser } = useUserAuth();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  return (
    <div className={styles.positionOfSidebar}>
      <div className={styles.left_wing}>
        <div className={styles.image_container}>
          <Image
            src="/blacklogo.svg"
            className={styles.image}
            alt="logo"
            width={30}
            height={30}
          ></Image>
        </div>
        <div className={styles.icons_container}>
          <span>
            <b>🏠</b> Home
          </span>
          <span>
            <b>🔍</b> Explore
          </span>
          <span>
            <b>🔔</b> Notifications
          </span>
          <span>
            <b>✉️</b> Messages
          </span>
          <span>
            <b>📋</b> Lists
          </span>
          <span>
            <b>📜</b> Bookmarks
          </span>
          <span>
            <b>👥</b> Communities
          </span>
          <span>
            <b>𝕏</b> Premium
          </span>
          <span>
            <b>👤</b> Profile
          </span>
          <span>
            <b>➕</b>More
          </span>
          <button>Post</button>
        </div>
        <div className={styles.user_info}>
          Mr {currentUser?.firstName} {currentUser?.email}
        </div>
      </div>
    </div>
  );
}
