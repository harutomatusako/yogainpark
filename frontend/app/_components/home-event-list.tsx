"use client"

import { Box, Heading } from "@chakra-ui/react";

type Props = {
  /**
   * イベントの一覧
   */
  events: any[]
}

export function HomeEventList(props: Props) {
  return (
    <div className={"flex flex-col space-y-4"}>
      <div className={"p-4"}>
        <h1 className="text-4xl font-bold">
          Welcome to Yoga in the park
        </h1>
        <p>Life is supofa</p>
        {/* <EventForm /> */}
      </div>
      <ul>
        {props.events.map((event) => (
          <li key={event.id}>
            event: {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
}