"use client"

import { createUser } from "@/_mutations/create-user";
import { Box, Text, Heading ,ListItem ,UnorderedList ,Flex} from "@chakra-ui/react";
import useSWR from "swr";

export function HomeEventList() {
  const { data: events } = useSWR('http://localhost:3000/events')

  if (typeof events === "undefined") {
    return null
  }

  return (
    <div className={"flex flex-col space-y-4"}>
      <button onClick={() => {
        createUser({ email: "haruto@example.com" });
      }}>{"デバッグ（ユーザを追加する）"}</button>
      <div className={"p-4"}>
        <h1 className="text-4xl font-bold">
          Welcome to Yoga in the park
        </h1>
        <p>Life is supofa</p>
        {/* <EventForm /> */}
      </div>


      
      <UnorderedList>
      <Flex flexWrap="wrap" alignSelf="flex-end">
        {events.map((event: any) => (
          <ListItem key={event.id} mb={4} flex="0 0 25%">
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
                Location: {event.location}
              </Text>
              <Text fontSize="md">Date: {event.date}</Text>
            </Box>
          </ListItem>
        ))}
      </Flex>
    </UnorderedList>
    </div>
  );
}