"use client";

import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

import useCreateAccAndAddUserToStore from "../hooks/useCreateAccAndAddUserToStore";

const CreateAccount = () => {
  const {
    firstName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignUp,
    router,
    setFirstName,
    confirmPassword,
    setConfirmPassword,
  } = useCreateAccAndAddUserToStore();

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.header}>
          <button className={styles.close_btn} onClick={() => router.push("/")}>
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
          <h2>Create Account</h2>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className={styles.buttonNext} onClick={handleSignUp}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
