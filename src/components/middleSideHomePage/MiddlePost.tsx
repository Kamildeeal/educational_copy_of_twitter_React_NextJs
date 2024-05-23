import React, { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import ExamplePost from "./ExamplePost";
import FirebasePost from "./FirebasePost";
import { AnimatePresence, motion } from "framer-motion";

interface FirebasePostProps {
  id: number;
  post: any;
}

const MiddlePost = () => {
  const [posts, setPosts] = useState<any>([]);

  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const postsPerPage = 3;

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts"),
          orderBy("timestamp", "desc"),
          limit(postsPerPage * pageNumber)
        ),
        (snapshot: any) => {
          setPosts(snapshot.docs.map((doc: any) => doc));
        }
      ),

    [pageNumber]
  );

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isScrollingToBottom = scrollY + windowHeight >= documentHeight - 100;
    if (isScrollingToBottom && posts.length !== pageNumber * postsPerPage) {
      // console.log("ding dong");
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <AnimatePresence>
        {posts.map((post: FirebasePostProps) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <FirebasePost key={post.id} id={post.id} post={post} />
          </motion.div>
        ))}
        <ExamplePost />
      </AnimatePresence>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MiddlePost;
