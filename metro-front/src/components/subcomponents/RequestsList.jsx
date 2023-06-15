import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import axios from 'axios';


const API_URL = "http://localhost:8080"

export default function RequestList() {
    const [usersItemList, setUsersItemList] = useState([])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      
      const [open, setOpen] = React.useState(false);
      const [req, setReq] = React.useState({id: 'loading', firstname: 'loading', lastname: 'loading', email: 'loading', station: 'loading', requestText: 'loading'});

      const handleOpen = () => {
        setOpen(true)
        axios.get(`http://localhost:8080/get_request/?id=${1}`)
          .then((response) => {
              console.log(response.data);
              setReq(response.data)
          })
          .catch((error) => {
              console.log(error.response);
          })
    };
      const handleClose = () => setOpen(false);

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
        <Paper sx={{ m: '20px auto', p: 1 }}  onClick={handleOpen}>
            {el.id} | {el.firstname} | {el.lastname} | {el.email} | {el.station} 
        </Paper>
    ));

    return(
        <>
            {listItems}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Text in a modal</h2>
                    <p id="parent-modal-description">
                        Имя: {req.firstname}<br/>
                        Фамилия: {req.lastname}<br/>
                        Email: {req.email}<br/>
                        Станция: {req.station}<br/>
                        Запрос: {req.requestText}<br/>
                    </p>
                    <button onClick={handleClose}>Закрыть</button>
                </Box>
            </Modal>
        </>
    )
}