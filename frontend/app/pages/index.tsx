import { ChakraProvider, CSSReset, Box, Heading ,Button} from "@chakra-ui/react";
import Header from '../components/Header';
// import { useAuth, useUser } from "@/hooks/firebase";
import { EventForm } from "@/components/EventForm";


function HomePage() {
  // useAuth();

  // const currentUser = useUser();

  // if (currentUser !== undefined) {
  //   return <div>{"ログイン済みの人向けのコンテンツ"}</div>;
  // }

  return (
    <ChakraProvider>
      <Header />
      <CSSReset />
      <Box p={4}>
        <Heading as="h1" size="4xl">
          Welcome to Yoga in the park
        </Heading>
        <p>Life is supofa</p>
        <EventForm />
      </Box>
    </ChakraProvider>
  );
}

export default HomePage;
