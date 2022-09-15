import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import Workspaces from '../components/Workspaces'
import { doc } from 'firebase/firestore'
import { db} from '../../firebase'
import Channels from '../components/Channels'
import { Box, Flex, Hide, Show } from '@chakra-ui/react'
import Loading from '../components/Loading'
import WelcomeChannel from '../components/WelcomeChannel'

const Workspace = () => {
  const { workspaceId }= useSelector(state => state.workspaceId)
  const workspaceID = workspaceId || 'null'
  const [workspace, loading, error] = useDocument(doc(db, 'workspaces', workspaceID))

  if(!workspaceId || error){
    return <Workspaces/>
  }

  if(loading){
    return <Loading />
  }

  return (
    <Flex h={'100vh'} w={'100vw'} >

      <Box flex={{base: 1,md: 0.2}} overflowY={'scroll'}>
        { workspace &&
          <Channels title={workspace?.data()?.name} />
        }
      </Box>
      
      <Hide below='md' >
        <Box flex={0.8} h={'100vh'} >
          <WelcomeChannel workspaceName={workspace?.data()?.name} />
        </Box>
      </Hide>

    </Flex>
  )
}

export default Workspace