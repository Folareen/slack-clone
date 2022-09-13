import { Center, Text } from '@chakra-ui/react'
import React from 'react'

const WelcomeChannel = ({workspaceName}) => {
  return (
    <Center h={'100%'} w={'100%'}>
      <Text fontSize={'2xl'}>
        Welcome to {workspaceName}!.
      </Text>
    </Center>
  )
}

export default WelcomeChannel