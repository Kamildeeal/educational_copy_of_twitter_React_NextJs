import React, { useRef, useState } from "react";
import styles from "./MiddleTestInput.module.css";
import Image from "next/image";
import example_avatar from "../../../public/example_avatar.png";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/config";
import { auth } from "@/firebase/config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import SyncLoader from "react-spinners/SyncLoader";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/userAtom";

export default function MiddleTestInput() {
  const [input, setInput] = useState("");
  const filePickerRef = useRef<any>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const currentUser = useRecoilValue(userState);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    console.log("loading post");
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

  const resizeImage = (fileData: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = fileData;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxSize = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height *= maxSize / width));
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width *= maxSize / height));
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL("image/jpeg");
        resolve(resizedDataUrl);
      };
    });
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size <= 5 * 1024 * 1024) {
      setLoading(true);
      reader.readAsDataURL(file);
      reader.onload = async (readerEvent) => {
        const fileData = readerEvent.target?.result as string;
        const resizedFileData = await resizeImage(fileData);
        setSelectedFile(resizedFileData);
        setLoading(false);
      };
    } else {
      alert("File size is to big! Maximum size is 5 MB!");
    }
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
