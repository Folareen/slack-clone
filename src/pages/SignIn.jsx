import React from 'react'
import { signInWithPopup} from "firebase/auth";
import { auth } from '../../firebase';
import { GoogleAuthProvider } from "firebase/auth";
import {useNavigate } from 'react-router-dom';
import { Box, Button, Center, Heading, Link, Text} from '@chakra-ui/react';
import logo from '../assets/slack-new-logo.svg'

const SignIn = () => {
  const navigate = useNavigate()

  const signIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then(()=> {navigate('/')})
  }

  return (
    <Center h={'100vh'} w={'100vw'}>
      <Box >
        <Heading as='h1' mb={5}>
          Welcome to Slack!
        </Heading>
        <Box boxShadow={'xl'} p={4} border='1px' borderColor='whiteAlpha.400' rounded='md' textAlign={'center'}>
          <img src={logo} style={{width: '5rem', height: '5rem', margin: '2rem auto'}}/>
          <Button onClick={signIn} colorScheme={'pink'} w={'full'} >
            Sign In with Google
          </Button>
        </Box>
      </Box>
      <Text position='fixed' bottom={'10px'} p={1}>
        Developed By <Link href='https://www.twitter.com/_folareen_' target={'blank'} bg={'pink.100'} rounded={'sm'} p={1}>
          Folareen 👨‍💻
        </Link>
      </Text>
    </Center>
  )
}

export default SignIn