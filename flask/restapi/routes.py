from flask import Flask, request
from flask.ext.sqlalchemy import SQLAlchemy
from flask import jsonify

app = Flask(__name__)
db = SQLAlchemy(app)

# Connect to the mysql database.
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://danxyu:influx@localhost/ufosightings'

# Create a model to represent the 'sightings' table.
class Sighting(db.Model):
  __tablename__ = 'sightings'
  id = db.Column(db.Integer, primary_key = True)
  sighted_at = db.Column(db.Integer)
  reported_at = db.Column(db.Integer)
  location = db.Column(db.String(100))
  shape = db.Column(db.String(10))
  duration = db.Column(db.String(10))
  description = db.Column(db.Text)
  lat = db.Column(db.Float(6))
  lng = db.Column(db.Float(6))

# API: '/sightings/', Method: GET.
@app.route('/sightings/', methods=['GET'])
def sightings():

  # Only respond if the passed-in method matched 'GET'.
  if request.method == 'GET':
    lim = request.args.get('limit', 10)
    off = request.args.get('offset', 0)

    radius = request.args.get('radius', 10)
    location = request.args.get('location', ',')
    lat, lng = location.split(',')

    if lat and lng and radius:
      query = "SELECT id,  location, ( 3959 * acos( cos( radians( %(latitude)s ) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians( %(longitude)s ) ) + sin( radians( %(latitude)s ) ) * sin( radians( lat ) ) ) ) AS distance FROM sightings HAVING distance < %(radius)s ORDER BY distance LIMIT %(limit)s" % {"latitude": lat, "longitude": lng, "radius": radius, "limit": lim}
      results = Sighting.query.from_statement(query).all()
    else:
      results = Sighting.query.limit(lim).offset(off).all()

    # Parse the database query on Sightings.
    json_results = []
    for result in results:
      d = {'sighted_at': result.sighted_at,
           'reported_at': result.reported_at,
           'location': result.location,
           'shape': result.shape,
           'duration': result.duration,
           'description': result.description,
           'lat': result.lat,
           'lng': result.lng}
      json_results.append(d)

    # Send the results of db query to the user in json format.
    return jsonify(items = json_results)

# API: '/sightings/', Method: GET.
@app.route('/sightings/<int:sighting_id>', methods=['GET'])
def sighting(sighting_id):
  if request.method == 'GET':
    result = Sighting.query.filter_by(id = sighting_id).first()

    json_result = {'sighted_at': result.sighted_at,
                   'reported_at': result.reported_at,
                   'location': result.location,
                   'shape': result.shape,
                   'duration': result.duration,
                   'description': result.description,
                   'lat': result.lat,
                   'lng': result.lng}

    return jsonify(items = json_result)

if __name__ == '__main__':
  app.run(debug = True)