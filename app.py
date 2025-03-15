from flask import *

app = Flask(__name__)

@app.route('/',methods=['GET','POST'])
def home():
    if request.method=='POST':
        return redirect(url_for('products'))
    
    return render_template('index.html')

@app.route('/products',methods=['GET','POST'])
def products():
    if request.method=='POST':
        return redirect(url_for('home'))
    
    return render_template('products.html')

if __name__ == '__main__':
    app.run(port=5000,debug=True)