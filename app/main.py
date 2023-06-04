# -*- coding: utf-8 -*-
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
import json
from js import stations_json

import database as db

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

@app.post('/init_database/')
def init_database():
    db.init_database()
    return "fin!"

@app.post('/reg_user/')
def reg_user(firstname: str, lastname: str, email: str, password: str):
    res = db.reg_user(firstname, lastname, email, password)
    return {'data': res}

@app.get('/get_all_users/')
def get_all_users():
    return db.get_users()

@app.get('/login/')
def login_user(email: str, password: str):
    return db.login_user(email, password)
