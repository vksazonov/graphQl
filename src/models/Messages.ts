import { AllowNull, 
  BelongsTo, 
  Column, 
  Model, 
  PrimaryKey, 
  Table } from "sequelize-typescript";
import { DataTypes } from 'sequelize';
import { User } from "./User";

@Table ({
  tableName: 'messages',
  createdAt: false,
  updatedAt: false
 })

export class Message extends Model {
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
  sentAt: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })

  @BelongsTo(() => User)
  @Column({
    type: DataTypes.JSONB,
  }) 
  user: User;
}
