import {React, useState, useEffect} from 'react';
import { TextField, List, ListItem, ListItemText, Divider, Box, Button } from '@mui/material';
import { Link } from "react-router-dom";

export default function SendForm() {
    const [stations, setStations] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8080/")
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
    
    return (
        <div className='App-conteiner' >
            <h2>Оставьте заявку</h2>
            <TextField id="standard-basic"
                sx={{
                    width:'100%',
                    marginBottom: '30px'
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
                        <ListItem button>
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
                    sx={{
                        width:'100%',
                        marginBottom: '30px'
                    }}
                />
                <Box display="flex" justifyContent="right" >
                    <Button variant="outlined" color="primary" type="submit" >
                        Отправить
                    </Button>
                </Box>
        </div>
    );
}
