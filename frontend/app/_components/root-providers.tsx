"use client"

import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { initializeApp, getApps } from "firebase/app";
import { AppContextProvider } from "./app-context-provider";
import { CacheProvider } from "@chakra-ui/next-js"
import { SWRConfig } from 'swr'

type Props = {
  children: React.ReactNode
}

export const RootProviders = (props: Props) => {
  return (
    <AppContextProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
      <CacheProvider>
        <ChakraProvider>
          <CSSReset />
          {props.children}
        </ChakraProvider>
      </CacheProvider>
      </SWRConfig>
    </AppContextProvider>
  )
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