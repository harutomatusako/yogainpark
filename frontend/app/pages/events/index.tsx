import { Box, Text, Center, Card } from '@chakra-ui/react'; // Import Chakra UI components
import { GetStaticPaths, GetStaticProps } from 'next';
import useSWR from 'swr';

function EventsPage() {
  const { data: events } = useSWR('http://localhost:3000/events')

  if (typeof events === "undefined") {
    return null
  }

  return (
    <Center h="100vh">
      {events.map((event: any) => (
        <Card key={event.id}>
          <Text>{event.date}</Text>
          <Text>
            {event.name}
          </Text>
          <Text>
            {event.description}
          </Text>
        </Card>
      ))}
    </Center>
  );
};

export default EventsPage;
