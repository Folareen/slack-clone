import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import React, {useEffect, useRef, useState} from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { useSelector} from 'react-redux'
import Chat from './Chat'
import { Box, Flex, Text, Popover, PopoverTrigger, Heading, Portal, PopoverContent, Button, Input, FormControl, InputGroup, InputRightElement, Center} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronLeftIcon, QuestionOutlineIcon } from '@chakra-ui/icons'
import { FaTelegramPlane } from 'react-icons/fa';
import { useAuthState} from 'react-firebase-hooks/auth'

const ChatContainer = ({channelId, title}) => {
  const { workspaceId } = useSelector(state => state.workspaceId)
  const workspaceID = workspaceId || 'null'
  const [messages, loading] = useCollection(collection(db, "workspaces", workspaceID, "channels", channelId, 'messages'))

  const navigate = useNavigate()
  const initRef = useRef()
  const [newMessage, setNewMessage] = useState('')
  const [user] = useAuthState(auth);
  const containerRef = useRef()

  
  
  console.log(messages?.docs)
  console.log(user.displayName)

  const sendMessage = async(e) => {
      e.preventDefault()
      setNewMessage('')
      await addDoc(collection(db, "workspaces", workspaceID, "channels", channelId, 'messages'), {
      name: user.displayName,
      photoUrl: user.photoURL,
      message: newMessage,
      time: serverTimestamp()
      })
  }

  useEffect(
    () => {
      containerRef.current?.scrollIntoView({block: "end", behavior: 'smooth'});
    }, [messages]
  )

  if(loading){
    return(
      <div>
          loading
      </div>
    )
  }


  return (
    <Box minH={'100vh'} w={'100%'} pt={'48px'} pb={'60px'} position={'relative'} ref={containerRef}>

      <Flex alignItems={'center'} justify={'space-between'} p={3.5} borderBottom='1px' borderBottomColor='gray.300' position={'sticky'} top={'48px'} bg={'white'}>
          <Popover closeOnBlur={false} placement='bottom' initialFocusRef={initRef} >
          {() => (
              <>
              <PopoverTrigger>
                  <Heading as={'h2'} fontSize={'xl'} textTransform={'capitalize'} fontWeight={'normal'}  _hover={{cursor: 'pointer'}} >
                      # {title}
                      <ChevronDownIcon/>
                  </Heading>
              </PopoverTrigger>
              <Portal >
                  <PopoverContent w={'max-content'} border={'none'} outline={'none'} bg={'none'} mx={1}>
                      <Button colorScheme='red' onClick={()=> navigate('/')} ref={initRef} w={'max-content'} >
                      <ChevronLeftIcon />
                      Leave Channel
                      </Button>
                  </PopoverContent>
              </Portal>
              </>
          )}
          </Popover>

          <QuestionOutlineIcon />
      </Flex>

      <Box >
        {
          (!loading && messages.docs.length > 0) && <>
              {
              messages?.docs.map((doc) => {
                return(
                  <Chat workspaceId={workspaceID} channelId={channelId} messageId={doc.id} key={doc.id} />
                )
              })}
          </>
        }
        <Box position={'fixed'} bottom={5} width={{base: '100%', md: '80%'}}px={10} >
          <form onSubmit={sendMessage} style={{width: '100%'}}>
            <InputGroup size='lg' w={'100%'} bg={'white'} _focus={{border: 'none'}} rounded={'md'} >
              <Input pr='3.5rem' type={'text'} placeholder='Send message' value={newMessage} outline={'1px solid gray'} _focus={{border: 'none'}} onChange={(e)=>{setNewMessage(e.target.value)}} />
              <InputRightElement width='3rem' >
                <Button h='100%' size='sm' onClick={sendMessage} w={'100%'} type={'submit'}>
                  <FaTelegramPlane/>
                </Button>
              </InputRightElement>
            </InputGroup >
          </form>
        </Box>

      </Box>
    </Box>
  )
  
}

export default ChatContainer