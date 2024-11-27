import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import './App.css'

import Home from './forAuthorized/Home'
import Articles from './forAuthorized/Articles'
import PostDetails from './forAuthorized/PostDetails'
import Favourites from './forAuthorized/Favourites'
import Profile from './forAuthorized/Profile'
import ChangeProfile from './forAuthorized/ChangeProfile'

import LoginPage from './forUnAuthorized/Login'
import HomeUn from './forUnAuthorized/HomeUn'
import ArticlesUn from './forUnAuthorized/ArticlesUn'
import PostDetailsUn from './forUnAuthorized/PostDetailsUn'
import CreatePost from './forAuthorized/CreatePost'

const App = () => {
  const authorized = useSelector((state: RootState) => state.auth.authorized)

  return (
    <BrowserRouter>
      <Routes>
        {authorized ? <Route path='/' Component={Home} /> : <Route path='/' Component={HomeUn} />}
        {authorized ? <Route path='/articles' Component={Articles} /> : <Route path='/articles' Component={ArticlesUn} />}
        {authorized ? <Route path='/profile' Component={Profile} /> : <Route path='/login' Component={LoginPage} />}
        {authorized ? <Route path='/posts/:id' Component={PostDetails} /> : <Route path='/posts/:id' Component={PostDetailsUn} />}
        {authorized && <Route path='/favourites' Component={Favourites} />}
        {authorized && <Route path='/changeProfile' Component={ChangeProfile}/>}
        {authorized && <Route path='/createPost' Component={CreatePost}/>}

      </Routes>
    </BrowserRouter>
  )
}

export default App