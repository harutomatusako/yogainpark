"use client"

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { AppContext } from "@/_contexts/app-context";
import { createUser } from "@/_mutations/create-user";

type Inputs = {
  email: string;
  password: string;
  confirmationPassword: string;
  username: string;
};

export function SignUpForm() {
  const appContext = useContext(AppContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const toast = useToast()

  const currentUser = appContext.currentUser

  // const auth = useAuth();
  
  const [isProcessingSignup, setIsProcessingSignup] = useState(false);
  const router = useRouter();
  const signup = async (email: string, password: string) => {
    try {
      setIsProcessingSignup(true);
      await createUserWithEmailAndPassword(getAuth(), email, password);
      await createUser({ email });
      setIsProcessingSignup(false);
    } catch (e) {
      console.error(e);
      setIsProcessingSignup(false);
      if (e instanceof Error) {
        toast({status: "error", description: e.message})
      }
    }
  };
  const onSubmit: SubmitHandler<Inputs> = ({
    email,
    password,
    confirmationPassword,
  }) => {
    if (password === confirmationPassword) {
      signup(email, password);
    } else {
      alert("パスワードが一致しません");
    }
  };

  useEffect(() => {
    if (currentUser) router.push("/");
  }, [currentUser, router]);

  return (
    
    <Flex>
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading color="gray.800" mb="48px" textAlign="center" size="xl">
          ユーザー登録
        </Heading>
        <Box
          boxShadow="lg"
          w="600px"
          paddingY="120px"
          paddingX="32px"
          borderRadius="8px"
          border="1px solid"
          borderColor="gray.100"
          m="0 auto"
          display="flex"
        >
          <Box w="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
            　<FormLabel fontWeight="bold">ユーザー名</FormLabel>
              {errors.username && (
                <Text color="red.400" mb="8px">
                  ユーザー名は必須です
                </Text>
              )}
              <Input
                type="text"
                size="lg"
                mb="8"
                placeholder="ユーザー名"
                {...register("username", { required: true })}
              />
              <FormLabel fontWeight="bold">Eメール</FormLabel>
              {errors.email && (
                <Text color="red.400" mb="8px">
                  Eメールは必須です
                </Text>
              )}
              <Input
                type="email"
                size="lg"
                mb="8"
                placeholder="example@test.com"
                {...register("email", { required: true })}
              />

              <FormLabel fontWeight="bold">パスワード</FormLabel>
              {errors.password && (
                <Text color="red.400" mb="8px">
                  パスワードは必須です
                </Text>
              )}
              <Input
                type="password"
                {...register("password", { required: true })}
                size="lg"
                mb="8"
              />
              <FormLabel fontWeight="bold">パスワード再入力</FormLabel>
              {errors.confirmationPassword && (
                <Text color="red.400" mb="8px">
                  パスワード再入力は必須です
                </Text>
              )}
              <Input
                type="password"
                {...register("confirmationPassword", { required: true })}
                size="lg"
                mb="8"
              />

              <Flex flexDirection="column">
                <Text mb="8" textAlign="center">
                  <Link href="/signin">アカウントをお持ちの方はこちら</Link>
                </Text>
                <Button
                  type="submit"
                  color="white"
                  background="teal"
                  size="lg"
                  paddingX="80px"
                  m="0 auto"
                  isLoading={isProcessingSignup}
                  _hover={{
                    background: "gray.700",
                  }}
                >
                  {"サインアップ"}
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Box>
      {/* <Image
        w="50%"
        h="100vh"
        alt="カバー画像"
        src="https://images.unsplash.com/photo-1652554715588-60c932f66a0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
      /> */}
      
    </Flex>
  );
}