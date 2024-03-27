import { useUserAuth } from "@/context/userAuth";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useCreateAccAndAddUserToStore() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: any) => {
    e.preventDefault();

    if (!firstName || !email || !password || !confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Password should inclucde minimum 6 characters!",
        showConfirmButton: true,
      });
    }

    if (password != confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Password fields aren't same.",
        showConfirmButton: true,
      });
    }

    const userData: any = {
      firstName,
      email,
    };

    //HELPER FLAG TO SEE IF EVERYTINGH WENT CORRECT
    let runfinally = true;

    try {
      // const user = await createUserWithEmailAndPassword(auth, email, password);
      // console.log({ user });
      // await addDoc(collection(db, "users"), {
      //   ...userData,
      // });
      //NOTE - setDoc is overwrtting data that exists
      //question - new doc in collection (addDoc) also have UID, why it doesnt work later with onAuthStateChanged?

      const user = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", user.user.uid), {
        ...userData,
      });

      setEmail("");
      setPassword("");

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: `${firstName}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      console.error(e);
      runfinally = false;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Email addres ${email} is already used`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } finally {
      if (runfinally) router.push("/login");
    }
  };

  return {
    firstName,
    setFirstName,
    email,
    setEmail,
    password,
    setPassword,
    handleSignUp,
    router,
    setConfirmPassword,
    confirmPassword,
  };
}
