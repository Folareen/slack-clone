import { Flex, Center, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const WelcomeChannel = ({workspaceName}) => {
  return (
    <Center h={'100%'} w={'100%'}>
      <Flex fontSize={'2xl'} alignItems={'center'}>
        <Text p={2} >
          Welcome to 
        </Text>
        <Heading p={2} bg={'pink.100'} textTransform={'capitalize'} fontSize={'2xl'}>{workspaceName}</Heading>
      </Flex>

    </Center>
  )
}

export default WelcomeChannel