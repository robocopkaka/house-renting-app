import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import models from '../models';

chai.should();
const { expect } = chai;
chai.use(chaiHttp);

const landlord = models.Landlord;

describe('tests users', () => {
    let landlordEmail;
    before(async () => {
    })

    after(async() => {
        landlord.destroy({ where: {}, force: true })
    });

    describe('/signup', () => {
        it('landlord should successfully signup', (done) => {
            chai.request(app)
            .post('/landlord/signup')
            .send({
                email: 'testdb@gmail.com',
                password: 'testpassword',
                name: 'tester',
                phoneNumber: '0888888888'
            })
            .end((error, res) => {
                res.should.have.status(201);
                expect(res.body.user).to.be.an.instanceof(Object)
                .that.includes.all.keys('id','email', 'name', 'phoneNumber', 'createdAt', 'updatedAt')
                landlordEmail = res.body.user.email
                done()
            })
        });

        it('landlord should recieve error if email already exist', async()=> {
          const res = await chai.request(app)
            .post('/landlord/signup')
            .send({
                email: landlordEmail,
                password: 'testpassword',
                name: 'tester',
                phoneNumber: '0888888888'
            })
            res.should.have.status(409);
            expect(res.body.message).to.be.eq('Email has already been taken')
        });

        it('landlord should see an error when input fields are not present', (done)=> {
            chai.request(app)
            .post('/landlord/signup')
            .send({
                email: '',
                password: '',
                name: '',
                phoneNumber: ''
            })
            .end((error, res) => {
                res.should.have.status(400);
                expect(res.body.message).to.be.eq('"name" is not allowed to be empty')
                done()
            })
        });
        it('landlord should see an error when name and email fields are not present', (done)=> {
            chai.request(app)
            .post('/landlord/signup')
            .send({
                email: '',
                password: 'testpassword',
                name: '',
                phoneNumber: '0888888888'
            })
            .end((error, res) => {
                res.should.have.status(400);
                done()
            })
        });
        it('landlord should see an error when email is not valid', (done)=> {
            chai.request(app)
            .post('/landlord/signup')
            .send({
                email: 'testttt',
                password: 'testpassword',
                name: 'try',
                phoneNumber: '0888888888'
            })
            .end((error, res) => {
                res.should.have.status(400);
                expect(res.body.message).to.be.eq('"email" must be a valid email')
                done()
            })
        });
        it('landlord should see an error when phone Number is not present', (done)=> {
            chai.request(app)
            .post('/landlord/signup')
            .send({
                email: 'testttt@gmail.com',
                password: 'testpassword',
                name: 'try'
            })
            .end((error, res) => {
                res.should.have.status(400);
                expect(res.body.message).to.be.eq('"phoneNumber" is required')
                done()
            })
        });
        it('landlord should see an error when password is not present', (done)=> {
            chai.request(app)
            .post('/landlord/signup')
            .send({
                email: 'testttt@gmail.com',
                password: '',
                name: 'try',
                phoneNumber: '0888888888'
            })
            .end((error, res) => {
                res.should.have.status(400);
                expect(res.body.message).to.be.eq('"password" is not allowed to be empty')
                done()
            })
        });
    })
    
    describe('/login', () => {
    
        it('landlord should successfully login', (done) => {
            chai.request(app)
            .post('/landlord/login')
            .send({
                email: 'testdb@gmail.com',
                password: 'testpassword',
            })
            .end((error, res) => {
                res.should.have.status(200);
                expect(res.body.user).to.be.an.instanceof(Object)
                .that.includes.all.keys('id','email', 'name', 'phoneNumber', 'createdAt', 'updatedAt')
                done()
            })
        });

        it('landlord should not successfully login when account is not found', (done) => {
            chai.request(app)
            .post('/landlord/login')
            .send({
                email: 'testdggb@gmail.com',
                password: 'testpassword',
            })
            .end((error, res) => {
                res.should.have.status(401);
                expect(res.body.message).to.be.eq('Invalid Credentials')
                done()
            })
        });
        it('landlord should not successfully login when password is not valid', (done) => {
            chai.request(app)
            .post('/landlord/login')
            .send({
                email: 'testdb@gmail.com',
                password: 'testpaddssword',
            })
            .end((error, res) => {
                res.should.have.status(401);
                expect(res.body.message).to.be.eq('Invalid Credentials')
                done()
            })
        });
    })
})
