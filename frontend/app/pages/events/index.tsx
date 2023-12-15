import { Box, Text, Center, Card } from '@chakra-ui/react'; // Import Chakra UI components
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import useSWR from 'swr';

function EventsPage() {
  const { data: events } = useSWR('http://localhost:3000/events')

  if (typeof events === "undefined") {
    return null
  }

  console.log("events---", events);
  return (
    <Center h="100vh">
      {events.map((event: any) => (
        <Link href={`/events/${event.id}`} key={event.id}>
          <Card key={event.id}>
            <Text>
              {event.name}
            </Text>
            <Text>{event.date}</Text>
            <Text>
              {event.description}
            </Text>
            
            <Text>
              {event.location}
            </Text>

            <Text>
              {event.user.name}
            </Text>
            
          </Card>
        </Link>
      ))}
    </Center>
  );
};

export default EventsPage;
