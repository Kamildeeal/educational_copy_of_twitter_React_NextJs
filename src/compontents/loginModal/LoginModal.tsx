"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./LoginModal.module.css";
import Image from "next/image";

const LoginModal = ({ isOpen, toggleModal }: any) => {
  return (
    <Modal
      isOpen={isOpen}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modal_content}>
        <div className={styles.header}>
          <button className={styles.close_btn} onClick={toggleModal}>
            ✖
          </button>
          <Image
            src="/logo.svg"
            className={styles.image}
            alt="logo"
            width={30}
            height={30}
          />
        </div>
        <div className={styles.body}>
          <h2>Login to X service</h2>
          <div className={styles.buttonLoginWith}>Login with google</div>
          <div className={styles.buttonLoginWith}>Login with apple</div>
          <div className={styles.orContainer}>
            <span className={styles.spanOr}></span>
            <p className={styles.spanP}>or</p>
            <span className={styles.spanOr}></span>
          </div>
          <input placeholder="e-mail adress or username"></input>
          <div className={styles.buttonNext}>Next</div>
          <div className={styles.buttonLoginWith}>Forgot password?</div>
          <p className={styles.footer}>
            You don't have accout yet? {""}
            <span className={styles.register}>Register</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
