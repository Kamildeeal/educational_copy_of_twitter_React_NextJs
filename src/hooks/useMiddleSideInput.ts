import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/userAtom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth } from "@/firebase/config";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";

interface MiddleInputData {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  selectedFile: string | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  filePickerRef: React.MutableRefObject<HTMLInputElement | any>;
  sendPost: () => Promise<void>;
  addImageToPost: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useMiddleInput = (): MiddleInputData => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const currentUser = useRecoilValue<any>(userState);

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

      await addDoc(collection(docRefId, "likes", currentUser?.uid), {
        username: currentUser?.firstName,
      });

      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      if (selectedFile) {
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }

      setLoading(false);
      setInput("");
      setSelectedFile(null);
    } else {
      console.log("Something is wrong with user auth");
    }
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = async (readerEvent) => {
        if (readerEvent.target?.result) {
          const fileData = readerEvent.target.result as string;
          setSelectedFile(fileData);
        }
      };
    }
    setLoading(false);
  };

  return {
    input,
    setInput,
    selectedFile,
    setSelectedFile,
    loading,
    setLoading,
    filePickerRef,
    sendPost,
    addImageToPost,
  };
};

export default useMiddleInput;
