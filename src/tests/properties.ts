import chaiHttp from "chai-http";
import chai from 'chai';
import Property from '../models/Property';
import app from '../app';

chai.should();
chai.use(chaiHttp);

describe('properties tests', () => {
  let token;
  let token2;
  before(async () => {
    await chai.request(app)
      .post('/landlord/login')
      .send({
        email: 'landlord-1@gmail.com',
        password: 'password'
      })
      .then((res) => {
        token = res.body.token;
      });

    await chai.request(app)
      .post('/landlord/login')
      .send({
        email: 'landlord-2@gmail.com',
        password: 'password'
      })
      .then((res) => {
        token2 = res.body.token;
      });
  });
  after(async () => {
    await Property.destroy({ where: {}, force: true });
  });
  describe('create properties', () => {
    it('adds a new property when params are valid', (done) => {
      chai.request(app)
        .post('/properties')
        .set('token', token)
        .send({
          name: 'New property',
          description: 'Random description',
          address: 'Random address',
          propertyType: 'commercial',
          category: 'rent',
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.property.should.have.keys(
            'name', 'description', 'propertyType', 'address', 'features',
            'available', 'category', 'id', 'landlordId', 'uid'
          );
          res.body.property.available.should.eq(true);
          res.body.property.name.should.eq('New property');
          done();
        });
    });

    it('returns errors if required parameters are missing', (done) => {
      chai.request(app)
        .post('/properties')
        .set('token', token)
        .send({
          description: 'Random description',
          address: 'Random address',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.messages.should.include("\"name\" is required");
          res.body.messages.should.include("\"category\" is required");
          done()
        })
    });

    it('should return a 401 if token is invalid', (done) => {
      chai.request(app)
        .post('/properties')
        .set('token', 'token')
        .send({
          description: 'Random description',
          address: 'Random address',
        })
        .end((err, res) => {
          res.should.have.status(401);
          done()
        })
    })
  });

  describe('update properties', () => {
    it('updates a property when the owner sends a request', (done) => {
      chai.request(app)
        .patch('/properties/1')
        .set('token', token)
        .send({
          name: 'Edited name',
          description: 'Edited description',
          address: 'Edited address',
          features: [],
          category: 'sale',
          propertyType: 'commercial',
          available: false
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.property.should.include.all.keys(
            'id', 'landlordId', 'name', 'address', 'description', 'features',
            'propertyType', 'category'
          );
          res.body.property.name.should.eq('Edited name');
          res.body.property.description.should.eq('Edited description');
          res.body.property.address.should.eq('Edited address');
          done();
        });
    });

    it('should return an error if the property isn\'t found', (done) => {
      chai.request(app)
        .patch('/properties/100')
        .set('token', token)
        .send({
          name: 'Edited name'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eq('Property not found');
          done();
        });
    });

    it('should return an error if no value is passed', (done) => {
      chai.request(app)
        .patch('/properties/1')
        .set('token', token)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.eq('Please enter a value to be updated');
          done();
        })
    });

    it('should return an error if a landlord tries to update a property he does not own', (done) => {
      chai.request(app)
        .patch('/properties/1')
        .set('token', token2)
        .send({
          name: 'Edited name'
        })
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe('fetch a single property', () => {
    it('should return a property if the ID is valid', (done) => {
      chai.request(app)
        .get('/properties/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.property.id.should.eq(1);
          done();
        });
    });

    it('returns an error if the property ID does not exist', (done) => {
      chai.request(app)
        .get('/properties/100')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eq('Property not found')
          done();
        });
    });
  });

  describe('fetch properties', () => {
    it('returns exisitng properties', (done) => {
      chai.request(app)
        .get('/properties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.properties.length.should.eq(3);
          done();
        });
    });
  });

  describe('delete properties', () => {
    it('deletes a property if the ID is valid', (done) => {
      chai.request(app)
        .delete('/properties/1')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('returns an error if the property does not exist', (done) => {
      chai.request(app)
        .delete('/properties/100')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eq('Property not found');
          done();
        })
    });

    it('returns an error if the property does not belong to the landlord', (done) => {
      chai.request(app)
        .delete('/properties/2')
        .set('token', token2)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.eq('You don\'t own this property');
          done();
        })
    });
  });
});
