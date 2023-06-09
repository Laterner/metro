import React, {useEffect, useState} from 'react';
import { TextField, Button, Box, Stack, Modal} from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';

const API_URL = "http://localhost:8080"

export default function RegisterForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [finReg, setFinReg] = useState(false)
    const [error, setError] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        // console.log('lets: ', firstName, lastName, email, password)
        
        axios.post(`${API_URL}/reg_user?firstname=${firstName}&lastname=${lastName}&email=${email}&password=${password}`)
        .then((response) => {
            let data = response.data
            // console.log(data.data)
            if (data.data === 'emailExisting'){
                setError('Email уже существует')
            }
            else if(data.data === 'reged'){
                setFinReg(true)
            }
        })
        .catch((error) => {
            console.log(error.response)
        })
          
    }
    if (finReg === true){
        return (
            <div className='App-conteiner'>
                <h2>Регистрация прошла успешно, ожидайте подтверждения аккаунта.</h2>
            </div>
        )
    }
    return (
        <React.Fragment>
            <form 
                onSubmit={handleSubmit} 
                className='App-conteiner'
            >
                <h1>{error}</h1>
                <h2>Регистрация</h2>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Имя"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Фамилия"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Пароль"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{mb: 4}}
                />
                <Box display="flex" justifyContent="space-between" >
                    <small>Уже зарегестрированы? <Link to="/login">Войти</Link></small>
                    <Button variant="outlined" color="primary" type="submit" >
                        Зарегистрироваться
                    </Button>
                </Box>
                
            </form>
        </React.Fragment>
    );
}
