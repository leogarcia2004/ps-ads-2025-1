
import React from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import AccountCirleIcon from '@mui/icons-material/AccountCircle'

import { Link, useNavigate } from 'react-router-dom'
import { feedbackWait, feedbackConfirm, feedbackNotify } from './Feedback'

import AuthContext from '../contexts/AuthContext'
import fetchAuth from '../lib/fetchAuth'

export default function AuthWidgets() {
  const { authState, setAuthState } = React.useContext(AuthContext)
  const {
    authUser,
    redirectTo
  } = authState

  const navigate = useNavigate()

  async function handleLogoutButtonClick() {
    if(await feedbackConfirm('Deseja realmente sair?')) {
      feedbackWait(true)
      try {
        await fetchAuth.post('/logout')
        setAuthState({ ...authState, authUser: null })
        navigate('/login', { replace: true })
      }
      catch(error) {
        console.error(error)
        feedbackNotify('Erro ao realizar logout!')
      }
      finally {
        feedbackWait(false)
      }
    }
  }

  if(authUser) return <>
    <AccountCirleIcon color="secondary" fontSize="small" sx={{ mr: 1}} />
    <Typography variant="caption"> {authUser.username} </Typography>
    <Button
      color="secondary"
      size="small"
      onClick={handleLogoutButtonClick}
      sx={{ ml: 0.75 /* ml = marginLeft */ }} 
    >
      Sair
    </Button>
  </>
  else return <>
    <Link to="/login">
      <Button color="secondary" fontSize="small">Entrar</Button>
    </Link>
  </>
}
