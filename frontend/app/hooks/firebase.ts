import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";


// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCjknOD6KwPAVI1HbY2n45Tz8nJy_2Kxw0",
  authDomain: "yogainpark-88488.firebaseapp.com",
  projectId: "yogainpark-88488",
  storageBucket: "yogainpark-88488.appspot.com",
  messagingSenderId: "17403037402",
  appId: "1:17403037402:web:370bbfba82e83da95a07e3",
  measurementId: "G-HST8FC4YZV"
};



// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

export function useAuth() { 
  return getAuth();
}

export function useUser() {
  const [user, setUser] = useState<User>();
  if (typeof window === "undefined") {
    return null
  }
  onAuthStateChanged(getAuth(), (user) => {
    if (user) setUser(user);
  });
  return user;
}