import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { auth, db } from "@/firebase/config";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/userAtom";
import { Comment, Post } from "@/types/types";

const usePostPageLogic = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [post, setPost] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[] | any[]>([]);

  const idToString = useParams() as { id: string };
  const id = idToString.id;

  //fetch post
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "posts", id), (snapshot: any) => {
      setPost(snapshot.data());
    });

    return () => unsubscribe();
  }, [db, id]);

  // fetch post's comments
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        )
      );
      const commentsData = querySnapshot.docs;
      setComments(commentsData);
    };

    fetchData();
  }, [db, id]);

  const handleLogout = () => {
    auth.signOut();
    setCurrentUser({
      email: "",
      uid: "",
      image: "",
      text: "",
      timestamp: "",
      firstName: "",
    });
    sessionStorage.removeItem("user");
    router.push("/");
  };

  return { currentUser, post, comments, handleLogout, id };
};

export default usePostPageLogic;
