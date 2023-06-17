from database import get_db_connection 
from hashlib import sha256

def init():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute('DROP TABLE IF EXISTS requests;')
    cur.execute('CREATE TABLE requests( \
        id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY, \
        firstname VARCHAR(64), \
        lastname VARCHAR(64), \
        email VARCHAR(64), \
        station VARCHAR(31), \
        request_text TEXT, \
        files VARCHAR(127) \
    );')

    cur.execute('DROP TABLE IF EXISTS users;')
    cur.execute('CREATE TABLE users( \
        id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY, \
        firstname VARCHAR(64), \
        lastname VARCHAR(64), \
        email VARCHAR(64), \
        password VARCHAR(64), \
        role VARCHAR(15) \
    );')

    password = sha256('password'.encode()).hexdigest()
    cur.execute('INSERT INTO users \
            ( firstname, lastname, email, password, role )'
            'VALUES (%s, %s, %s, %s, %s);',
            (
                'firstname', 
                'lastname', 
                'admin@test.ru', 
                password,
                'admin'
            )
    )

    conn.commit()

    cur.close()
    conn.close()

if __name__ == '__main__':
    init()