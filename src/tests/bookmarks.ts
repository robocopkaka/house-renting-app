import chaiHttp from "chai-http";
import chai from 'chai';
import Bookmark from '../models/Bookmark';
import User from '../models/User'
import app from '../app';

chai.should();
chai.use(chaiHttp);

describe('bookmarks tests', () => {
    let token;
    let landlordToken;
    let tenantId;

    before(async() => {
        await chai.request(app)
        .post('/users/login')
        .send({
          email: 'tenant-1@gmail.com',
          password: 'password'
        })
        .then((res) => {
          token = res.body.token;
        });

        await chai.request(app)
        .post('/users/login')
        .send({
         email: 'landlord-1@gmail.com',
         password: 'password'
        })
        .then((res) => {
         landlordToken = res.body.token;
        });

        const tenant = await User.findOne({ attributes : ['id'], where: { email: 'tenant-1@gmail.com' } });
        tenantId = tenant.toJSON()['id'];
    });

    after(async () => {
        await Bookmark.destroy({ where: {}, force: true });
    });

    describe('create bookmarks', () => {
        it('adds a new bookmark', (done) => {
        chai.request(app)
        .post('/bookmarks')
        .set('token', token)
        .send({
          propertyId: 1
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.keys(
            'id','userId', 'propertyId', 'property'
          );
          res.body.property.should.have.keys( 'name', 'description', 'propertyType', 'address', 'features',
          'available', 'category', 'id', 'landlordId', 'uid');
          res.body.propertyId.should.eq(1);
          res.body.userId.should.eq(tenantId);
          done();
        });
        });

        it('returns errors if required parameters are missing', (done) => {
            chai.request(app)
              .post('/bookmarks')
              .set('token', token)
              .send({})
              .end((err, res) => {
                res.should.have.status(400);
                res.body.messages.should.include("\"propertyId\" is required");
                done()
              })
          });
        
          it('returns errors if property with Id does not exist', (done) => {
            chai.request(app)
              .post('/bookmarks')
              .set('token', token)
              .send({
                  propertyId: 300
              })
              .end((err, res) => {
                res.should.have.status(400);
                res.body.message.should.eq('Property with Id not found')
                done()
              })
          });
        

          it('should return a 401 if token is invalid', (done) => {
            chai.request(app)
              .post('/bookmarks')
              .set('token', 'token')
              .send({
                propertyId: 2
              })
              .end((err, res) => {
                res.should.have.status(401);
                done()
              })
          })
    });

    describe('fetch bookmarks', () => {
        describe('fetch all bookmarks', () => {
            it('returns a user\'s bookmarks', (done) => {
              chai.request(app)
                .get('/bookmarks')
                .set('token', token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.length.should.eq(1);
                  done();
                });
            });
          });

    });

    describe('delete bookmarks', () => {
        it('deletes a bookmark for a user', (done) => {
          chai.request(app)
            .delete('/bookmarks')
            .set('token', token)
            .send({
                propertyId: 1
              })
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
      });

      describe('unauthorized user', () => {
        it('returns an error when a landlord tries to add a bookmark', (done) => {
          chai.request(app)
            .post('/bookmarks')
            .set('token', landlordToken)
            .send({
                propertyId: 1
              })
            .end((err, res) => {
              res.should.have.status(401);
              res.body.message.should.eq('Unauthorized user')
              done();
            })
        });
      });


});
