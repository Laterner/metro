import React, {useState} from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8080"
export default function LoginForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, password) 
    }
    
    return (
        <React.Fragment>
            <form 
                onSubmit={handleSubmit} 
                className='App-conteiner'
                action={<Link to={API_URL + "/login"}></Link>}
            >
                <h2>Вход</h2>
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
                    <small>Ещё не зарегестрированы? <Link to="/register">Зарегистрироваться</Link></small>
                    <Button variant="outlined" color="secondary" type="submit">
                        Войти
                    </Button>
                </Box>
                
            </form>
           
        </React.Fragment>
    );
}
