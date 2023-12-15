"use client"

import { AppContext } from '@/_contexts/app-context';
import { useAuth, useUser } from '@/hooks/firebase';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useContext } from 'react';

export function AppHeader() {
  const appContext = useContext(AppContext);
  
  // const auth = useAuth();
  console.log(appContext)
 
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
        {appContext.isNotLoggedIn && (
          <Button as={Link} href="/signup" colorScheme="teal" variant="outline" color="white">
            新規登録
          </Button>
        )}
        {appContext.isNotLoggedIn && (
          <Button as={Link} href="/signin" colorScheme="teal" variant="outline" color="white">
            {"Log in"}
          </Button>
        )}
         {appContext.isLoggedIn && (
          <Button as={Link} href="/events/create" colorScheme="teal" variant="outline" color="white">
          イベント開催
       　 </Button>
        )}
        {appContext.isLoggedIn && (
          <Button onClick={onLogout} colorScheme="teal" variant="outline" color="white">
            {"Log out"}
          </Button>
        )}
        </Flex>
    </Box>
  );
}
