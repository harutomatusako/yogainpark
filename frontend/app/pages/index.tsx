import { ChakraProvider, CSSReset, Box, Heading ,Button} from "@chakra-ui/react";
import Header from '../components/Header';


function HomePage() {
  return (
    <ChakraProvider>
      <Header />
      <CSSReset />
      <Box p={4}>
        <Heading as="h1" size="4xl">
          Welcome to Yoga in the park
        </Heading>
        <p>Life is supofa</p>
      </Box>
    </ChakraProvider>
  );
}

export default HomePage;
