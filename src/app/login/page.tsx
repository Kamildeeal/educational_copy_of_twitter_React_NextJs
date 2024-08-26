"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/userAuth";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { SyncLoader } from "react-spinners";

const LoginModal = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("test123");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let runfinally = true;
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      setPassword("");
      setEmail("");
      return user.user;
    } catch (error) {
      runfinally = false;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Invalid password or email address!",
        showConfirmButton: true,
      });
    } finally {
      if (runfinally) router.push("/home");
      setLoading(false);
    }
  };

  return (
    <div>
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
              />
            </div>
            <div className={styles.body}>
              <h2>Login to X service</h2>
              <div className={styles.buttonLoginWith}>
                Login with google{" "}
                <span>
                  - currently <br /> disabled
                </span>
              </div>
              <div
                className={styles.buttonLoginWith}
                onClick={() => router.push("/home")}
              >
                Login with apple{" "}
                <span>
                  - currently <br />
                  disabled
                </span>
              </div>
              <div className={styles.orContainer}>
                <span className={styles.spanOr}></span>
                <p className={styles.spanP}>or</p>
                <span className={styles.spanOr}></span>
              </div>

              <div className={styles.form}>
                <div className={styles.textField}>
                  <TextField
                    type="mail"
                    className={styles.customTextField}
                    id="outlined-basic"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    variant="outlined"
                    label="Email address"
                  />
                </div>
                <div className={styles.textField}>
                  <TextField
                    type="password"
                    className={styles.customTextField}
                    id="outlined-basic"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    variant="outlined"
                    label="Password"
                  />
                </div>
                <button
                  className={styles.buttonNext}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Next
                </button>
              </div>

              <div className={styles.buttonLoginWith}>Forgot password?</div>
              <p className={styles.footer}>
                You dont have accout yet? {""}
                <span
                  className={styles.register}
                  onClick={() => {
                    setLoading(true);
                    router.push("/signup");
                  }}
                >
                  Register
                </span>
              </p>
              <p className={styles.footer_kam}>Kam-Tweet &copy; 2024</p>
            </div>
          </div>
          <div className={styles.helper}>
            Example email: <b>test@test.com</b>
            <br></br>
            Example password: <b>test123</b>
            <br></br>
            or create an account
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
