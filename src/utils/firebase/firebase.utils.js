import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE732_K13_GzBCFk2Q2Pi8YYqpYLtiI9w",
  authDomain: "crwn-clothing-db-b3add.firebaseapp.com",
  projectId: "crwn-clothing-db-b3add",
  storageBucket: "crwn-clothing-db-b3add.appspot.com",
  messagingSenderId: "705670973336",
  appId: "1:705670973336:web:7ea9bcf67be49904f1cded",
};

export const firebaseapp = initializeApp(firebaseConfig);

const googleprovider = new GoogleAuthProvider();

googleprovider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleprovider);

export const db = getFirestore();

export const CreateUserDataFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};