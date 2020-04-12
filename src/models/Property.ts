import {
  Table, Column, Model, DataType, Default, BelongsTo, ForeignKey, UpdatedAt, CreatedAt,
  BeforeCreate
} from "sequelize-typescript";
import { uuid } from 'uuidv4';
import User from './User';

@Table
export default class Property extends Model<Property> {
  @Column
  public name!: string;

  @Column
  public propertyType!: string;
  @Default('apartment')

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

  @Column(DataType.BOOLEAN)
  public available!: boolean;

  @BelongsTo(() => User)
  public landlord: User;

  @CreatedAt
  @Column
  public createdAt!: Date;

  @UpdatedAt
  @Column
  public updatedAt!: Date;

  public toJson = () => {
    const values = Object.assign({}, this.get());

    if (values['features'] === null) values['features'] = [];
    delete values['createdAt'];
    delete values['updatedAt'];
    return values;
  };

  @BeforeCreate
  static generateUid = (instance: Property) => {
    instance.uid = uuid();
  }
}
