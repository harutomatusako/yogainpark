import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { Box, Text, Center, Button } from '@chakra-ui/react'; // Import Chakra UI components
import { GetStaticPaths, GetStaticProps } from 'next';
import useSWR from 'swr';
import { deleteEvent } from '@/_mutations/delete-event';
import { useRouter } from 'next/router';

type Params = {
  event: string;
}

type Props = { 
  eventId: string | null;
}

function EventDetails(props: Props) {
  const router = useRouter()

  const { data: event } = useSWR(`http://localhost:3000/events/${props.eventId}`)

  if (typeof event === "undefined") {
    return null
  }

  const onDelete = async () => {
    if (props.eventId === null) return
    deleteEvent(props.eventId)
    alert('削除しました')
    router.push('/')
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
        <Button onClick={onDelete} mt={6} colorScheme="teal">
          削除
        </Button>
      </Box>
    </Center>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  if (context.params === undefined) {
    return { props: { eventId: null } }
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
