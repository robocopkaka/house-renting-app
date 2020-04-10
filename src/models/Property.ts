import {
  Table, Column, Model, DataType, Default, BelongsTo, ForeignKey, UpdatedAt, CreatedAt
} from "sequelize-typescript";
import { uuid } from 'uuidv4';
import User from './User';

@Table
export default class Property extends Model<Property> {
  @Column
  public name!: string;

  @Column
  public propertyType!: string;
  @Default("apartment")

  @Column
  public description?: string;

  @Column
  public address!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  public features?: string;

  @Column
  public uid: string;
  @Default(uuid())

  @Column
  public category!: string;

  @ForeignKey(() => User)
  @Column
  public landlordId!: number;

  @BelongsTo(() => User)
  public landlord: User;

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;
}
