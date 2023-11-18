// events/show.tsx

import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const EventDetails = ({ eventId }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // eventIdを使用してイベントの詳細情報を取得するAPIリクエストを行う
    // ここではAPIリクエストのコードは示していませんが、実際のAPIに合わせて取得処理を実装してください
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
        } else {
          console.error('イベントの詳細情報を取得できませんでした');
        }
      } catch (error) {
        console.error('エラー:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) {
    return (
      <Box>
        <Text>イベント詳細情報を読み込んでいます...</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>{event.name}</Text>
      <Text>{event.description}</Text>
      <Text>開催場所: {event.location}</Text>
      <Text>開催日時: {event.date}</Text>
      <Text>開催者名: {event.organizer}</Text>
    </Box>
  );
};

export default EventDetails;
