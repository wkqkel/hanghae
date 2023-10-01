from urllib.request import urlopen
import xmltodict

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.team_projects

with urlopen('http://api.forest.go.kr/openapi/service/cultureInfoService/gdTrailInfoOpenAPI?serviceKey=wPB8pufBtYjIDwkvA5vFD38kevlcqwvcaJt8%2B6PBy0hbaSK1ygre5H1OHBLQEZ8eopLUSTVVS1JjSHdui1jtuQ%3D%3D&numOfRows=100') as response:
   html = response.read()

data = xmltodict.parse(html)


length = len(data['response']['body']['items']['item'])
for i in range(length):
    name = data['response']['body']['items']['item'][i]['mntnm']
    height = data['response']['body']['items']['item'][i]['mntheight']
    desc = data['response']['body']['items']['item'][i]['aeatreason']
    course = data['response']['body']['items']['item'][i]['etccourse']

    doc = {
        'name': name,
        'height': height,
        'desc': desc,
        'course': course
    }

    db.mountains.insert_one(doc)
    print(i)