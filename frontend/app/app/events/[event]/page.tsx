import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";

type Props = { 
  params: {
    event: string;
  }
}

async function EventDetails(props: Props) {
  console.log(props.params.event)

  if (getApps().length === 0) {
    const serviceAccount = require('../../../service-account.json');
    initializeApp({ credential: cert(serviceAccount) });
  }
  
  /**
   * イベント一覧を取得
   */
  const snap = await getFirestore().collection('events').doc(props.params.event).get();
  
  const eventData = snap.data() as any ?? null

  if (eventData === null) {
    return <div>{"データなし"}</div>
  }
 
  /**
   * 加工したイベントのデータ
   */ 
  const event = {
    id: snap.id,
    name: eventData.name,
    description: eventData.description,
    location: eventData.location,
    date: eventData.date,
    organizer: eventData.organizer,
  }

  console.log("データだよ", event)

  return (
    <div>
      <p>イベント詳細ページです</p>
      <p>{event.description}</p>
      {/* <p fontSize="2xl" fontWeight="bold" mb={4}>{event.name}</p>
      <p>{event.description}</p>
      <p>開催場所: {event.location}</p>
      <p>開催日時: {event.date}</p>
      <p>開催者名: {event.organizer}</p> */}
    </div>
  );
};

export default EventDetails;
