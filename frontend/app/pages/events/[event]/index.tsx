import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { Box, Text, Center, Button } from '@chakra-ui/react'; // Import Chakra UI components
import { GetStaticPaths, GetStaticProps } from 'next';

type AppEvent = {
  id: string
  name: string
  description: string
  location: string
  date: string
  organizer: string
}

type Params = {
  event: string;
}

type Props = { 
  event: AppEvent | null;
}

function EventDetails(props: Props) {
  const event = props.event

  if (event === null) {
    return <div>{"データなし"}</div>
  }

  return (
    <Center h="100vh">
      <Box p={8} borderWidth="2px" borderRadius="lg" textAlign="center">
        <Text fontSize="4xl" fontWeight="bold" mb={6}>{event.name}</Text>
        <Text fontSize="xl" mb={4}>{event.description}</Text>
        <Text fontSize="lg">開催場所: {event.location}</Text>
        <Text fontSize="lg">開催日時: {event.date}</Text>
        <Text fontSize="lg">開催者名: {event.organizer}</Text>
        <Button mt={6} colorScheme="teal">
          参加する
        </Button>
      </Box>
    </Center>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  if (getApps().length === 0) {
    const serviceAccount = require('../../../service-account.json');
    initializeApp({ credential: cert(serviceAccount) });
  }

  if (context.params === undefined) {
    return { props: { event: null } }
  }

  const eventId = context.params?.event

  /**
   * イベント一覧を取得
   */
  const snap = await getFirestore().collection('events').doc(eventId).get();
  
  const data = snap.data() as any ?? null

  if (data === null) {
    return <Center h="100vh"><div>{"データなし"}</div></Center>
  }
 
  /**
   * 加工したイベントのデータ
   */ 
  const event: AppEvent = {
    id: snap.id,
    name: data.name,
    description: data.description,
    location: data.location,
    date: data.date,
    organizer: data.organizer,
  }

  return { props: { event } }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  if (getApps().length === 0) {
    const serviceAccount = require('../../../service-account.json');
    initializeApp({ credential: cert(serviceAccount) });
  }
  
  /**
   * RailsのAPIから取得する予定
   * イベント一覧を取得
   */
  const querySnap = await getFirestore().collection('events').get();
  
  const eventIds = querySnap.docs.map((doc) => {
    return doc.id
  })

  const paths = eventIds.map(eventId => {
    return {
      params: {
        event: eventId,
      }
    }
  })

  return {
    paths,
    fallback: true, 
  }
}

export default EventDetails;
