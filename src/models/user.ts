// tslint:disable: variable-name
import dotenv from 'dotenv';

dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const landlord = (sequelize, DataTypes) => {
  const Landlord = sequelize.define('Landlord', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Landlord.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });

  Landlord.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Instance method to generate token for the user
  Landlord.prototype.generateAuthToken = function generateAuthToken() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign(
      { id: user.id, access },
      process.env.SECRET_KEY,
      // secret key to expire in three days
      { expiresIn: 259200 }
    ).toString();
    return token;
  };

    // Instance method to prevent password from
  // being sent to client.
  Landlord.prototype.toJSON = function toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };

  return Landlord;
};

export default landlord;
