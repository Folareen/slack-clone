import React, {useState} from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase';
import {collection, addDoc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import {useDispatch} from 'react-redux'
import { enterWorkspace } from '../features/workspaceSlice';
import { Center, Button, Flex, Heading, Box, Spinner, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, Input } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'

const Workspaces = () => {
    const [workspaces, loading] = useCollection(query(collection(db, "workspaces"), orderBy('time', 'asc')));
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newWorkspace, setNewWorkspace] = useState('')

    const openModal = () => {
        if(workspaces.docs.length > 4){
            alert("Maximum number of allowed workspaces reached!")
        }else{
            onOpen()
        }
    }

    const createWorkspace = async () => {
        setNewWorkspace('')
        await addDoc(collection(db, "workspaces"), {
        name: newWorkspace,
        time: serverTimestamp()
        })
        onClose()
    }

  return (
    <Center h={'100vh'} w={'100vw'}>
        <Box boxShadow={'xl'} p={4} border='1px' borderColor='gray.100' rounded='md' textAlign={'center'} w={'85%'} maxW={'400px'}>
            <Heading as={'h2'} mb={5} mt={2} color={'purple.900'}>
                Workspaces
            </Heading>
            {
                loading?
                <Spinner color='#360d37' size={'lg'}/>
                :
                <Flex direction={'column'}>
                    {workspaces.docs.map((doc) => (
                    <Button key={doc.id}  onClick={()=>{dispatch(enterWorkspace(doc.id))}} my={2} p={5} colorScheme={'purple'} textTransform={'capitalize'}> 
                        {doc.data().name}
                    </Button>
                    ))
                    }
                    <Divider my={2}/>
                    <Button my={1} variant={'outline'} onClick={openModal}>
                        Create a new workspace
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}  >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create workspace</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <Input type='text' value={newWorkspace} onChange={(e)=> setNewWorkspace(e.target.value)} />
                                    <Button colorScheme={'blue'} disabled={!((newWorkspace.length > 0) && (newWorkspace !== ' '))} my={3} onClick={createWorkspace}>
                                        Create
                                    </Button>
                                </FormControl>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Flex>
            }
        </Box>

    </Center>
  )
}

export default Workspaces