"use client"

import { AppContext } from "@/_contexts/app-context"
import {
  getAnalytics,
  setUserId,
} from "firebase/analytics"
import {
  type User,
  getAuth,
  getIdTokenResult,
  onAuthStateChanged,
} from "firebase/auth"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

export const AppContextProvider = (props: Props) => {
  /**
   * 読み込み中
   */
  const [isLoading, setLoadingState] = useState(() => {
    return true
  })

  /**
   * ログイン中のユーザ
   */
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  /**
   * リロード
   */
  const refresh = async () => {
    const currentUser = getAuth().currentUser
    if (currentUser === null) {
      setCurrentUser(null)
      return
    }
    getIdTokenResult(currentUser, true).then((result) => {
      setCurrentUser(currentUser)
    })
  }

  /**
   * サイトが読み込まれたときに実行
   */
  useEffect(() => {
    if (typeof window === "undefined") return
    /**
     * ログイン状態を監視
     */
    onAuthStateChanged(getAuth(), (user) => {
      if (user === null) {
        setCurrentUser(null)
        setLoadingState(false)
        return
      }
      setCurrentUser(user)
      setLoadingState(false)
    })
  }, [])

  // 読み込み中
  if (isLoading) {
    const value = {
      isLoading: true,
      isNotLoading: false,
      isLoggedIn: false,
      isNotLoggedIn: false,
      currentUser: null,
      refresh: refresh,
    } as const
    return (
      <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    )
  }

  // 未ログイン
  if (
    currentUser === null 
  ) {
    const value = {
      isLoading: false,
      isNotLoading: true,
      isLoggedIn: false,
      isNotLoggedIn: true,
      currentUser: null,
      refresh: refresh,
    } as const
    return (
      <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    )
  }

  const value = {
    isLoading: false,
    isNotLoading: true,
    isLoggedIn: true,
    isNotLoggedIn: false,
    currentUser: currentUser,
    refresh: refresh,
  } as const

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  )
}
