import React from 'react'

import { Typography } from '@mui/material'
import Button from '@mui/material/Button'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import {Link, useNavigate} from 'react-router-dom'
import {feedbackWait, feedbackConfirm, feedbackNotify} from './Feedback'

import AuthContext from '../contents/AuthContext'
import fetchAuth from '../lib/fetchAuth'

export default function AuthWidgets() {
    const {authState, setAuthState} = React.useContext(AuthContext)
    const {
        authUser,
        redirectTo,
    } = authState
    const navigate = useNavigate()
    if(authUser) return <>
        <AccountCircleIcon colors="secondary" fontSize="small" sx={{mr: 1}}/>
        <Typography variant="body2" color="secondary" sx={{mr: 1}}>{authUser.username}</Typography>
        <Button
            color="secondary"
            size="small"
            onClick={async () => {
                const result = await feedbackConfirm('Deseja realmente sair?', 'Sair')
                if(result) {
                    feedbackWait('Saindo...')
                    try {
                        await fetchAuth.post('/auth/logout')
                        setAuthState(null)
                        navigate('/login')
                    } catch (error) {
                        console.error(error)
                        feedbackNotify('Erro ao sair', 'error')
                    }
                }
            }}
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