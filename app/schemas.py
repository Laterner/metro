import init_db
from database import get_db_connection 


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
    init_db.init()

if __name__ == "__main__":
    # print(reg_user('sasha2', 'masov2', 'email2', 'password2'))
    print(get_users())
