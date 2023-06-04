import psycopg2
from settings import SERVER_DATABASE, SERVER_USER, SERVER_PASSWORD, SERVER_HOSTNAME, SERVER_PORT


def get_db_connection():
    connection = None
    try:
        connection = psycopg2.connect(
            database=SERVER_DATABASE,
            user=SERVER_USER,
            password=SERVER_PASSWORD,
            host=SERVER_HOSTNAME,
            port=SERVER_PORT,
        )

        print("Connection to PostgreSQL DB successful")

    except psycopg2.OperationalError as e:
        print("Help me, I'm falled!!")
        print(f"The error '{e}' occurred")

    return connection