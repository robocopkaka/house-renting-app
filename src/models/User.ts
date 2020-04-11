// tslint:disable: variable-name

import {
  Table, Column, Model, BeforeCreate, HasMany, CreatedAt, UpdatedAt
} from "sequelize-typescript";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Property from './Property';

@Table
export default class Landlord extends Model<Landlord> {
  @Column
  public email!: string;

  @Column
  public name!: string;

  @Column
  public phoneNumber?: string;

  @Column
  public password!: string;

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;

  @HasMany(() => Property, 'landlordId')
  public properties: Property[];

  @BeforeCreate
  static hashPassword(instance: Landlord) {
    const salt = bcrypt.genSaltSync();
    instance.password = bcrypt.hashSync(instance.password, salt);
  };

  public validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  };

  public toJSON = () => {
    const values = Object.assign({}, this.get());

    delete values['password'];
    return values;
  };

  public generateAuthToken = () => {
    const user = this;
    const access = 'auth';
    return jwt.sign(
      { id: user.id, access },
      process.env.SECRET_KEY,
      // secret key to expire in three days
      { expiresIn: 259200 }
    ).toString();
  };
}
