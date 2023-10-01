

import requests
from bs4 import BeautifulSoup
from bs4.element import NavigableString
from time import sleep

from selenium import webdriver
from bs4 import BeautifulSoup

from pymongo import MongoClient

# client = MongoClient('mongodb://test:test@localhost', 27017)
client = MongoClient('localhost', 27017) # 로컬호스트용
db = client.week1_project

# body > table > tbody > tr:nth-child(2) > td:nth-child(3) > div > div > div.con > div > table > tbody > tr:nth-child(1)
# body > table > tbody > tr:nth-child(2) > td:nth-child(3) > div > div > div.con > div > table > tbody > tr:nth-child(1) > td.RKtxt > span > a
# body > table > tbody > tr:nth-child(2) > td:nth-child(3) > div > div > div.con > div > table > tbody > tr:nth-child(1) > td:nth-child(4)
#popup-info-place > div > div.popupBody > div > div.popPlaceInfo > p:nth-child(2) > span
#container > div.contents > div.productWrapper > div.productMain > div.productMainTop > div > div.summaryBody > ul > li.infoItem.infoRelated > div > div > a > p.infoRelatedDate


# 셀레니움(크롬드라이버)와 bs4를 이용해 동적인 페이지를 스크래핑 하는 코드

url = 'http://ticket.interpark.com/TPGoodsList.asp?Ca=Eve&SubCa=Eve_O'
driver = webdriver.Chrome('./chromedriver.exe')
driver.get(url)
sleep(5)
soup = BeautifulSoup(driver.page_source, 'html.parser')

# 1. 셀레니움(크롬드라이버)로 전시회 목록이 보이는 사이트에서 원하는 정보가 담긴 태그 상자를 찾아서
# 2. 반복문을 통해 원하는 정보인 상세 페이지의 링크 뒤의 고유값 를 뽑아낸 뒤
# 3. 상세페이지 공통링크 + 고유값으로 다시한번 드라이버를 통해 접속해서 원하는 정보를 빼서 db에 담음.
# 발생한 문제: 기본 실행시 값이 undefinded가 떠서 동적인 페이지를 추출하면서 중간에 못받아오는 값이 있다 생각했지만,
# try: except를 하면 원하는 정보가 안 나오면 무시하고 하면, 없는 정보가 있어야하는데, 모든 정보가 뺴와짐.
trs = soup.select("body > table > tbody > tr:nth-child(2) > td:nth-child(3) > div > div > div.con > div > table > tbody > tr")
url = "http://ticket.interpark.com/"
results=[]
for tr in trs:
    try:
        title= tr.select_one(".RKtxt>span>a").text
        nlink = tr.select_one(".RKthumb>a")["href"]
        link = url+nlink
        driver.get(link)
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        date = soup.select_one(".infoDesc>p").text
        img= soup.select_one(".posterBoxImage")["src"]
        place =soup.select_one(".infoBtn").text.strip("(자세히)")
        result = {'title':title, 'link':link,'date':date, 'img':img,'place':place}
        results.append(result)
        print(result)
    except:
        continue

#
# db.exhibition.drop()
for result in results:
    db.exhibitions.insert_one(result)
print("db저장이 완료되었습니다")



