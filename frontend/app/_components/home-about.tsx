"use client";

import { Box, Text, Heading, Center, VStack, Divider } from "@chakra-ui/react";

export function About() {
  return (
    <Center py={10} bg="gray.50">
      <VStack spacing={8} maxW="2xl" textAlign="center">
        <Box>
          <Heading as="h2" size="2xl" color="teal.500">
            サイトについて
          </Heading>
          <Divider my={4} />
          <Text fontSize="lg" color="gray.700">
            「Yoga in the park」は、ヨガを愛するすべての人のためのコミュニティです。私たちは、地元の公園でのヨガイベントを通じて、健康で活気に満ちた生活を促進します。
          </Text>
        </Box>

        <Box>
          <Heading as="h3" size="lg" color="teal.600">
            私たちのミッション
          </Heading>
          <Text fontSize="lg" color="gray.700" mt={2}>
            ヨガを通じて人々の生活に平和と調和をもたらすこと。初心者から上級者まで、すべてのレベルの参加者が歓迎されます。
          </Text>
        </Box>

        <Box>
          <Heading as="h3" size="lg" color="teal.600">
            使用方法
          </Heading>
          <Text fontSize="lg" color="gray.700" mt={2}>
            最新のヨガイベント情報を簡単に検索し、参加登録することができます。イベントは日時や場所で検索可能で、あなたにぴったりのクラスを見つけることができます。
          </Text>
          <Text fontSize="lg" color="gray.700" mt={2}>
            イベントに参加するには、簡単な登録が必要です。登録後、気に入ったイベントにすぐに参加申し込みができます。
          </Text>
        </Box>
      </VStack>
    </Center>
  );
}
