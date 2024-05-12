import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/userAtom";
import { db, storage } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { Comment, Post } from "@/types/types";

interface FirebasePostData {
  likes: string[];
  hasLiked: boolean;
  comments: Comment[];
  loading: boolean;
  likePost: () => Promise<void>;
  deletePost: () => Promise<void>;
}

const useFirebasePost = (post: Post, id: string): FirebasePostData => {
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState<any>(userState);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot: any) => setLikes(snapshot.docs)
    );

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot: any) => setComments(snapshot.docs)
    );

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like: any) => like.id === currentUser?.uid) !== -1
    );
  }, [likes, currentUser]);

  async function likePost() {
    if (currentUser.uid) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", post.id, "likes", currentUser?.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", currentUser?.uid), {
          username: currentUser?.firstName,
        });
      }
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        await deleteObject(ref(storage, `posts/${id}/image`));
      }
    }
  }

  return {
    likes,
    hasLiked,
    comments,
    loading,
    likePost,
    deletePost,
  };
};

export default useFirebasePost;
