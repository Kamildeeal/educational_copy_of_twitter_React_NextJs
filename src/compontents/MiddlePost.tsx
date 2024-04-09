import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./MiddlePost.module.css";
import example_avatar from "../../public/example_avatar.png";
import { FaRocketchat } from "react-icons/fa6";
import { FaRegTrashAlt, FaHeart, FaChartBar } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import ExamplePost from "./ExamplePost";
import FirebasePost from "./FirebasePost";

interface FirebasePostProps {
  id: number; // Assuming id is of type string
  post: any; // Adjust this type according to your post data structure
}

const MiddlePost = () => {
  const [posts, setPosts] = useState<any>([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot: any) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  return (
    <div>
      {posts.map((post: FirebasePostProps) => (
        <FirebasePost key={post.id} id={post.id} post={post} />
      ))}
      <ExamplePost />
    </div>
  );
};

export default MiddlePost;
