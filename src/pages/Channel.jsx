import { doc } from 'firebase/firestore'
import React, { useEffect} from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import {useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { useSelector} from 'react-redux'
import ChatContainer from '../components/ChatContainer'
import { Box, Flex, Hide, Spinner, Center } from '@chakra-ui/react'
import Channels from '../components/Channels'

const Channel = () => {
  const {channelId} = useParams()
  const { workspaceId }= useSelector(state => state.workspaceId)
  const workspaceID = workspaceId || 'null'
  const [workspace] = useDocument(doc(db, 'workspaces', workspaceID))
  const [channel, loading] = useDocument(doc(db, 'workspaces',workspaceID, 'channels', channelId))
  const navigate = useNavigate()

  useEffect(
    () => {
      if(!workspaceId){
        navigate('/')
      }
    }, [workspaceId]
  )

  return (
    <Flex h={'100vh'} w={'100vw'} >

      <Hide below='md' >
        <Box flex={0.2} overflowY={'scroll'} >
            {
              loading ?
              <Center h={'100vh'} bg={'rgb(62, 14, 64)'} flex={0.2}>
                <Spinner color='pink.200' size={'lg'}/>
              </Center >
              :
              <Channels title={workspace?.data().name} />
            }
        </Box>
      </Hide>

      <Box flex={{base: 1,md: 0.8}} h={'100vh'} overflowY={'scroll'} >
        <ChatContainer channelId={channelId} title={channel?.data().name} />
      </Box>

    </Flex>
  )
}

export default Channel