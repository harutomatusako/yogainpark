"use client"

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Text,
  HStack, // HStackを追加
} from '@chakra-ui/react';
import { createEvent } from '../_mutations/createEvent';
import { updateEvent } from '../_mutations/updateEvent';

type Props = {
  eventId: string
  name: string;
  description: string;
  prefecture: string;
  location: string;
  date: string;
  organizer: string;
}

export const UpdateEventForm = (props: Props) => {
  const [eventName, setEventName] = useState(props.name);
  const [eventDescription, setEventDescription] = useState(props.description);
  const [eventPrefecture, setEventPrefecture] = useState(props.prefecture); // 開催都道府県
  const [eventLocation, setEventLocation] = useState(props.location); // 開催場所
  const [eventOrganizer, setEventOrganizer] = useState(props.organizer);

  const prefectures = [
    '北海道', '青森', '岩手', '宮城', '秋田', '山形', '福島', '茨城', '栃木', '群馬',
    '埼玉', '千葉', '東京', '神奈川', '新潟', '富山', '石川', '福井', '山梨', '長野',
    '岐阜', '静岡', '愛知', '三重', '滋賀', '京都', '大阪', '兵庫', '奈良', '和歌山',
    '鳥取', '島根', '岡山', '広島', '山口', '徳島', '香川', '愛媛', '高知', '福岡',
    '佐賀', '長崎', '熊本', '大分', '宮崎', '鹿児島', '沖縄',
  ];

  // 時間帯のオプションを生成
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour <= 20; hour++) { // 朝の6時から夜の20時まで
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    await updateEvent(props.eventId, {
      name: eventName,
      description: eventDescription,
      prefecture: eventPrefecture, // 開催都道府県
      location: eventLocation, // 開催場所
      date: props.date,
      organizer: eventOrganizer,
    });
  };

  return (
    <Box
      maxW="lg"
      m="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>イベントを編集</Text>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>イベント名:</FormLabel>
          <Input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>説明:</FormLabel>
          <Textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </FormControl>
        <HStack spacing={4} mt={4}> {/* HStackを使用してフォームを横に配置 */}
          <FormControl>
            <FormLabel>開催都道府県:</FormLabel>
            <Select
              value={eventPrefecture}
              onChange={(e) => setEventPrefecture(e.target.value)}
              required
            >
              <option value="">都道府県を選択</option>
              {prefectures.map((prefecture) => (
                <option key={prefecture} value={prefecture}>
                  {prefecture}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>開催する公園名:</FormLabel>
            <Input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              required
            />
          </FormControl>
        </HStack>
        <HStack spacing={4} mt={4}>
        {/* <FormControl mt={4}>
          <FormLabel>開催日:</FormLabel>
          <Input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </FormControl> */}
        {/* <FormControl mt={4}>
          <FormLabel>開催時間:</FormLabel>
          <Select
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
          >
            {generateTimeOptions().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl> */}
        </HStack>
        
        <Box mt={4} textAlign="center"> {/* ボタンを中央に配置 */}
          <Button colorScheme="teal" type="submit">
            変更
          </Button>
        </Box>
      </form>
    </Box>
  );
};
