import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atoms/modalAtom";
import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { userState } from "@/atoms/userAtom";
import { useRouter } from "next/navigation";
import Modal from "react-modal";

const useCommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState<any>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const [isLoading, isSetLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  Modal.setAppElement("*");

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot: any) => {
      setPost(snapshot);
    });
  }, [postId, db]);

  const reader = new FileReader();
  const addImageToPost = (e: any) => {
    setLoading(true);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = async (readerEvent: any) => {
        const fileData = await readerEvent.target.result;
        setSelectedFile(fileData);
      };
      //   console.log(selectedFile);
    }
    setLoading(false);
  };
  async function sendComment() {
    isSetLoading(true);
    setLoading(true);
    const postRef = doc(db, "posts", postId);
    await addDoc(collection(postRef, "comments"), {
      userComment: input,
      userName: currentUser.firstName,
      userEmail: currentUser.email,
      timestamp: serverTimestamp(),
      userId: currentUser.uid,
    });

    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`);
  }

  return {
    open,
    setOpen,
    postId,
    setPostId,
    post,
    setPost,
    filePickerRef,
    loading,
    setLoading,
    selectedFile,
    setSelectedFile,
    input,
    setInput,
    isLoading,
    isSetLoading,
    addImageToPost,
    sendComment,
  };
};

export default useCommentModal;
