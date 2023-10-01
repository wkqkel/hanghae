from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.team_projects

doc = {
    'id': 'apple',
    'password': '123'
}
db.mountain_users.insert_one(doc)

doc = {
    'id': 'banana',
    'password': '123'
}
db.mountain_users.insert_one(doc)

doc = {
    'id': 'melon',
    'password': '123'
}
db.mountain_users.insert_one(doc)