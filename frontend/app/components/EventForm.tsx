import { createEvent } from '@/_mutations/createEvent';
import { useAuth, useUser } from '@/hooks/firebase';
import { Box, Input, Heading, Spacer, Button } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { useState } from 'react';

export const EventForm: React.FC = () => {
  const [name, setName] = useState("");
  
  /**
   * イベントを作成する
   */
  const onCreate = async () => {
    try {
      // await createEvent({
      //   name: name,
      //   description: "サンプルのイベントです",
      //   place: "東京都渋谷区",
      //   time: new Date(),
      // });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box bg="teal.500" p={4}>
      <Heading size="md" color="white">{"イベント作成"}</Heading>
      <Input value={name} onChange={(e) => {
        setName(e.target.value)
      }} />
      <Button onClick={onCreate}>{"追加"}</Button>
    </Box>
  );
}
