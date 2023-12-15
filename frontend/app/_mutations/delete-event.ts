import { getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

 /**
 * イベントを削除する
 */
export const deleteEvent = async (eventId: string) => {
  try {
    const railsApiEndpoint = `http://localhost:3000/events/${eventId}`;

    // Rails APIにデータを送信
    const response = await fetch(railsApiEndpoint, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    // レスポンスをログに出力
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
