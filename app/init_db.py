from database import get_db_connection 


def init():
    conn = get_db_connection()
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
    init()