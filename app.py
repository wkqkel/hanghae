from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
# ec2 등록 시 사용
client = MongoClient('mongodb://test:test@localhost/?authSource=admin', 27017)
db = client.mymountain

# local 서버에서 사용
# client = MongoClient('localhost', 27017)
# db = client.team_projects


@app.route('/')
def home():
    return render_template('index.html')


####################### 회원가입 페이지
@app.route('/signup')
def signup():
    return render_template('signup.html')


@app.route('/signup', methods=['POST'])
def user_db():
    email_receive = request.form['email_give']
    password_receive = request.form['password_give']
    name_receive = request.form['name_give']
    year_receive = request.form['year_give']
    month_receive = request.form['month_give']
    date_receive = request.form['date_give']
    gender_receive = request.form['gender_give']

    users = list(db.mountain_users.find({}, {'_id': False}))
    ids = []
    for user in users:
        ids.append(user['id'])
    if email_receive in ids:
        return jsonify({'status': 'fail', 'msg': 'Email이 중복됩니다.'})
    else:
        doc = {
            'id': email_receive,
            'password': password_receive,
            'name': name_receive,
            'year': year_receive,
            'month': month_receive,
            'date': date_receive,
            'gender': gender_receive
        }
        db.mountain_users.insert_one(doc)

        return jsonify({'status': 'success', 'msg': '회원가입이 완료되었습니다.'})


#######################로그인 페이지

@app.route('/loginpage/login', methods=['GET'])
def login():
    id_receive = request.args.get("id")
    password_receive = request.args.get('password')
    # print(id_receive,password_receive)
    user = db.mountain_users.find_one({'id': id_receive, 'password': password_receive}, {'_id': False})
    if user:
        return jsonify({'result': user})
    if not user:
        return jsonify({'result': ""})


@app.route('/loginpage/confirm', methods=['GET'])
def confirm_email():
    id_receive = request.args.get("id")
    user = db.mountain_users.find_one({'id': id_receive}, {'_id': False})
    if user:
        return jsonify({'result': user})
    if not user:
        return jsonify({'result': ""})


# html에서 비밀번호 변경요청하면 id,pw받아와서 db에서 수정후 완료메시지 보내줌
@app.route('/loginpage/change_pw', methods=['GET'])
def change_pw():
    id_receive = request.args.get("id")
    pw_receive = request.args.get("pw")
    print(id_receive, pw_receive)
    db.mountain_users.update_one({'id': id_receive}, {'$set': {'password': pw_receive}})
    return jsonify({'result': "비밀번호가 변경되었습니다"})


#######################여기서부터 정호님코드(메인 페이지)
@app.route('/mainpage')
def mainpage():
    return render_template('mainpage.html')


@app.route('/visited', methods=['GET'])
def visited_get():
    id_receive = request.args.get('id_give')
    user_review = list(db[id_receive].find({}, {'_id': False}).sort('name'))
    names = []
    for review in user_review:
        names.append(review['name'])
    mt100 = list(db.mountains.find({'name': {'$in': names}}, {'_id': False}).sort('name'))
    for review in user_review:
        star = review['star']
        if star == '5':
            review['star'] = '⭐⭐⭐⭐⭐️'
        if star == '4':
            review['star'] = '⭐⭐⭐⭐️'
        if star == '3':
            review['star'] = '⭐⭐⭐️'
        if star == '2':
            review['star'] = '⭐⭐'
        if star == '1':
            review['star'] = '⭐️'

    return jsonify({'mt100': mt100, 'user_review': user_review})


@app.route('/mt100', methods=['GET'])
def mt100_get():
    id_receive = request.args.get('id_give')
    user_review = list(db[id_receive].find({}, {'_id': False}))
    mt100 = list(db.mountains.find({}, {'_id': False}))
    return jsonify({'mt100': mt100, 'user_review': user_review})


@app.route('/review', methods=['POST'])
def review_post():
    id_receive = request.form['id_give']
    name_receive = request.form['name_give']
    star_receive = request.form['star_give']
    comment_receive = request.form['comment_give']

    doc = {
        'name': name_receive,
        'star': star_receive,
        'comment': comment_receive
    }

    db[id_receive].insert_one(doc)

    return jsonify({'msg': '리뷰가 등록되었습니다!'})


@app.route('/review/delete', methods=['POST'])
def delete_post():
    id_receive = request.form['id_give']
    name_receive = request.form['name_give']

    db[id_receive].delete_one({'name': name_receive})

    return jsonify({'msg': '기록이 삭제되었습니다!'})


@app.route('/withdrawal', methods=['POST'])
def withdrawal():
    id_receive = request.form['id_give']

    db[id_receive].drop()
    db.mountain_users.delete_one({'id': id_receive})

    return jsonify({'msg': '탈퇴가 완료되었습니다!'})


# 날씨

import requests
from bs4 import BeautifulSoup

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://weather.naver.com/', headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

weather = soup.select_one(
    '#content > div > div.section_center > div.card.card_today > div.today_weather > div.weather_area > p > span.weather.before_slash')
temp = soup.select_one(
    '#content > div > div.section_center > div.card.card_today > div.today_weather > div.weather_area > strong')
dust = soup.select_one(
    '#content > div > div.section_center > div.card.card_today > div.today_weather > ul > li:nth-child(1)')
mdust = soup.select_one(
    '#content > div > div.section_center > div.card.card_today > div.today_weather > ul > li:nth-child(2)')
icon = soup.select_one('#content > div > div.section_center > div.card.card_today > div.today_weather > i')


@app.route('/weather', methods=['POST'])
def saving():
    # sample_receive = request.form['sample_give']
    # print(sample_receive)
    return jsonify(
        {'온도': temp.text.split('온도')[1], '날씨': weather.text, '미세먼지': dust.text.strip(), '초미세먼지': mdust.text.strip()})

\

# 등산력
@app.route('/power', methods=['GET'])
def power():
    id_receive = request.args.get('id_give')
    user_reviews = list(db[id_receive].find({}, {'_id': False}))
    count = len(user_reviews)
    return jsonify({'count': count})


@app.route('/starPic', methods=['GET'])
def starPic():
    id_receive = request.args.get('id_give')
    user_reviews = list(db[id_receive].find({}, {'_id': False}))
    mountain_names = []
    for user in user_reviews:
        mountain_names.append(user['name'])
    return jsonify({'mountain_names': mountain_names})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
