import { ChakraProvider, CSSReset, Box, Heading } from "@chakra-ui/react";

function HomePage() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={4}>
        <Heading as="h1" size="2xl">
          Welcome to My Next.js App with Chakra UI
        </Heading>
        <p>This is your index page with Chakra UI.</p>
      </Box>
    </ChakraProvider>
  );
}

export default HomePage;
