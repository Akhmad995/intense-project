import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import Home from './forAuthorized/Home'
import Articles from './forAuthorized/Articles'
import CardDetails from './forAuthorized/CardDetails'

import LoginPage from './forUnAuthorized/Login'
import HomeUn from './forUnAuthorized/HomeUn'
import ArticlesUn from './forUnAuthorized/ArticlesUn'
import CardDetailsUn from './forUnAuthorized/CardDetailsUn'
import Favourites from './forAuthorized/Favourites'
import Profile from './forAuthorized/Profile'

function App() {
  const [authorized, setAuthorized] = useState(true)

  if (authorized) return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/articles' Component={Articles} />
        <Route path='/login' Component={LoginPage} />
        <Route path='/card' Component={CardDetails} />
        <Route path='/favourites' Component={Favourites} />
        <Route path='/profile' Component={Profile} />
      </Routes>
    </BrowserRouter>
  )

  if (!authorized) return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={HomeUn} />
        <Route path='/articles' Component={ArticlesUn} />
        <Route path='/login' Component={LoginPage} />
        <Route path='/card' Component={CardDetailsUn} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
