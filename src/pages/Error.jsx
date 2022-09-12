import { Box, Center, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink} from 'react-router-dom'

const Error = () => {
  return (
    <Center h={'100vh'} w={'100vw'} bg={'red.100'}>
      <Box boxShadow={'lg'} p={4} border='1px' borderColor='gray.200' bg={'red.50'}>
        <Text color={'red'} mb={5} fontSize={'2xl'}>
          Page not found!.
        </Text>
        <Link as={RouterLink} to='/' textAlign={'center'} py={1} w={'full'} display={'block'} bg={'blue.100'}>
          Home
        </Link>
      </Box>
    </Center>
  )
}

export default Error