import React from "react";
import styles from "./MiddleInput.module.css";
import Image from "next/image";
import example_avatar from "../../public/example_avatar.png";
import SyncLoader from "react-spinners/SyncLoader";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/userAtom";
import useMiddleInput from "@/hooks/useMiddleSideInput";

export default function MiddleSideInput() {
  const currentUser = useRecoilValue(userState);

  const {
    input,
    setInput,
    selectedFile,
    setSelectedFile,
    loading,
    filePickerRef,
    sendPost,
    addImageToPost,
  } = useMiddleInput();

  return (
    <div className={styles.wrapper}>
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
      <div className={styles.input_box}>
        <div className={styles.cointainer}>
          <div className={styles.nav_btns}>
            <button className={styles.set_btn}>For you</button>
            <button className={styles.set_btn}>Following</button>
            <button className={styles.gear_btn}>x</button>
          </div>
        </div>
        <div className={styles.input_container}>
          <Image
            src={example_avatar}
            height={50}
            width={50}
            alt="user_avatar"
            className={styles.user_img}
          />
          <div className={styles.container_text}>
            <textarea
              className={styles.textarea}
              placeholder="What's happening?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            {selectedFile && (
              <div className={styles.container_uploaded_img}>
                <div className={styles.loader}></div>
                <p
                  onClick={() => setSelectedFile(null)}
                  className={styles.remove_imported_img}
                >
                  X
                </p>

                <img
                  className={styles.uploaded_img}
                  src={selectedFile}
                  alt="foto"
                />
              </div>
            )}
            <div className={styles.container_emojis}>
              <div className={styles.container_left}>
                <p
                  className={styles.add_photo}
                  onClick={() => {
                    filePickerRef.current.click();
                  }}
                >
                  🖼️
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                    onChange={addImageToPost}
                  />
                </p>
                <p className={styles.add_emoji}>😄</p>
              </div>
              <button
                onClick={sendPost}
                disabled={!input.trim()}
                className={styles.post_btn}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
