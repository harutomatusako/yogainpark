import { ChakraProvider, CSSReset, Box, Heading ,Button} from "@chakra-ui/react";
import Header from '../components/Header';


function HomePage() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={4}>
        <Heading as="h1" size="4xl">
          Welcome to about
        </Heading>
        <p>Life is supofa</p>
      </Box>
    </ChakraProvider>
  );
}

export default HomePage;
