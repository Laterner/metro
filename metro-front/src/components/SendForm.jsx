import {React, useState, useEffect} from 'react';
import { TextField, List, Stack, ListItem, ListItemText, Divider, Box, Button } from '@mui/material';
import axios from 'axios';


const API_URL = "http://localhost:8080"


export default function SendForm() {
    const [stations, setStations] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    
    const [finReg, setFinReg] = useState('Оставьте asdзаявку')

    // const [selectedItem, setSelectedItem] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        fetch("http://localhost:8080/get_stations")
        .then((res) => res.json())
        .then((data) => setStations(data))
        .catch((err) => console.log(err.message));
    }, []);

    useEffect(() => {
        const results = Object.values(stations).filter(station =>
            station.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
        setSearchResults(results);
    },[searchTerm, stations]);

        
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        
        console.log(searchTerm, description) 

        axios.post(`http://localhost:8080/reg_request/?firstname=${firstName}&lastname=${lastName}&email=${email}&station=${searchTerm}&request_text=${description}`)
        .then((response) => {
            let data = response.data
            if (data.data === 'reged'){
                console.log('Заявка успешно отправлена!' + data);
                setFinReg('Заявка успешно отправлена!')
            }
            else{
                console.log(data)
            }
        })
        .catch((error) => {
            console.log(error.response);
        })
    }
    
    return (
        <div className='App-conteiner' >
            <form 
                onSubmit={handleSubmit} 
                className=''
            >
                
            <h2>{finReg}</h2>
            <Stack spacing={3} direction="row" sx={{marginBottom: 4}}>
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
                </Stack>
                
            <TextField id="standard-basic"
                sx={{
                    width:'100%',
                    marginBottom: '30px',
                    color: 'orange[500]'
                }}
                label="Поиск станции" 
                variant="standard"
                placeholder="Введите название станции"
                value={searchTerm}
                onChange={handleChange}/>
                
                <List 
                    component="ul" 
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 200,
                        '& ul': { padding: 0 },
                        marginBottom: '20px'
                    }}
                >
                    {searchResults.map((item, key) => (
                        <>
                        <ListItem button onClick={() => setSearchTerm(item)}>
                            <ListItemText key={key} primary={item} />
                        </ListItem>
                        <Divider />
                        </>
                    ))}
                </List>
                <TextField
                    label="Опишите проблему"
                    multiline
                    rows={10}
                    variant="standard"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    sx={{
                        width:'100%',
                        height:'200px',
                        marginBottom: '70px'
                    }}
                />
                <Box display="flex" justifyContent="right" >
                    <Button variant="outlined" color="primary" type="submit" >
                        Отправить
                    </Button>
                </Box>
                </form>
        </div>
    );
}
