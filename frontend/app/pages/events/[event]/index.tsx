import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { Box, Text, Center, Button, Stack } from '@chakra-ui/react'; // Import Chakra UI components
import { GetStaticPaths, GetStaticProps } from 'next';
import useSWR from 'swr';
import { deleteEvent } from '@/_mutations/delete-event';
import { useRouter } from 'next/router';
import { updateEvent } from '@/_mutations/updateEvent';

type Params = {
  event: string;
}

type Props = { 
  eventId: string | null;
}

function EventDetails(props: Props) {
  const router = useRouter()

  const { data: event } = useSWR(`https://rails-production-6d55.up.railway.app/events/${props.eventId}`)

  if (typeof event === "undefined") {
    return null
  }

  const onDelete = async () => {
    if (props.eventId === null) return
    deleteEvent(props.eventId)
    alert('削除しました')
    router.push('/')
  }
  
  const onJoin = async () =>{
    if (props.eventId === null) return
    await updateEvent(props.eventId, {
      name: event.name,
      description: event.description,
      prefecture: event.prefecture, // 開催都道府県
      location: event.location, // 開催場所
      date: event.date,
      organizer: event.organizer,
      participant_ids: [3]
    });
    alert('参加しました')
  }


  return (
    <Center h="100vh">
      <Box p={8} borderWidth="2px" borderRadius="lg" textAlign="center">
        <Text fontSize="4xl" fontWeight="bold" mb={6}>{event.name}</Text>
        <Text fontSize="xl" mb={4}>{event.description}</Text>
        <p>{event.prefecture}</p>
        <Text fontSize="lg">開催場所: {event.location}</Text>
        <Text fontSize="lg">開催日時: {event.date}</Text>
        <Text fontSize="lg">開催者名: {event.organizer}</Text>
        <Button onClick={onJoin} mt={6} colorScheme="teal">
          参加する
        </Button>
        <Button onClick={onDelete} mt={6} colorScheme="teal">
          削除
        </Button>
      </Box>
      <Stack>
        <Text>{"参加者"}</Text>
        {event.participants.map((participant: any) => (
          <Text key={participant.id}>{participant.name}</Text>
        ))}
      </Stack>
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
