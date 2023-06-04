import React, {useEffect, useState} from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';

const API_URL = "http://localhost:8080"

export default function RegisterForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [finReg, setFinReg] = useState('')
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log('lets: ', firstName, lastName, email, password)
        axios.post(`${API_URL}/reg_user?firstname=${firstName}&lastname=${lastName}&email=${email}&password=${password}`)
        .then((response) => {
            console.log(response.data);
            setFinReg('Успех!!')
        })
        .catch((error) => {
            console.log(error.response);
            setFinReg('Ошибка регистрации')
        })
          
    }
    useEffect(() => {
        axios.get('/get_all_users').then((res) => {
            console.log(res.data)
        })
    }, [])
    
    return (
        <React.Fragment>
            <form 
                onSubmit={handleSubmit} 
                className='App-conteiner'
                action={<Link to={"/login"}></Link>}
            >
                <h1>{finReg}</h1>
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
