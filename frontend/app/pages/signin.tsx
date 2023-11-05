import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // ログインに使用する関数をインポート
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth, useUser } from "../hooks/firebase";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // const auth = useAuth();
  const currentUser = useUser();
  const [isProcessingLogin, setIsProcessingLogin] = useState(false);
  const router = useRouter();
  const login = async (email: string, password: string) => {
    try {
      setIsProcessingLogin(true);
      await signInWithEmailAndPassword(getAuth(), email, password); // ログインを試みる
      setIsProcessingLogin(false);
      router.push("/"); // ログイン成功時にホームページにリダイレクト
    } catch (e) {
      console.error(e);
      setIsProcessingLogin(false);
      alert("ログインに失敗しました");
    }
  };

  useEffect(() => {
    if (currentUser) router.push("/"); // ログイン済みの場合はホームページにリダイレクト
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    login(email, password); // ログインを試みる
  };

  return (
    <Flex>
      <Box
        w="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading color="gray.800" mb="48px" textAlign="center" size="xl">
          ログイン
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

              <Flex flexDirection="column">
                <Text mb="8" textAlign="center">
                  <Link href="/signup">アカウントをお持ちでない方はこちら</Link>
                </Text>
                <Button
                  type="submit"
                  color="white"
                  background="gray.800"
                  size="lg"
                  paddingX="80px"
                  m="0 auto"
                  isLoading={isProcessingLogin}
                  _hover={{
                    background: "gray.700",
                  }}
                >
                  ログイン
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Box>
      <Image
        w="50%"
        h="100vh"
        alt="カバー画像"
        src="https://images.unsplash.com/photo-1652554715588-60c932f66a0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
      />
    </Flex>
  );
}
