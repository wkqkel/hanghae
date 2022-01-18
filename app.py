from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
# client = MongoClient('mongodb://test:test@localhost', 27017)
client = MongoClient('localhost', 27017)
db = client.alone_projects

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/api/list', methods=['GET'])
def db_get():
   song_data = list(db.melon99.find({},{'_id':False}))
   del song_data[-1]
   print(song_data)
   return jsonify({'songs_data': song_data})


if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)