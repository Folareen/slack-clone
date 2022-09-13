import React, {useRef} from 'react'
import {signOut } from "firebase/auth";
import { auth } from '../../firebase';
import {useNavigate } from 'react-router-dom';
import { Avatar, Button, Flex, Input, Popover, PopoverTrigger, PopoverContent, Portal, Box} from '@chakra-ui/react';
import {TimeIcon} from '@chakra-ui/icons'

const Header = ({user}) => {

    const navigate = useNavigate()
    const initRef = useRef()

    const logOut = () => {
        signOut(auth).then(() => {
            navigate('/')
        })
    }

  return (
    <Flex py={2} px={4} bg={'#360d37'} justify={'space-between'} alignItems={'center'}>

        <Box flex={0.15} textAlign={'right'}>
            <TimeIcon  color={'white'} />
        </Box>

        <Input focusBorderColor='pink.300' placeholder='Search' flex={0.6} size={'sm'} />

        <Box flex={0.15} textAlign={'right'}>
            <Popover closeOnBlur={false} placement='bottom' initialFocusRef={initRef}>
            {() => (
                <>
                <PopoverTrigger>
                    <Avatar src={user?.photoURL} size={'sm'}  />
                </PopoverTrigger>
                <Portal>
                    <PopoverContent w={'max-content'}>
                        <Button colorScheme='red' onClick={logOut} ref={initRef} w={'max-content'} >
                        Logout
                        </Button>
                    </PopoverContent>
                </Portal>
                </>
            )}
            </Popover>
        </Box>

    </Flex>
  )
}

export default Header

