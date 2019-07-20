from flask import *
import main
import json
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/',methods=['POST'])
def do_diff():
    _uname = request.form['inputUserName']
    _fname = request.form['inputFriendName']
    list = main.main(_uname,_fname)
    return json.dumps(list)

if __name__ == "__main__":
    app.run()