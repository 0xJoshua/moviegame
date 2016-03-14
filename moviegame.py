from bottle import run, template, static_file, get, post, request
import json
import MySQLdb

from operator import itemgetter

db = MySQLdb.connect(host="localhost",
                     user="root",
                     passwd='',
                     db="moviegame")
words_cur = db.cursor()
scores_cur = db.cursor()


@post('/leaderboard')
def store_highscore():
    score = request.params['score']
    username = request.params['username']
    scores_cur.execute("INSERT INTO highscores (score, username) VALUES ("+score+", '" + username + "')")
    db.commit()
    scores_cur.execute("SELECT username, score FROM highscores ORDER BY score DESC LIMIT 5")
    high_scores = scores_cur.fetchall()
    print high_scores
    return json.dumps(high_scores)


@get('/gameplaywords')
def grab_gameplay_words():
    words_cur.execute("select * from gamewords")
    results = words_cur.fetchall()
    return json.dumps(results)


@get('/')
def land():
    return template('moviegame.html')


@get('/js/<filename:re:.*\.js>')
def javascripts(filename):
    return static_file(filename, root='js')


@get('/css/<filename:re:.*\.css>')
def stylesheets(filename):
    return static_file(filename, root='css')


@get('/images/<filename:re:.*\.(jpg|png|gif|ico)>')
def images(filename):
    return static_file(filename, root='images')


run(host='127.0.0.1', port=8081, debug=True)
