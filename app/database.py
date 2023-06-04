import psycopg2
import init_db


SERVER_HOSTNAME = "192.168.0.106"
SERVER_DATABASE = "postgres"
SERVER_PASSWORD = "root"
SERVER_USER = "admin"
SERVER_PORT = "5432"

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

def reg_user(firstname: str, lastname: str, email: str, password: str) -> None:
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO users \
            ( firstname, lastname, email, password )'
            'VALUES (%s, %s, %s, %s);',
            (
                firstname, 
                lastname, 
                email, 
                password
            )
    )
    
    conn.commit()
    
    cur.close()
    conn.close()
    
    return 'reged'

def get_users() -> list:
    conn = get_db_connection()
    if conn == None:
        return {'data': 'Error connection'}
    
    cur = conn.cursor()

    
    cur.execute('SELECT id, firstname, lastname, email FROM users;')
    publisher_records = cur.fetchall()
 
    res = {}
    for el in publisher_records:
        res[el[0]] = [el[1], el[2], el[3]]

    cur.close()
    conn.close()
    
    return res

def login_user(email: str, password: str):
    conn = get_db_connection()

    if conn == None:
        return False
    
    cur = conn.cursor()

    try:
        cur.execute(f"SELECT id, email FROM users where email='{email}' AND password='{password}';")
        publisher_records = cur.fetchall()

        if publisher_records.__len__() < 1:
            return {'data': False}
        else:
            return {'data': True}
        
    except Exception as ex:
        print(ex)
        return {'data': False}
    
    finally:
        cur.close()
        conn.close()

def init_database():
    init_db.init(SERVER_HOSTNAME)

if __name__ == "__main__":
    # print(reg_user('sasha2', 'masov2', 'email2', 'password2'))
    print(get_users())
