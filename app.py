from pymongo import MongoClient
import jwt
import datetime
import hashlib
from flask import Flask, render_template, jsonify, request, redirect, url_for
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta


app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['UPLOAD_FOLDER'] = "./static/profile_pics"

SECRET_KEY = 'SPARTA'
client = MongoClient('localhost', 27017)
# client = MongoClient('mongodb://54.180.147.13', 27017, username="test", password="test")
# db = client.dbsparta_plus_week4
db = client.week1_project

# 메인페이지
@app.route('/')
def home():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]})
        user =user_info["username"]
        return render_template('main.html', user_info=user)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

# 로그인화면
@app.route('/login')
def login():
    msg = request.args.get("msg")
    return render_template('login.html', msg=msg)


@app.route('/sign_in', methods=['POST'])
def sign_in():
    # 로그인
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']

    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.users.find_one({'username': username_receive, 'password': pw_hash})

    if result is not None:
        payload = {
         'id': username_receive,
         'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

# 회원가입 API
@app.route('/sign_up/save', methods=['POST'])
def sign_up():
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    doc = {
        "username": username_receive,                               # 아이디
        "password": password_hash,                                  # 비밀번호
        "profile_name": username_receive,                           # 프로필 이름 기본값은 아이디
        "profile_pic": "",                                          # 프로필 사진 파일 이름
        "profile_pic_real": "profile_pics/profile_placeholder.png", # 프로필 사진 기본 이미지
        "profile_info": ""                                          # 프로필 한 마디
    }
    db.users.insert_one(doc)
    return jsonify({'result': 'success'})

# 아이디 중복확인
@app.route('/sign_up/check_dup', methods=['POST'])
def check_dup():
    username_receive = request.form['username_give']
    exists = bool(db.users.find_one({"username": username_receive}))
    return jsonify({'result': 'success', 'exists': exists})

# 로그아웃
@app.route('/logout', methods=['GET'])
def logout():
    user.pop('username', None)
    return redirect('/')

@app.route('/main')
def main():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]})
        user = user_info["username"]
        return render_template('main.html', user_info=user)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))
    return render_template('main.html')

@app.route('/exhibit', methods=['GET'])
def listing():
    exhibits = list(db.exhibitions.find({}, {'_id': False}))
    return jsonify({'all_exhibits': exhibits})

# 메인페이지 북마크 추가
@app.route('/main/bookmark', methods=['POST'])
def mainpage_bookmark():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        username = payload["id"]
        title_receieve = request.form['title_give']
        doc = {
            "username": username,
            "title_receieve": title_receieve,
        }
        if bool(db.bookmarks.find_one({"username": username, "title_receieve": title_receieve,})):
            result ="마이페이지에서 확인하세요"
        else:
            db.bookmarks.insert_one(doc)
            result ="보관함에 추가되었습니다."
        return jsonify({"result":result}, user_info=username)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

# 마이페이지
@app.route('/mypage')
def mypage():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]})
        user = user_info["username"]
        return render_template('mypage.html', user_info=user)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

#마이페이지 북마크 불러오기
@app.route('/mypage/load_bookmark', methods=['GET'])
def load_bookmark():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        username = payload["id"]
        mybookmarks = list(db.bookmarks.find({"username":username}, {'_id': False, 'username':False}))
        exhibitions=[]
        for mybookmark in mybookmarks:
            title = mybookmark["title_receieve"]
            exhibition = db.exhibitions.find_one({'title': title}, {'_id': False})
            exhibitions.append(exhibition)
        return jsonify({"exhibitions":exhibitions})

    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

#마이페이지에서 북마크 삭제하기
@app.route('/mypage/remove_bookmark', methods=['POST'])
def remove_bookmark():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        username = payload["id"]
        title_receieve = request.form['title_give']
        db.bookmarks.delete_one({"username": username, "title_receieve": title_receieve})
        return jsonify({"result":"보관함에서 삭제되었습니다."})
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

# 디테일페이지
@app.route('/detail', methods=['GET'])
def detail():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"username": payload["id"]})
        user = user_info["username"]
        return render_template('detail.html', user_info=user)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


## 디테일페이지 댓글 저장하기
@app.route('/detail2', methods=['POST'])
def write_review():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        username = payload["id"]
        review_receive = request.form['review_give']
        title_receive = request.form['title_give']
        doc = {
            'username':username,
            'review': review_receive,
            'title':title_receive
        }
        db.displayReview.insert_one(doc)
        return jsonify({'msg': '리뷰 저장 완료'})
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

## 디테일페이지 댓글 불러오기
@app.route('/detail3', methods=['GET'])
def read_reviews():
    aa = list(db.displayReview.find({}, {'_id': False}))
    print(aa)
    return jsonify({'all_reviews': aa})

#디테일페이지 전시정보불러오기
@app.route('/detail4', methods=['POST'])
def detail4():
    title_receive = request.form['title_give']
    title = db.exhibitions.find_one({'title': title_receive}, {'_id': False})
    print(title)
    return jsonify({'title': title})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)