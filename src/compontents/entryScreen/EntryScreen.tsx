"use client";
import React, { useState } from "react";
import styles from "./EntryScreen.module.css";
import Image from "next/image";
import LoginModal from "../loginModal/LoginModal";

const EntryScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={styles.wrapperAll}>
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
          <div className={styles.contentContainer}>
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
            <button className={styles.buttonCreateAccount}>
              Create account
            </button>
            <p className={styles.desc}>
              By registering, you agree to the Terms of Use and Privacy Policy,
              including the Cookie Policy.
            </p>
            <h4>Already have an account?</h4>
            <button onClick={toggleModal} className={styles.buttonLogin}>
              <p>Login</p>
            </button>
          </div>
          <LoginModal isOpen={isModalOpen} toggleModal={toggleModal} />
        </div>

        <footer>
          <span>Informacje</span>
          <span>Pobierz aplikację serwisu X</span>
          <span>Centrum Pomocy</span>
          <span>Zasady użytkowania</span>
          <span>Polityka prywatności</span>
          <span>Polityka dotycząca plików cookie</span>
          <span>Dostępność Informacja o reklamach</span>
          <span>Blog</span>
          <span>Status</span>
          <span>Praca</span>
          <span>Zasoby marki</span>
          <span>Reklamy</span>
          <span>Marketing</span>
          <span>X dla firm</span>
          <span>Deweloperzy</span>
          <span>Ścieżka</span>
          <span>Ustawienia</span>
          <span>© 2024 X Corp.</span>
        </footer>
      </div>
    </>
  );
};

export default EntryScreen;
