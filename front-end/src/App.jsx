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

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline/> {/*Reseta o CSS */}

      <BrowserRouter>
        <TopBar/>

        <Box id="innerRoot" sx={{
          m: '48px 24px'
        }}>
        <AppRoutes/>
        </Box>
        <BottomBar/>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
