from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.team_projects

@app.route('/')
def home():
   return render_template('index.html')


@app.route('/visited', methods=['GET'])
def visited_get():
   id_receive = request.args.get('id_give')
   user_review = list(db[id_receive].find({}, {'_id': False}).sort('name'))
   names = []
   for review in user_review:
      names.append(review['name'])
   mt100 = list(db.mountains.find({'name': {'$in' : names}}, {'_id': False}).sort('name'))
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


if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)