import { useEffect } from 'react'
import { collection, addDoc} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import {useSelector, useDispatch} from 'react-redux'
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import { Box, Flex, Heading, Button, Popover, PopoverTrigger, PopoverContent, Portal, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, Input, useDisclosure, Link } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronLeftIcon, EditIcon, AtSignIcon, ChatIcon, ChevronRightIcon, SmallAddIcon} from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import { leaveWorkspace } from '../features/workspaceSlice'

const channelItems = [
    {icon: <ChatIcon />, title : 'Direct messages'},
    // {icon: , title :'Unread messages' },
    // {icon: , title :'Unread messages' },
]

const ChannelOption = ({onClick, children}) => {
    return (
        <Text bg={'rgb(62, 14, 64)'} color={'whiteAlpha.800'} _hover={{backgroundColor: '#360d37', cursor: 'pointer'}} p={2} onClick={onClick} display={'flex'} alignItems={'center'} fontWeight={'light'}>
            {children}
        </Text>
    )
}

const ChannelLink = ({title, id}) => {
    return(
    <Link bg={'rgb(62, 14, 64)'} color={'whiteAlpha.800'} _hover={{backgroundColor: '#360d37', cursor: 'pointer', textDecoration: 'none'}} fontWeight={'light'} p={2} display={'flex'} as={RouterLink} alignItems={'center'} to={`/${id}`} >
        # {title}
    </Link>
    )
}

const Channels = ({title}) => {
    const { workspaceId }= useSelector(state => state.workspaceId)
    const workspaceID = workspaceId || 'null'
    const [channels, loading] = useCollection(collection(db, "workspaces", workspaceID, "channels"))
    const initRef = useRef()
    const dispatch = useDispatch()
    const [newChannel, setNewChannel] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ showAllOptions, setShowAllOptions] = useState(false)
    const [showAllChannels, setShowAllChannels] = useState(true)
    const navigate = useNavigate()

    const addNewChannel = async () => {
        await addDoc(collection(db, "workspaces", workspaceId, "channels"), {
        name: newChannel
        })
        onClose()
        setNewChannel('')
        setShowAllChannels(true)
    }

    useEffect(
        () => {
        if(!workspaceId){
            navigate('/')
        }
        }, [workspaceId]
    )

  return (
    <Box pt={'48px'} bg={'rgb(62, 14, 64)'} minH={'100vh'} >

        <Flex alignItems={'center'} justify={'space-between'} p={1.5} borderTop='1px' borderTopColor='whiteAlpha.400' position={'sticky'} top={'48px'} bg={'rgb(62, 14, 64)'}>
            <Popover closeOnBlur={false} placement='bottom' initialFocusRef={initRef} >
            {() => (
                <>
                <PopoverTrigger>
                    <Heading as={'h3'} fontSize={'xl'} textTransform={'capitalize'} fontWeight={'normal'} color={'white'} _hover={{cursor: 'pointer'}}>
                        {title}
                        <ChevronDownIcon color={'white'}/>
                    </Heading>
                </PopoverTrigger>
                <Portal >
                    <PopoverContent w={'max-content'} border={'none'} outline={'none'} bg={'none'} mx={1}>
                        <Button colorScheme='red' onClick={()=>{dispatch(leaveWorkspace())}} ref={initRef} w={'max-content'} >
                        <ChevronLeftIcon />
                        Leave Workspace
                        </Button>
                    </PopoverContent>
                </Portal>
                </>
            )}
            </Popover>
            <Button p={1} borderRadius={'50%'}>
                <EditIcon />
            </Button>
        </Flex>

        <Box p={2} borderTop='1px' borderTopColor='whiteAlpha.400' >

            <ChannelOption >
                <AtSignIcon/>
                <Text as={'span'} ml={1} >
                    Mentions and reactions
                </Text>
            </ChannelOption>

            <ChannelOption onClick={() => setShowAllOptions(!showAllOptions)}>
                {showAllOptions ? <ChevronDownIcon /> : <ChevronRightIcon /> }
                <Text ml={1} as={'span'}>
                    More
                </Text>
            </ChannelOption >

            {showAllOptions &&
                channelItems.map(({icon, title}, index) => {
                    return (
                        <ChannelOption key={index} >
                            {icon}
                            <Text as={'span'} ml={1}>
                                {title}
                            </Text>
                        </ChannelOption >
                    )
                })
            }

        </Box>

        <Box p={2} borderTop='1px' borderTopColor='whiteAlpha.400'>
            <ChannelOption onClick={() => setShowAllChannels(!showAllChannels)}>
                {showAllChannels ? <ChevronDownIcon /> : <ChevronRightIcon /> }
                <Text ml={1} as={'span'}>
                    Channels
                </Text>
            </ChannelOption >

            <ChannelOption onClick={onOpen}>
                <SmallAddIcon />
                <Text ml={1} as={'span'}>
                    Add Channel
                </Text>
            </ChannelOption >

            {showAllChannels &&
                (!loading && channels ) && <>
                    {
                    channels?.docs.map((doc) => {
                        return(
                    <ChannelLink key={doc.id} id={doc.id} title={doc.data().name} />)
                    }
                    )
                    }
                </>
            }
            
            <Modal isOpen={isOpen} onClose={onClose}  >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new channel</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Input type='text' value={newChannel} onChange={(e)=> setNewChannel(e.target.value)} />
                            <Button colorScheme={'blue'} disabled={!((newChannel.length > 0) && (newChannel !== ' '))} my={3} onClick={addNewChannel}>
                                Add
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>


    </Box>
  )
}

export default Channels