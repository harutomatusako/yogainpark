import { getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

type Props = {
  name: string
  description: string
  prefecture: string
  location: string
  organizer: string
  date: string
  participant_ids?: number[]
}

 /**
 * イベントを更新する
 */
export const updateEvent = async (eventId: string, props: Props) => {
  try {
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
      user_id: 2,
      participant_ids: props.participant_ids ?? [],
    }  

    const railsApiEndpoint = `http://localhost:3000/events/${eventId}`;

    // Rails APIにデータを送信
    const response = await fetch(railsApiEndpoint, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // レスポンスをログに出力
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
