import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './forAuthorized/Home'
import Articles from './forAuthorized/Articles'
import CardDetails from './forAuthorized/CardDetails'

import LoginPage from './forUnAuthorized/Login'
import HomeUn from './forUnAuthorized/HomeUn'
import ArticlesUn from './forUnAuthorized/ArticlesUn'
import CardDetailsUn from './forUnAuthorized/CardDetailsUn'
import Favourites from './forAuthorized/Favourites'
import Profile from './forAuthorized/Profile'

const App = () => {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const authorizedValue = localStorage.getItem('authorized')
    if (authorizedValue === 'true') {
      setAuthorized(true)
    } else {
      setAuthorized(false)
    }
  }, [authorized || setAuthorized])

  return (
      <BrowserRouter>
        <Routes>
          {authorized ? <Route path='/' Component={Home} /> : <Route path='/' Component={HomeUn} />} 
          {authorized ? <Route path='/articles' Component={Articles} /> : <Route path='/articles' Component={ArticlesUn} />}
          {authorized ? <Route path='/profile' Component={Profile} /> : <Route path='/login' Component={(props) => <LoginPage {...props} setAuthorized={setAuthorized} />} />}
          {authorized ? <Route path='/card' Component={props => <CardDetails {...props} setAuthorized={setAuthorized} />} /> : <Route path='/card' Component={CardDetailsUn} />}
          {authorized ? <Route path='/favourites' Component={Favourites} /> : null}

        </Routes>
      </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
