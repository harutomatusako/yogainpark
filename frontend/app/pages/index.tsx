import { HomeEventList } from '@/_components/home-event-list';
import { About } from '@/_components/home-about';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import { GetStaticProps } from 'next';
import { Box, Heading, Text, Center } from '@chakra-ui/react';

/**
 * トップページ
 */
function HomePage() {
  const title = "Yoga in the park";
  const description = "あなたの身近な公園で、ヨガを始めましょう";

  return (
    <Box>
      <Box bg="teal.500" color="white" p={4} textAlign="center">
        <Heading as="h1" size="2xl">
          {title}
        </Heading>
        <Text fontSize="lg" mt={3}>
          {description}
        </Text>
      </Box>
      <Center>
        
      </Center>
      <About />
      <Center>
        <HomeEventList />
      </Center>
    </Box>
  );
}

export default HomePage;