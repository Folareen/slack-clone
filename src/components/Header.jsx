import React, {useRef} from 'react'
import {signOut } from "firebase/auth";
import { auth } from '../../firebase';
import {useNavigate } from 'react-router-dom';
import { Avatar, Button, Flex, Input, Popover, PopoverTrigger, PopoverContent, Portal, Box} from '@chakra-ui/react';
import {ArrowForwardIcon, TimeIcon} from '@chakra-ui/icons'

const Header = ({user}) => {

    const navigate = useNavigate()
    const initRef = useRef()

    const logOut = () => {
        signOut(auth).then(() => {
            navigate('/')
        })
    }

  return (
    <Flex py={2} px={4} bg={'#360d37'} justify={'space-between'} alignItems={'center'} position={'fixed'} w={'full'} zIndex={5} top={0}>

        <Box flex={{base: 0, 'md' :0.2}}>
        </Box>

        <Flex flex={{base: 0.8, 'md':0.6}} textAlign={'right'} alignItems={'center'}>
            <TimeIcon  color={'white'} mx={2} />
            <Input focusBorderColor='whiteAlpha.300' placeholder='Search' size={'sm'} _placeholder={{color: 'white', textAlign: 'center'}} color={'white'} bg={'whiteAlpha.400'} border={'none'} rounded={'md'}/>
        </Flex >

        <Box flex={0.2} textAlign={'right'}>
            <Popover closeOnBlur={false} placement='bottom' initialFocusRef={initRef}>
            {() => (
                <>
                <PopoverTrigger>
                    <Avatar src={user?.photoURL} size={'sm'} _hover={{cursor: 'pointer'}} />
                </PopoverTrigger>
                <Portal>
                    <PopoverContent w={'max-content'} border={'none'} outline={'none'} bg={'none'} mx={1} >
                        <Button colorScheme='red' onClick={logOut} ref={initRef} w={'max-content'} >
                        Logout
                        <ArrowForwardIcon />
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

