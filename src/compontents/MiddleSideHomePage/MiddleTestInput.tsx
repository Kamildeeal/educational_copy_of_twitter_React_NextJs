import React, { useRef, useState } from "react";
import styles from "./MiddleTestInput.module.css";
import Image from "next/image";
import example_avatar from "../../../public/example_avatar.png";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { useUserAuth } from "@/context/userAuth";
import { auth } from "@/firebase/config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import SyncLoader from "react-spinners/SyncLoader";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/atoms/userAtom";

export default function MiddleTestInput() {
  const [input, setInput] = useState("");
  const filePickerRef = useRef<any>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // const { user } = useUserAuth();
  // const user = auth.currentUser?.providerData[0];
  const [loading, setLoading] = useState(false);
  // const user = auth.currentUser.providerData[0];
  const currentUser = useRecoilValue(userState);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    if (auth.currentUser) {
      const docRef = await addDoc(collection(db, "posts"), {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        text: input,
        timestamp: serverTimestamp(),
        firstName: currentUser.firstName,
      });

      const docRefId = doc(db, "posts", docRef.id);
      await addDoc(collection(docRefId, "likes"), {});
      await addDoc(collection(docRefId, "comments"), {});

      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      if (selectedFile) {
        await uploadString(imageRef, selectedFile, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, "posts", docRef.id), {
              image: downloadURL,
            });
          }
        );
      }
      setLoading(false);
      setInput("");
      setSelectedFile(null);
    } else {
      console.log("Something is wrong with user auth");
    }
  };

  const reader = new FileReader();
  const addImageToPost = (e: any) => {
    setLoading(true);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = async (readerEvent: any) => {
        const fileData = await readerEvent.target.result;
        setSelectedFile(fileData);
      };
      // console.log(selectedFile);
    }
    setLoading(false);
  };

  return (
    <>
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
      <div className={styles.wrapper}>
        <div className={styles.input_box}>
          <div className={styles.cointainer}>
            <button className={styles.set_btn}>For you</button>
            <button className={styles.set_btn}>Following</button>
            <button className={styles.gear_btn}>x</button>
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
                    className={styles.remove_imported_img_btn}
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
    </>
  );
}
