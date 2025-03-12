from flask import *

app = Flask(__name__)

@app.route('/',methods=['GET','POST'])
def home():
    if request.method=='POST':
        return render_template('index.html')
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(port=5000,debug=True)