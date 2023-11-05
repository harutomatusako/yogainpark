import { getApps, initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc } from "firebase/firestore";

type Props = {
  name: string
  description: string
  place: string
  time: Date
}

 /**
 * イベントを作成する
 */
export const createEvent = async (props: Props) => {
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
    const ref = collection(getFirestore(), "events")
    /**
     * 追加するイベントのデータ
     */
    const data = {
      name: props.name,
      description: props.description,
      place: props.place,
      time: props.time,
      createdAt: new Date(),
    }
    // イベントを書き込む
    await addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
}
