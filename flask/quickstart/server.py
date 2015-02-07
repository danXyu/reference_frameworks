from flask import Flask
from flask import render_template
app = Flask(__name__)

# Route: ('/'), handle route for root app.
@app.route('/')
def index():
  return 'Index Page'

# Route: ('/hello'), handle route.
@app.route('/hello')

# Route: ('/hello/<name>'), shows the use of templates.
@app.route('/hello/<name>')
def hello(name=None):
  return render_template('hello.html', name=name)

# Route: ('/user/<username>'), allows for dynamic URLs.
@app.route('/user/<username>')
def show_user_profile(username):
  return 'User %s' % username

# Route: ('/post/<int:post_id>'), optionally allow for converters.
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return 'Post %d' % post_id

if __name__ == '__main__':
  app.run(debug = True)