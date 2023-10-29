import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';

function Header() {
  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center">
        <Heading size="lg" color="white">
          Yoga in the park
        </Heading>
        <Spacer />
        <Button as="a" href="/" colorScheme="teal" variant="outline" color="white">
          TOP
        </Button>
        <Button as="a" href="/about" colorScheme="teal" variant="outline" color="white">
          About
        </Button>
        <Button as="a" href="/signup" colorScheme="teal" variant="outline" color="white">
          新規登録
        </Button>
        <Button as="a" href="/signin" colorScheme="teal" variant="outline" color="white">
          Log in
        </Button>
      </Flex>
    </Box>
  );
}





export default Header;
