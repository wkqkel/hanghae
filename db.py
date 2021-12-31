import requests
from bs4 import BeautifulSoup
from bs4.element import NavigableString


from selenium import webdriver
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta

#body-content > div.newest-list > div > table > tbody > tr:nth-child(2) > td.number 순위 text에
#body-content > div.newest-list > div > table > tbody > tr:nth-child(1) > td.info > a.title.ellipsis 제목 text에
#body-content > div.newest-list > div > table > tbody > tr:nth-child(1) > td.info > a.artist.ellipsis 가수 text에
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://www.melon.com/chart/index.htm',headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

trs = soup.select("#tb_list> form> div.type02 > table > tbody > tr")

results = []
# db.melon99.drop()
for tr in trs:
        #랭크 부분 하위태그 제거하고 텍스트만 추출_ 왜이게 작동하는진 몰겠지만 그냥 바꿔썼다 ㅎ...
        #in 다음의 rank 부분제거하고 from bs4.element import NavigableString 젤 위에 이거써줌
        rank = tr.select_one("td:nth-child(2) > div > span.rank").text.strip()
        title = tr.select_one("td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a").text.strip()
        artist = tr.select_one("td:nth-child(6) > div > div > div.ellipsis.rank02 > a").text.strip()
        # print(rank,title,artist)
        # doc = {'rank':rank, 'title':title, "artist":artist,}
        # db.melon99.insert_one(doc)
        result1 = {'rank':rank, 'title':title, "artist":artist,}
        results.append(result1)


for result in results:
        title = result["title"]
        artist = result["artist"]
        url = 'https://www.youtube.com/results?search_query='
        urlSearch = url + title + artist

        driver = webdriver.Chrome('./chromedriver.exe')
        driver.get(urlSearch)
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        boxes = soup.select("#dismissible")
        for box in boxes:
            cdImg = box.select_one("#dismissible>.style-scope yt-img-shadow>img")["src"]
            aLink = box.select_one("#video-title")["href"].split("v=")[1]
            if not (" 전 " in box.select_one("#video-title")["aria-label"]):
                continue
            playtime = box.select_one("#video-title")["aria-label"].split(" 전 ")[1].split("조회수")[0]
            if "시간" in playtime:
                continue
            if int(playtime.split("분")[0]) < 10:
                break
        result["cdImg"] = cdImg
        result["aLink"] = aLink
        result["playtime"] = playtime
        print(results)

db.melon99.drop()
for result3 in results:
    db.melon99.insert_one(result3)
print("db저장이 완료되었습니다")