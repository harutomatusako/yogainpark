import { ChakraProvider, CSSReset, Box, Heading ,Button} from "@chakra-ui/react";
import Header from '../components/Header';
// import { useAuth, useUser } from "@/hooks/firebase";
import { EventForm } from "@/components/EventForm";
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";

type Props = {
  events: any[];
}

function HomePage(props: Props) {
  // useAuth();

  // const currentUser = useUser();

  // if (currentUser !== undefined) {
  //   return <div>{"ログイン済みの人向けのコンテンツ"}</div>;
  // }

  console.log(props);

  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={4}>
        <Heading as="h1" size="4xl">
          Welcome to Yoga in the park
        </Heading>
        <p>Life is supofa</p>
        {/* <EventForm /> */}
      </Box>
      <ul>
        {props.events.map((event) => (
          <li key={event.id}>
            {event.title} {event.description}
          </li>
        ))}
      </ul>
    </ChakraProvider>
  );
}

export async function getStaticProps() {
  if (getApps().length === 0) {
    const serviceAccount = require('../service-account.json');
    initializeApp({ credential: cert(serviceAccount) });
  }
  const querySnap = await getFirestore().collection('events').get();
  const events = querySnap.docs.map((doc) => doc.data());
  
  return {
    props: {
      events: events.map((event) => {
        return JSON.parse(JSON.stringify(event))
      })
    },
  }
}

export default HomePage;
