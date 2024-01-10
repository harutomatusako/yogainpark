"use client"

import { createUser } from "@/_mutations/create-user";
import { Box, Text, Heading ,ListItem ,UnorderedList ,Flex,Center,Image} from "@chakra-ui/react";
import useSWR from "swr";

function formatDate(dateString:any) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }as const;
  return new Intl.DateTimeFormat('ja-JP', options).format(new Date(dateString));
}



export function HomeEventList() {
  const { data: events } = useSWR('http://localhost:3000/events')

  if (typeof events === "undefined") {
    return null
  }

  return (
<Center>
  <Box className="flex flex-col space-y-4 text-center">
    <UnorderedList>
      <Flex flexWrap="wrap" alignSelf="flex-end">
        {events.map((event: any) => (
          <ListItem key={event.id} mb={8} ml={4} mr={4} flex="0 0 10%" listStyleType="none">
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              boxShadow="md"
              width="100%"
            >
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {event.name}
              </Text>
              <Text fontSize="md" mb={2}>
                開催場所: {event.location}
              </Text>
              <Text fontSize="md">開催日時: {formatDate(event.date)}</Text>
            </Box>
          </ListItem>
        ))}
      </Flex>
    </UnorderedList>
  </Box>
</Center>

  );
}