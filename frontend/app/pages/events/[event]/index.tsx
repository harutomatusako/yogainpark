import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { Box, Text, Center, Button } from '@chakra-ui/react'; // Import Chakra UI components
import { GetStaticPaths, GetStaticProps } from 'next';
import useSWR from 'swr';

type Params = {
  event: string;
}

type Props = { 
  eventId: string | null;
}

function EventDetails(props: Props) {
  const { data: event } = useSWR(`http://localhost:3000/events/${props.eventId}`)

  if (typeof event === "undefined") {
    return null
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
  if (context.params === undefined) {
    return { props: { event: null } }
  }

  const eventId = context.params!.event!

  return { props: { eventId } }
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = [] as any

  return {
    paths,
    fallback: true, 
  }
}

export default EventDetails;
