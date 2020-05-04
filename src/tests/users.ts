import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import UserModel from '../models/User';
import { userSignupDetails, users } from './mocks/users';

const { expect } = chai;
chai.use(chaiHttp);

describe('tests users', () => {
    let userId;
    before(async () => {
        await UserModel.bulkCreate(users);
        const landlords = await UserModel.findAll();
        userId = landlords[0]['dataValues'].id;
    });

    after(async() => {
        await UserModel.destroy({ where: {}, force: true });
    });

    describe.only('/signup', () => {
        it('landlord should successfully signup', async() => {
           const res = await chai.request(app)
            .post('/users/signup')
            .send(userSignupDetails);
            expect(res).to.have.status(201);
            expect(res.body.user).to.be.an.instanceof(Object)
                .that.includes.all.keys('id','email', 'name', 'role', 'phoneNumber', 'createdAt', 'updatedAt');
        });

        it('landlord should receive error if email already exist', async()=> {
          const res = await chai.request(app)
            .post('/users/signup')
            .send(userSignupDetails);
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.eq('Email already exist');
        });

        it('landlord should see an error when input fields are not present', (done)=> {
            chai.request(app)
            .post('/users/signup')
            .send({
                email: '',
                password: '',
                name: '',
                phoneNumber: ''
            })
            .end((error, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.eq('"name" is not allowed to be empty');
                done();
            });
        });
        it('landlord should see an error when name and email fields are not present', (done)=> {
            chai.request(app)
            .post('/users/signup')
            .send({
                email: '',
                password: 'testpassword',
                name: '',
                phoneNumber: '0888888888'
            })
            .end((error, res) => {
                expect(res).to.have.status(400);
                done();
            });
        });
        it('landlord should see an error when email is not valid', (done)=> {
            chai.request(app)
            .post('/users/signup')
            .send({
                email: 'testttt',
                password: 'testpassword',
                name: 'try',
                phoneNumber: '0888888888'
            })
            .end((error, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.eq('"email" must be a valid email');
                done();
            });
        });
        it('landlord should see an error when phone Number is not present', (done)=> {
            chai.request(app)
            .post('/users/signup')
            .send({
                email: 'testttt@gmail.com',
                password: 'testpassword',
                name: 'try'
            })
            .end((error, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.eq('"phoneNumber" is required');
                done();
            });
        });
        it('landlord should see an error when password is not present', (done)=> {
            chai.request(app)
            .post('/users/signup')
            .send({
                email: 'testttt@gmail.com',
                password: '',
                name: 'try',
                phoneNumber: '0888888888'
            })
            .end((error, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.eq('"password" is not allowed to be empty');
                done();
            });
        });
    });
    describe('/login', () => {
        it('landlord should successfully login', (done) => {
            chai.request(app)
            .post('/users/login')
            .send({
                email: 'testdb@gmail.com',
                password: 'testpassword',
            })
            .end((error, res) => {
                expect(res).to.have.status(200);
                expect(res.body.user).to.be.an.instanceof(Object)
                .that.includes.all.keys('id','email', 'name', 'phoneNumber', 'createdAt', 'updatedAt');
                done();
            });
        });

        it('landlord should not successfully login when account is not found', (done) => {
            chai.request(app)
            .post('/users/login')
            .send({
                email: 'testdggb@gmail.com',
                password: 'testpassword',
            })
            .end((error, res) => {
                expect(res).to.have.status(401);
                expect(res.body.message).to.be.eq('Invalid Credentials');
                done();
            });
        });
        it('landlord should not successfully login when password is not valid', (done) => {
            chai.request(app)
            .post('/users/login')
            .send({
                email: 'testdb@gmail.com',
                password: 'testpaddssword',
            })
            .end((error, res) => {
                expect(res).to.have.status(401);
                expect(res.body.message).to.be.eq('Invalid Credentials');
                done();
            });
        });
    });

    describe('test landlord can update personal info', () => {
        it('should update user name and phoneNumber successfully', async () => {
            chai.request(app)
            .patch(`/users/${userId}`)
            .send({
                name: 'Landlord name edited',
                phoneNumber: '017895783909'
            })
            .end((error, res) => {
                expect(res).to.have.status(200);
                expect(res.body.landlord.name).to.eq('Landlord name edited');
                expect(res.body.landlord.phoneNumber).to.eq('017895783909');
            });
        });

        it('Should return 404 if id does not exist', async () => {
            chai.request(app)
            .patch('/users/100')
            .send({
                name: 'Landlord name edited',
                phoneNumber: '017895783909'
            })
            .end((error, res) => {
                expect(res).to.have.status(404);
                expect(res.body.message).to.eq('User not found.');
            });
        });

        it('Should return status 400 if no name and phoneNumber are passed', async () => {
            chai.request(app)
            .patch(`/users/${userId}`)
            .send({
            })
            .end((error, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.eq('Please provide a name, phoneNumber or both');
            });
        });
    });
});
