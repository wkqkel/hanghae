

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

url = 'http://ticket.interpark.com/TPGoodsList.asp?Ca=Eve&SubCa=Eve_O'
driver = webdriver.Chrome('./chromedriver.exe')
driver.get(url)
sleep(5)
soup = BeautifulSoup(driver.page_source, 'html.parser')

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



