import os

try:
    SERVER_HOSTNAME = "localhost" # os.environ["HOST"]
    SERVER_DATABASE = "postgres"
    SERVER_PASSWORD = "root"
    SERVER_USER = "admin"
    SERVER_PORT = "5432"
except:
    SERVER_HOSTNAME = "localhost"
    SERVER_DATABASE = "postgres"
    SERVER_PASSWORD = "root"
    SERVER_USER = "admin"
    SERVER_PORT = "5432"

print("API_HOST:", SERVER_HOSTNAME)