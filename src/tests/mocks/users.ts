const bcrypt = require('bcrypt');

const hashPassword = (password: string) => bcrypt.hashSync(password, bcrypt.genSaltSync());

export const userSignupDetails = {
    email: 'testdb@gmail.com',
    password: 'testpassword',
    name: 'tester',
    phoneNumber: '0888888888',
    role: 'landlord'
};

export const users =  [
    {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: hashPassword('password'),
        phoneNumber: '07063707123',
        role: 'landlord',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Doe',
        email: 'jandoe@gmail.com',
        password: hashPassword('password'),
        phoneNumber: '07063703456',
        role: 'tenant',
        createdAt: new Date(),
        updatedAt: new Date()
      }
];
