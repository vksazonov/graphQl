import { AllowNull, 
  Column, 
  Model, 
  PrimaryKey, 
  Table } from "sequelize-typescript";
import { DataTypes } from 'sequelize';

@Table ({
  tableName: 'user',
  createdAt: false,
  updatedAt: false
 })

export class User extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  username: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  picture: string;

  @Column({
    type: DataTypes.INTEGER,
  })
  age: number;
}
