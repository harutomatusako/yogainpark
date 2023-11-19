import { HomeEventList } from '@/app/_components/home-event-list';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";

type Props = {
  events: any[];
}

/**
 * トップページ
 */
async function HomePage(props: Props) {
  if (getApps().length === 0) {
    const serviceAccount = require('../service-account.json');
    initializeApp({ credential: cert(serviceAccount) });
  }
  
  /**
   * イベント一覧を取得
   */
  const querySnap = await getFirestore().collection('events').get();
  
  const eventDocs = querySnap.docs.map((doc) => doc.data());
 
  /**
   * 加工したイベントのデータ
   */ 
  const events = eventDocs.map((event) => {
    return JSON.parse(JSON.stringify(event))
  })

  /**
   * クライアントコンポーネントに渡す
   */
  return <HomeEventList events={events} />
}

export default HomePage;
