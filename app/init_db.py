import psycopg2


def get_db_connection(db_name, db_user, db_password, db_host, db_port):
    connection = None
    try:
        connection = psycopg2.connect(
            database=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port,
        )
        print("Connection to PostgreSQL DB successful")

    except psycopg2.OperationalError as e:
        print(f"The error '{e}' occurred")

    return connection


def init(host):
    conn = get_db_connection("postgres", "admin", "root", host, "5432")
    cur = conn.cursor()

    # Execute a command: this creates a new table
    cur.execute('DROP TABLE IF EXISTS users;')
    cur.execute('CREATE TABLE users( \
        id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY, \
        firstname VARCHAR(63), \
        lastname VARCHAR(63), \
        email VARCHAR(63), \
        password VARCHAR(63) \
    );')

    conn.commit()

    cur.close()
    conn.close()

if __name__ == '__main__':
    init("127.0.0.1")