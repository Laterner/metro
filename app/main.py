# -*- coding: utf-8 -*-
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from js import stations_json

import schemas as db

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def read_root():
    return RedirectResponse("/docs")

@app.post("/update_role")
def update_role(id: int, role: str):
    return db.update_role(id, role)

@app.get('/get_stations')
def get_stations():
    return stations_json

@app.post('/init_database/')
def init_database():
    db.init_database()
    return "fin!"

@app.post('/reg_user/')
def reg_user(firstname: str, lastname: str, email: str, password: str):
    res = db.reg_user(firstname, lastname, email, password)
    return {'data': res}

@app.post('/reg_request/')
def reg_request(firstname: str, lastname: str, email: str, station: str, request_text: str):
    res = db.reg_request(firstname, lastname, email, station, request_text)
    return {'data': res}

@app.get('/get_all_users/')
def get_all_users():
    return db.get_users()


@app.get('/get_requests/')
def get_requests():
    return db.get_requests()

@app.get('/login/')
def login_user(email: str, password: str):
    return db.login_user(email, password)
