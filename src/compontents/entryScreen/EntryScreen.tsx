import React from "react";
// import styles from "@/EntryScreen.module.css";
// import styles from "./page.module.css";
import styles from "./EntryScreen.module.css";
import Image from "next/image";

const EntryScreen = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src="/logo.svg"
            layout="responsive"
            className={styles.image}
            alt="logo"
            width={340}
            height={308}
          />
        </div>
        <div>
          <div className={styles.h1container}>
            <h1>The latest news from around the world</h1>
          </div>
          <h3>Join today.</h3>
          <div className={styles.buttonLoginWith}>Login with google</div>
          <div className={styles.buttonLoginWith}>Login with apple</div>
          <div className={styles.orContainer}>
            <span className={styles.spanOr}></span>
            <p>or</p>
            <span className={styles.spanOr}></span>
          </div>
          <button className={styles.buttonCreateAccount}>Create account</button>
          <p className={styles.desc}>
            By registering, you agree to the Terms of Use and Privacy Policy,
            including the Cookie Policy.
          </p>
          <h4>Already have an account?</h4>
          <button className={styles.buttonLogin}>
            <p>Login</p>
          </button>
        </div>
      </div>
      <footer>links</footer>
    </>
  );
};

export default EntryScreen;
