// tslint:disable: variable-name

import User from '../models/User';
import sequelize from 'sequelize';

const Op = sequelize.Op;


export default class Landlord {

  public async signUp (req, res) {
    try {
      const { email, password, name, phoneNumber } = req.body;

      const userFound = await User.findOne({
        where : {
          email: {
            [Op.like]: email
          }
        }
      });
      if ( userFound ) {
        return res.status(409).json({
          statusCode: 409,
          message: 'Email has already been taken'
        });
      } else {
        const user = await User.create({
          email,
          password,
          name,
          phoneNumber
        });
        const token = user.generateAuthToken();
        res.status(201).json({
          statusCode: 201,
          user,
          token
        });
      }
    } catch (error) {
      return res.status(500).json({
        statusCode: 500, message: 'Server error'
      });
    }
  }

  public async login(req, res) {
    try {
      const { email, password } = req.body;
      const userFound = await User.findOne({
        where: {
          email: {
            [Op.like]: email,
          }
        }
      });
      if (!userFound) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Invalid Credentials'
        });
      } else if(!userFound.validPassword(password)) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Invalid Credentials'
        });
      }
      const token = userFound.generateAuthToken();
      return res.status(200).json({
        user:
          userFound
        ,
        message: `Welcome back ${userFound.name}`,
        token
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Server error'
      });
    }
  }
}
