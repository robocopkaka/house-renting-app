import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../models/index'

chai.should();
const { expect } = chai;
chai.use(chaiHttp);

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
            expect(res.body.user).to.be.an.instanceof(Object).that.includes.all.keys('id','email', 'name', 'phoneNumber', 'createdAt', 'updatedAt')
            done()
        })
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
            expect(res.body.message).to.be.eq('The fields are required. (email, name, password, phoneNumber)')
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
            expect(res.body.message).to.be.eq('The fields(email or name) are required.')
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
            expect(res.body.message).to.be.eq('The email is invalid.')
            done()
        })
    });
    it('landlord should see an error when phone Number is not present', (done)=> {
        chai.request(app)
        .post('/landlord/signup')
        .send({
            email: 'testttt@gmail.com',
            password: 'testpassword',
            name: 'try',
            phoneNumber: ''
        })
        .end((error, res) => {
            res.should.have.status(400);
            expect(res.body.message).to.be.eq('The phoneNumber is required.')
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
            expect(res.body.message).to.be.eq('The password are required.')
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
            expect(res.body.user).to.be.an.instanceof(Object).that.includes.all.keys('id','email', 'name', 'phoneNumber', 'createdAt', 'updatedAt')
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
            expect(res.body.error).to.be.eq('Invalid Credentials')
            done()
        })
    });
})
