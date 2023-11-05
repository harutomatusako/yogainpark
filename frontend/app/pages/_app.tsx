import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { getApps, initializeApp } from "firebase/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

if (typeof window !== "undefined" && getApps().length === 0) {
  const firebaseConfig = {
    apiKey: "AIzaSyCjknOD6KwPAVI1HbY2n45Tz8nJy_2Kxw0",
    authDomain: "yogainpark-88488.firebaseapp.com",
    projectId: "yogainpark-88488",
    storageBucket: "yogainpark-88488.appspot.com",
    messagingSenderId: "17403037402",
    appId: "1:17403037402:web:370bbfba82e83da95a07e3",
    measurementId: "G-HST8FC4YZV"
  };
  initializeApp(firebaseConfig)
}

export default MyApp;