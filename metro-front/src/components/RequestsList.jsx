import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';


const API_URL = "http://localhost:8080"

export default function RequestList() {
    const [usersItemList, setUsersItemList] = useState([])
    
    useEffect(() => {
        axios.get(`${API_URL}/get_requests`)
        .then((response) => {
            const data = response.data
            console.log(data)
            setUsersItemList(data)
        })
        .catch((error) => {
            console.log(error.response);
            setUsersItemList({'data':'fail'})
        })
    }, [])


    const listItems = usersItemList.map((el) => (
        <Paper sx={{ m: '20px auto', p: 1 }}>
            {el.id} | {el.firstname} | {el.lastname} | {el.email} | {el.station} 
        </Paper>
    ));

    return(
        <>
            {listItems}
        </>
    )
}