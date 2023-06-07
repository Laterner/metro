import React, {useState, useEffect} from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import {useCookies} from 'react-cookie'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost:8080"


export default function LoginForm() {
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['login'])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    const handleRedirect = () => {
        navigate("/admin");
    }

    // return (
    //     <div className='App-conteiner'>
    //         <button onClick={handleClick} type="button">click me</button>
    //     </div>
    // );

 
    function handleSubmit(event) {
        
        event.preventDefault();
        // console.log(lastName, email, password) 

        axios.get(API_URL + `/login/?email=${email}&password=${password}`)
        .then((response) => {
            const data = response.data
            if (data.type != 'error' && data.data != 'incorrectPassword'){
                setCookie('login', data.data)
                console.log('redir ' + data.data)
                handleRedirect()
            }
            else{
                console.log('incorrectPassword')
                removeCookie('login')
            }
        })
        .catch((error) => {
            console.log(error.response)
        })
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
                    type="text"
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
