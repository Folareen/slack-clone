import { Navigate, BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Loading from './components/Loading'
import SignIn from './pages/SignIn'
import Workspace from './pages/Workspace'
import Channel from './pages/Channel'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Header from './components/Header'
import Error from './pages/Error'

function App() {
  const [user, loading] = useAuthState(auth);

  if(loading){
    return(
      <Loading />
    )
  }

  return (
    <Router>
      {
        !user?
        <Routes>
          <Route path='/' element={<Navigate replace to="/sign-in" />}/>
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='*' element={<Error />} />
        </Routes>
        :
        <>
        <Header user={user}/>
        <Routes>
          <Route path='/' element={<Workspace/>}/>
          <Route path='/:channelId' element={<Channel/>} />
          <Route path='/sign-in' element={<Navigate replace to="/" />}/>
          <Route path='*' element={<Error />} />
        </Routes>
        </>
      }
    </Router>
  )
}

export default App
