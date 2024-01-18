import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { Box, Text, Center, Button } from '@chakra-ui/react'; // Import Chakra UI components
import { GetStaticPaths, GetStaticProps } from 'next';
import useSWR from 'swr';
import { UpdateEventForm } from '@/_components/update-event-form';

type Params = {
  event: string;
}

type Props = { 
  eventId: string | null;
}

function EventDetails(props: Props) {
  const { data: event } = useSWR(`https://rails-production-6d55.up.railway.app/events/${props.eventId}`)

  if (typeof event === "undefined") {
    return null
  }

  if (props.eventId === null) {
    return null
  }

  return (
    <Center h="100vh">
      <UpdateEventForm
        eventId={props.eventId}
        name={event.name}
        description={event.description}
        prefecture={event.prefecture}
        location={event.location}
        date={event.date}
        organizer={event.organizer}
      />
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
