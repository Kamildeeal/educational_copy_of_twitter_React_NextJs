import { useUserAuth } from "@/context/userAuth";
import { auth, db } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import Swal from "sweetalert2";

export default function useCreateAccAndAddUserToStore() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!firstName || !email || !password || !confirmPassword) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Password should inclucde minimum 6 characters!",
        showConfirmButton: true,
      });
    }

    if (password != confirmPassword) {
      setLoading(false);
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
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", user.user.uid), {
        ...userData,
        uid: user.user.uid,
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
        text: `Email addres "${email}" isn't correct`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } finally {
      setLoading(false);
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
    loading,
  };
}
