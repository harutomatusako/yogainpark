import { Flex, Box, Text, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';
import useSWR from 'swr';

function formatDateTime(dateString:any) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }as const;
  return new Intl.DateTimeFormat('ja-JP', options).format(new Date(dateString));
}

function EventsPage() {
  const { data: events } = useSWR('http://localhost:3000/events')

  if (!events) {
    return <Flex h="100vh" justify="center" align="center">読み込み中...</Flex>
  }

  return (
    <Flex wrap="wrap" justify="center" align="start" p={5}>
      {events.map((event:any) => (
        <Box key={event.id} p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg" m={2} w="300px">
          <LinkBox as="article">
            <Heading size="md" my={2}>
              <Link href={`/events/${event.id}`} passHref>
              <LinkOverlay _hover={{ textDecoration: 'underline' }}>{event.name}</LinkOverlay>
          </Link>
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={2}>{formatDateTime(event.date)}</Text>
            <Text color="gray.700" mb={2}>{event.description}</Text>
            <Text fontSize="sm" color="gray.600">場所: {event.location}</Text>
            <Text fontSize="sm" color="gray.600">主催者: {event.user.name}</Text>
          </LinkBox>
        </Box>
      ))}
    </Flex>
  );
};

export default EventsPage;
