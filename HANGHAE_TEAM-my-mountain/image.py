from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.team_projects

s=Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=s)
driver.maximize_window()

mountains = list(db.mountains.find({'imgurl':None},{'_id':False}))
for mountain in mountains:
    name = mountain['name']

    driver.get("https://www.google.co.kr/imghp?hl=ko&tab=wi&ogbl")  # 구글에 이미지탭 URL 주소
    elem = driver.find_element_by_name("q")  # 검색창 태그찾기
    elem.send_keys(name)  # 찾은 검색창에 찾고 싶은 키워드 입력
    elem.send_keys(Keys.RETURN)  # 입력받은 키를 누른다
    image = driver.find_element_by_xpath('//*[@id="islrg"]/div[1]/div[1]/a[1]/div[1]/img')  # Get First Image
    imgurl = image.get_attribute('src')  # Print Image src attribute

    db.mountains.update_one({'name': name}, {'$set': {'imgurl': imgurl}})

    print(name, '완료!')