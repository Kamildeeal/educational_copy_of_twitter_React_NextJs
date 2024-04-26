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
            {/* <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            /> */}
            <TextField
              type="text"
              className={styles.textField}
              id="outlined-basic"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              variant="outlined"
              label="First name"
            />
            {/* <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            <TextField
              className={styles.textField}
              type="email"
              id="outlined-basic"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              variant="outlined"
              label="Email address"
            />
            {/* <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <TextField
              className={styles.textField}
              type="password"
              id="outlined-basic"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              variant="outlined"
              label="Password"
            />

            {/* <input
              type="password"
              placeholder="Confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /> */}
            <TextField
              type="password"
              className={styles.textField}
              id="outlined-basic"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              variant="outlined"
              label="Confirm-password"
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
