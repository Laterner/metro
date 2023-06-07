import init_db
from database import get_db_connection 



def update_role(id: int, role: str) -> None:
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE users SET role=%s WHERE id=%s;",
            (role, id)
    )
    
    conn.commit()
    
    cur.close()
    conn.close()
    
    return 'updated'

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

def reg_request(firstname: str, lastname: str, email: str, station: str, request_text: str):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO requests \
            ( firstname, lastname, email, station, request_text)'
            'VALUES (%s, %s, %s, %s, %s);',
            (
                firstname, 
                lastname, 
                email, 
                station,
                request_text
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

    
    cur.execute('SELECT id, firstname, lastname, email, role FROM users ORDER BY id;')
    publisher_records = cur.fetchall()
 
    res = []
    for el in publisher_records:
        res.append({'id':el[0], 'firstname': el[1], 'lastname': el[2], 'email': el[3], 'role': el[4]})

    cur.close()
    conn.close()
    
    return res

def get_requests() -> list:
    conn = get_db_connection()
    if conn == None:
        return {'data': 'Error connection'}
    
    cur = conn.cursor()

    
    cur.execute('SELECT id, firstname, lastname, email, station FROM requests ORDER BY id;')
    publisher_records = cur.fetchall()
 
    res = []
    for el in publisher_records:
        res.append({'id':el[0], 'firstname': el[1], 'lastname': el[2], 'email': el[3], 'station': el[4]})

    cur.close()
    conn.close()
    
    return res

def login_user(email: str, password: str):
    conn = get_db_connection()

    if conn == None:
        return {'data':'incorrectPassword'}
    
    cur = conn.cursor()

    try:
        cur.execute(f"SELECT id, email FROM users where email='{email}' AND password='{password}';")
        publisher_records = cur.fetchall()

        if publisher_records.__len__() < 1:
            return {'data': 'incorrectPassword', 'type': 'error'}
        else:
            return {'data': email, 'type': 'successful'}
        
    except Exception as ex:
        print(ex)
        return {'data':'incorrectPassword'}
    
    finally:
        cur.close()
        conn.close()

def init_database():
    init_db.init()

if __name__ == "__main__":
    # print(reg_user('sasha2', 'masov2', 'email2', 'password2'))
    print(get_users())
