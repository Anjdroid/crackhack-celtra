import json
import requests
import random

employeeUrl = "http://localhost:5000/api/employees"
kudosUrl = "http://localhost:5001/api/kudos"

with open('schema.json') as f:
    data = json.load(f)

def getEmployees():
    response = requests.get(employeeUrl)

    if response.status_code == 200:
        body = json.loads(response.content.decode('utf-8'))

        employees = []
        for result in body:
            employees.append(result['id'])

        return employees

def createKudo(employees, n):
    for i in range(n):
        response = requests.get('http://yerkee.com/api/fortune')

        if response.status_code == 200:
            kudos = {}
            random.shuffle(employees)
            kudos['beneficiary'] = employees[0]
            random.shuffle(employees)
            kudos['endorser'] = employees[0]
            kudos['message'] = json.loads(response.content.decode('utf-8'))['fortune']

            requests.post(kudosUrl, data=json.dumps(kudos), headers={'Content-Type': 'application/json; charset=utf-8'})

employees = getEmployees()
createKudo(employees, 100)
