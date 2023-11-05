import { useAuth, useUser } from '@/hooks/firebase';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';

function Header() {
  // const auth = useAuth();

  // const currentUser = useUser();
  
  const onLogout = async () => {
    try {
      await signOut(getAuth());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center">
        <Heading size="lg" color="white">
          Yoga in the park
        </Heading>
        <Spacer />
        <Button as={Link} href="/" colorScheme="teal" variant="outline" color="white">
          TOP
        </Button>
        <Button as={Link} href="/about" colorScheme="teal" variant="outline" color="white">
          About
        </Button>
        {/* {currentUser === undefined && (
          <Button as={Link} href="/signup" colorScheme="teal" variant="outline" color="white">
            新規登録
          </Button>
        )}
        {currentUser === undefined && (
          <Button as={Link} href="/signin" colorScheme="teal" variant="outline" color="white">
            Log in
          </Button>
        )}
        <Button onClick={onLogout} colorScheme="teal" variant="outline" color="white">
          {"Log out"}
        </Button> */}
        <Button as={Link} href="/signup" colorScheme="teal" variant="outline" color="white">
          新規登録
        </Button>
        <Button as={Link} href="/signin" colorScheme="teal" variant="outline" color="white">
          Log in
        </Button>
        <Button onClick={onLogout} colorScheme="teal" variant="outline" color="white">
          {"Log out"}
        </Button>
      </Flex>
    </Box>
  );
}





export default Header;
