import React from 'react'
import logo from '../assets/slack-new-logo.svg'
import { Center} from '@chakra-ui/react'

const Loading = () => {
  return (
    <Center  h='100vh' w={'100vw'} bg={'purple.100'} >
      <img src={logo} className='loading-logo' />
    </Center>
  )
}

export default Loading