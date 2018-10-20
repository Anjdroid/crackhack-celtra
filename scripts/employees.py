import json
import requests

serverUrl = 'http://localhost:5000/api/employees'

with open('schema.json') as f:
    data = json.load(f)

def getFakeUsers():
    url = 'https://randomuser.me/api/?results=100'
    response = requests.get(url)

    if response.status_code == 200:
        body = json.loads(response.content.decode('utf-8'))

        users = []
        for result in body['results']:
            user = {}
            user['email'] = result['email']
            user['firstName'] = result['name']['first'].capitalize()
            user['lastName'] = result['name']['last'].capitalize()
            user['avatarUrl'] = result['picture']['large']
            # user['registered'] = result['registered']['date']

            users.append(user)

        return users

def createEmployee(employee):
    response = requests.post(serverUrl, data=json.dumps(employee), headers={'Content-Type': 'application/json; charset=utf-8'})

    if response.status_code == 200:
        body = json.loads(response.content.decode('utf-8'))
        return body['id']

def parseEmployee(employee, managerId, fakeUsers):
    user = fakeUsers.pop(0)

    user['jobTitle'] = employee['jobTitle']

    if 'department' in employee:
        user['department'] = employee['department']
    else:
        user['department'] = None

    user['managerId'] = managerId

    id = createEmployee(user)

    if 'subordinates' in employee:
        for member in employee['subordinates']:
            if 'count' in member:
                for i in range(member['count']):
                   parseEmployee(member, id, fakeUsers)
            else:
                parseEmployee(member, id, fakeUsers)

users = getFakeUsers()
current = len(users)
parseEmployee(data, None, users)
print current - len(users)
