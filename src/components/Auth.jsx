import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error(err);
      }
  };
  const signInGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider)
      } catch (err) {
        console.error(err);
      }
  };
  const signOutAll = async () => {
    try {
        await signOut(auth)
      } catch (err) {
        console.error(err);
      }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>sign in</button>
      <button onClick={signInGoogle}>Sign in with google</button>
      <button onClick={signOutAll}>Sign out</button>
    </>
  );
};

export default Auth;
