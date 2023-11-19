import { getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

type Props = {
  name: string
  description: string
  prefecture: string
  location: string
  organizer: string
  date: string
}

 /**
 * イベントを更新する
 */
export const updateEvent = async (eventId: string, props: Props) => {
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyCjknOD6KwPAVI1HbY2n45Tz8nJy_2Kxw0",
      authDomain: "yogainpark-88488.firebaseapp.com",
      projectId: "yogainpark-88488",
      storageBucket: "yogainpark-88488.appspot.com",
      messagingSenderId: "17403037402",
      appId: "1:17403037402:web:370bbfba82e83da95a07e3",
      measurementId: "G-HST8FC4YZV"
    };
    if (typeof window !== "undefined" && getApps().length === 0) {
      initializeApp(firebaseConfig)
    }

    /**
     * 書き込む先のコレクション
     * 参考: https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja
     */
    const ref = doc(getFirestore(), "events", eventId)
    /**
     * 追加するイベントのデータ
     */
    const data = {
      name: props.name,
      description: props.description,
      location: props.location,
      prefecture: props.prefecture,
      date: props.date,
      organizer: props.organizer,
      updatedAt: new Date(),
    }
    // イベントを書き込む
    await updateDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
}
