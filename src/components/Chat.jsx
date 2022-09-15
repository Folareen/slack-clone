import { doc } from 'firebase/firestore'
import React from 'react'
import { useDocument } from "react-firebase-hooks/firestore"
import { db } from '../../firebase'
import { Flex, Heading, Img, Box, Text} from '@chakra-ui/react'

const Chat = ({workspaceId,channelId, messageId }) => {
    const [message, loading] = useDocument(doc(db, 'workspaces',workspaceId, 'channels', channelId, 'messages', messageId))

    return(
        (!loading && message) &&

        <Flex  my={6} w={'80%'} mx={4} >
            <Img src={message?.data().photoUrl} alignSelf={'self-start'} rounded={'md'} boxSize={'40px'} mr={3} borderWidth='1px' borderColor='gray.100' borderStyle={'solid'} />

            <Box>
                <Flex>
                    <Heading as={'h5'} fontSize={'md'} mr={2}>
                        {message?.data().name}
                    </Heading>
                    <Text fontSize={'x-small'}>
                        { 
                        new Date(message?.data().time?.toDate()).toUTCString()
                        }
                    </Text>
                </Flex>
                <Text fontSize={'sm'}>
                    {message?.data().message}
                </Text>

            </Box>

        </Flex>

    )


  return (
    <Flex>
        <Img />

        { (!loading && message) &&
        <>
            <Text>
                {message?.data().user}
            </Text>
            <Text>
                {message?.data().message}
            </Text>
            <Text>
                {message?.data().time}
            </Text>
        </>
        }
    </Flex>
  )
}

export default Chat

  