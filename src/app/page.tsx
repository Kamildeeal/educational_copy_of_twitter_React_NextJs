"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/userAuth";
import { RecoilRoot } from "recoil";
import { SyncLoader } from "react-spinners";

const EntryScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignupClick = () => {
    setLoading(true);
    router.push("/signup");
  };

  const handleLoginClick = () => {
    setLoading(true);
    router.push("/login");
  };

  return (
    <>
      <RecoilRoot>
        <div className={styles.wrapperAll}>
          <div className={styles.container}>
            <div className={styles.imageContainer}>
              <Image
                src="/logo.svg"
                className={styles.image}
                layout="responsive"
                alt="logo"
                width={340}
                height={308}
              />
            </div>
            {loading && (
              <div className={styles.overlay}>
                <SyncLoader
                  color="white"
                  loading={loading}
                  size={15}
                  className={styles.loader}
                />
              </div>
            )}
            <div className={styles.contentContainer}>
              <div className={styles.h1container}>
                <h1>The latest news from around the world</h1>
              </div>
              <h3>Join today.</h3>
              <div className={styles.buttonLoginWith}>
                Login with google{" "}
                <span>
                  - currently <br />
                  disabled
                </span>
              </div>
              <div className={styles.buttonLoginWith}>
                Login with apple{" "}
                <span>
                  - currently <br />
                  disabled
                </span>
              </div>
              <div className={styles.orContainer}>
                <span className={styles.spanOr}></span>
                <p>or</p>
                <span className={styles.spanOr}></span>
              </div>
              <button
                onClick={handleSignupClick}
                className={styles.buttonCreateAccount}
              >
                Create account
              </button>
              <p className={styles.desc}>
                By registering, you agree to the Terms of Use and Privacy
                Policy, including the Cookie Policy.
              </p>
              <h4>Already have an account?</h4>
              <button onClick={handleLoginClick} className={styles.buttonLogin}>
                <p>Login</p>
              </button>
            </div>
          </div>

          <footer>
            <span>Info</span>
            <span>Download app from X service</span>
            <span>Help center</span>
            <span>Useage rules</span>
            <span>Private Politicy</span>
            <span>Cookies Politicy</span>
            <span>Avaliable info about ads</span>
            <span>Blog</span>
            <span>Status</span>
            <span>Work</span>
            <span>Twitter resource</span>
            <span>Ads</span>
            <span>Marketing</span>
            <span>X for companys</span>
            <span>Developers</span>
            <span>Path</span>
            <span>Setting</span>
            <span>© 2024 X Corp.</span>
          </footer>
        </div>
      </RecoilRoot>
    </>
  );
};

export default EntryScreen;
