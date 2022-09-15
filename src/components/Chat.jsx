import { doc } from 'firebase/firestore'
import React from 'react'
import { useDocument } from "react-firebase-hooks/firestore"
import { db } from '../../firebase'
import { Flex, Heading, Img, Box, Text, Skeleton} from '@chakra-ui/react'

const Chat = ({workspaceId,channelId, messageId }) => {
    const [message, loading] = useDocument(doc(db, 'workspaces',workspaceId, 'channels', channelId, 'messages', messageId))

    return(
        <Flex  my={6} w={'80%'} mx={4} zIndex={1}>
        {
            loading ?
            <>
            <Skeleton height={'40px'} width={'40px'} mr={3} my={1}/>
            <Box>
                <Flex my={1}>
                    <Skeleton height={'12.5px'} width={'50px'} mr={2} />
                    <Skeleton height={'7.5px'} width={'30px'} />
                </Flex>
                <Skeleton height={'20px'} width={'80px'} />

            </Box>

            </>
            :
            <>
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

            </>

        }
        </Flex>

    )
}

export default Chat

  