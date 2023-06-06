import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';


const API_URL = "http://localhost:8080"

export default function UsersList() {
    const [usersItemList, setUsersItemList] = useState([])
    
    useEffect(() => {
        axios.get(`${API_URL}/get_all_users`)
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

    function AcceptUser(e, id, role) {
        e.preventDefault();
        console.log(id)
        
        
        axios.post(`${API_URL}/update_role/?id=${id}&role=${role}`)
        .then((response) => {
            console.log(response.data);
            console.log('Успех!!')
        })
        .catch((error) => {
            console.log(error.response);
            console.log('Ошибка регистрации')
        })
    }

    const listItems = usersItemList.map((el) => (
        <Paper sx={{ m: '20px auto', p: 1 }}>
            {el.id} | {el.firstname} | {el.lastname} | {el.email} | {el.role} 
            <Box display="flex" justifyContent="right" >
                <button onClick={(e) => AcceptUser(e, el.id, 'admin')}>Принять</button>
                <button onClick={(e) => AcceptUser(e, el.id, 'baned')}>Бан</button>
            </Box>
        </Paper>
    ));

    return(
        <>
            {listItems}
        </>
    )
}