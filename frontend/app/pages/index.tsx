import { HomeEventList } from '@/_components/home-event-list';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { GetStaticProps } from 'next';

type AppEvent = {
  id: string
  name: string
  description: string
  location: string
  date: string
  organizer: string
}

type Props = {
  events: AppEvent[];
}

/**
 * トップページ
 */
function HomePage(props: Props) {
  /**
   * クライアントコンポーネントに渡す
   */
  return <HomeEventList events={props.events} />
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  if (getApps().length === 0) {
    const serviceAccount = require('../service-account.json');
    console.log("serviceAccount",serviceAccount)
    initializeApp({ credential: cert(serviceAccount) });
  }

  /**
   * イベント一覧を取得
   */
  const snap = await getFirestore().collection('events').get();
  
  const events = snap.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      location: data.location,
      date: data.date,
      organizer: data.organizer,
    } as AppEvent
  }) 

  return { props: { events } }
}

export default HomePage;