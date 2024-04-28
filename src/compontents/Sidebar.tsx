import Image from "next/image";
import React from "react";
import styles from "./Sidebar.module.css";
import { useUserAuth } from "@/context/userAuth";
import { useRecoilState } from "recoil";
import { userState } from "../../atom_state/userAtom";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { user, setIsLoggedOut, setUser } = useUserAuth();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const router = useRouter();
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
            <b>🏠</b> <p>Home</p>
          </span>
          <span>
            <b>🔍</b> <p>Explore</p>
          </span>
          <span>
            <b>🔔</b> <p>Notifications</p>
          </span>
          <span>
            <b>✉️</b> <p>Messages</p>
          </span>
          <span>
            <b>📋</b>
            <p>Lists</p>
          </span>
          <span>
            <b>📜</b> <p>Bookmarks</p>
          </span>
          <span>
            <b>👥</b>
            <p>Communities</p>
          </span>
          <span>
            <b className={styles.icon_twitter}>𝕏</b> <p>Premium</p>
          </span>
          <span>
            <b>👤</b> <p>Profile</p>
          </span>
          <span>
            <b>➕</b>
            <p>More</p>
          </span>
          <button>Post</button>
        </div>
        <div className={styles.user_info}>
          <div>
            <p>{currentUser?.firstName}</p>
            <text>
              {" @"}
              {currentUser?.email}{" "}
            </text>
          </div>
          <button
            className={styles.button_logout}
            onClick={() => {
              auth.signOut();
              setCurrentUser({
                email: "",
                uid: "",
                image: "",
                text: "",
                timestamp: "",
                firstName: "",
              });
              sessionStorage.removeItem("user");
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
