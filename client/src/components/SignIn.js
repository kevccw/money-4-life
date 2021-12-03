import React from 'react';
import { Session } from '../requests';
import { Link as ReactLink } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SignIn(props) {
  const { onSignIn } = props;
  console.log(props);

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    Session.create(params).then((user) => {
      if (user?.id) {
        onSignIn();
        props.history.push('home');
      }
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Welcome to Money 4 Life</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Sign in to your account!
          </Text>
        </Stack>
        <Box
          // rounded={'lg'}
          // bg={useColorModeValue('white', 'gray.700')}
          // boxShadow={'lg'}
          p={5}
        >
          <form>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input type='email' placeholder='Email' />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input type='password' placeholder='Password' />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                  onSubmit={handleSignIn}
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Box align='center'>
          <Text fontSize={'lg'} color={'gray.600'}>
            Don't have an account?{' '}
            <Link as={ReactLink} to='/sign_up' color={'blue.400'}>
              Sign Up!
            </Link>
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}