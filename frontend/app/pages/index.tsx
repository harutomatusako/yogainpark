import { HomeEventList } from '@/_components/home-event-list';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { GetStaticProps } from 'next';

/**
 * トップページ
 */
function HomePage() {
  return <HomeEventList />
}

export default HomePage;