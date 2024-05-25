"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import useCreateAccAndAddUserToStore from "../../hooks/useCreateAccAndAddUserToStore";
import { SyncLoader } from "react-spinners";

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
    loading,
  } = useCreateAccAndAddUserToStore();

  return (
    <div className={styles.wrapperAll}>
      <div className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.header}>
            <button
              className={styles.close_btn}
              onClick={() => router.push("/")}
            >
              ✖
            </button>
            <Image
              src="/logo.svg"
              className={styles.image}
              alt="logo"
              width={30}
              height={30}
              onClick={() => router.push("/")}
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
          <div className={styles.body}>
            <h2>Create Account</h2>
            <div className={styles.form}>
              <div className={styles.textField}>
                <TextField
                  type="text"
                  className={styles.customTextField}
                  id="outlined-basic"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  variant="outlined"
                  label="First name"
                />
              </div>
              <div className={styles.textField}>
                <TextField
                  className={styles.customTextField}
                  type="email"
                  id="outlined-basic"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  variant="outlined"
                  label="Email address"
                />
              </div>
              <div className={styles.textField}>
                <TextField
                  className={styles.customTextField}
                  type="password"
                  id="outlined-basic"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  variant="outlined"
                  label="Password"
                />
              </div>
              <div className={styles.textField}>
                <TextField
                  type="password"
                  className={styles.customTextField}
                  id="outlined-basic"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  variant="outlined"
                  label="Confirm-password"
                />
              </div>
              <button className={styles.buttonNext} onClick={handleSignUp}>
                Next
              </button>
            </div>
            <p className={styles.footer_kam}>Kam-Tweet &copy; 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
