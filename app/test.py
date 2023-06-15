import requests

req = requests.get('http://localhost:8080/users/')
print(req.status_code)
