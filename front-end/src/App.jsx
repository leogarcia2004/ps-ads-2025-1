import React from 'react'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import './App.css'
import {BrowserRouter } from 'react-router-dom'

import  CssBaseline  from '@mui/material/CssBaseline';
import Box from '@mui/material/Box'

import TopBar from './ui/TopBar';
import BottomBar from './ui/BottomBar';

import theme from './ui/theme';
import { ThemeProvider } from '@mui/material/styles';

import AppRoutes from './routes/AppRoutes';

import  AuthContext  from './contents/AuthContext';
import fetchAuth from './lib/fetchAuth';

function App() {

  const [authState, setAuthState] = React.useState({
    authUser: null,
    redirectTo: null
  })
  const {
    authUser,
    redirectTo
  } = authState

  async function fetchAuthUser() {

    try{
      const result = await fetchAuth.get('/users/me')

      setAuthState({ ...authState, authUser: result })
    }
    catch(error){
      console.error(error)
    }    
  }

  React.useEffect(() => {
    fetchAuthUser()
  }
  , [])

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline/> {/*Reseta o CSS */}

      <BrowserRouter>

        <AuthContext.Provider value={{authState, setAuthState }}>
          {authState.redirectTo && redirectTo('/login')}
        
          <TopBar/>

          <Box id="innerRoot" sx={{
            m: '48px 24px'
          }}>
          <AppRoutes/>
          </Box>
          <BottomBar/>
        </AuthContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
