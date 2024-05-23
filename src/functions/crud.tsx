import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { QuerySnapshot } from "firebase-admin/firestore";

const generateRandomID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomID = "";

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters[randomIndex];
  }

  return randomID;
};

export const createData = async (collectionName: any, data: any) => {
  const id: any = generateRandomID;
  try {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, { id, ...data });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const readData = async (collection: any, id: any) => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error reading document:", error);
  }
};

export const updateData = async (collection: any, id: any, data: any) => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, {
      id: id,
      ...data,
    });
    console.log("Document succesfully updateted");
  } catch (error) {
    console.error;
  }
};

//add delete check "are you sure to delete this file?"
export const deleteData = async (collection: any, id: any) => {
  try {
    const docRef = doc(db, collection, id);
    await deleteDoc(docRef);
    console.log("Doc succesfully deleted");
  } catch (error) {
    console.error;
  }
};

export const readAllData = async (collectionName: any) => {
  try {
    const newDataArr: any = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      newDataArr.push(doc.data());
    });
  } catch (error) {
    console.error;
  }
};

export const listenToCollection = (collectionName: any, callback: any) => {
  const collectionRef = collection(db, collectionName);

  return onSnapshot(collectionRef, (querySnapshot) => {
    const newDataArr: any = [];
    querySnapshot.forEach((doc) => {
      newDataArr.push(doc.data());
    });
    callback(newDataArr);
  });
};
