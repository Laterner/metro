# Dockerfile

# pull the official docker image
FROM python:3.11.1-slim

# set work directory
WORKDIR /app

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
# COPY requirements.txt .
RUN pip install uvicorn
RUN pip install fastapi
RUN pip install psycopg2-binary

# copy project
COPY . .