import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
  import User from './User';
  import Property from './Property'
  
  @Table({
    timestamps: false,
  })
  export default class Bookmarks extends Model<Bookmarks> {

    @ForeignKey(() => User)
    @Column
    public userId!: number;
  
    @ForeignKey(() => Property)
    @Column
    public propertyId!: number;

    @BelongsTo(() => Property)
    property: Property;

    public toJSON = () => {
        const values: any = Object.assign({}, this.get());
        if (values.property) {
            values.property = values.property.toJson()
        }
        
        return values;
      }

  }

