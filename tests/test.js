import chai from 'chai';
import chaiHttp from 'chai-http';
// import request from 'supertest';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;
describe("/test", () => {
  it("works", function (done) {
    chai
      .request(app)
      .get('/test')
      .end((err, res) => {
        expect(res).to.have.status(200)
        if(err) done(err);
        done();
      })
  });

  // it("doesn't work", function (done) {
  //   chai
  //     .request(app)
  //     .get('/test')
  //     .end((err, res) => {
  //       expect(res).to.have.status(100)
  //       if(err) done(err);
  //       done();
  //     });
  // });
});
