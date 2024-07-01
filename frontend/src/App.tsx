import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './forUnAuthorized/Login'
import Home from './forUnAuthorized/Home'
import Articles from './forUnAuthorized/Articles'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/articles' Component={Articles}/>
        <Route path='/login' Component={LoginPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
