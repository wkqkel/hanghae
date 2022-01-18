import requests
from bs4 import BeautifulSoup


from selenium import webdriver
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta
#
title = "회전목마 (Feat. Zion.T, 원슈타인) (Prod. Slom)"
artist = "sokodomo"
# title = "사랑은 늘 도망가"
# artist = "임영웅"
url = 'https://www.youtube.com/results?search_query='
urlSearch = url + title + artist
# print(urlSearch)

driver = webdriver.Chrome('./chromedriver.exe')
driver.get("https://www.youtube.com/results?search_query=%EC%82%AC%EB%9E%91%EC%9D%80+%EB%8A%98+%EB%8F%84%EB%A7%9D%EA%B0%80+%EC%9E%84%EC%98%81%EC%9B%85")
soup = BeautifulSoup(driver.page_source, 'html.parser')
# print(soup)

#contents > ytd-video-renderer:nth-child(1)
# trs = soup.select("#tb_list> form> div.type02 > table > tbody > tr")
# rank = tr.select_one("td:nth-child(2) > div > span.rank").text.strip()
# ("#content >#dismissible>thumbnail > yt-img-shadow > img["src"]")
#
# print(soup)
#thumbnail:nth-child(0) > img[property ='img']
boxes = soup.select("#dismissible")
# print(boxes)
for box in boxes:
    cdImg = box.select_one("#img")["src"]
    aLink = box.select_one("#video-title")["href"].split("v=")[1]
    if not(" 전 " in box.select_one("#video-title")["aria-label"]):
        continue
    playtime = box.select_one("#video-title")["aria-label"].split(" 전 ")[1].split("조회수")[0]
    print(playtime)
    print(cdImg, aLink, playtime)
    if "시간" in playtime:
        continue
    if int(playtime.split("분")[0]) < 10:
        break


# cdImg = soup.select_one("#dismissible>.style-scope yt-img-shadow>img")["src"]
# aLink = soup.select_one("#video-title")["href"].split("v=")[1]
# # playtime = soup.find_all("a")
# playtime = soup.select_one("#video-title")["aria-label"].split("개월 전")[1].split("조회수")[0]
# if "시간" in playtime or (playtime.split("분")[0] > "10"):
#


# print(box)
# <span id="text" class="style-scope ytd-thumbnail-overlay-time-status-renderer" aria-label="4분 10초">
#   4:10
# </span>

# print(cdImg)
# aLink = soup.select_one("#img")
# playtime = soup.select_one("#img")
# print(cdImg)

