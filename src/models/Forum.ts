import { AllowNull, 
  BelongsToMany, 
  Column, 
  Model, 
  PrimaryKey, 
  Table } from "sequelize-typescript";
import { DataTypes } from 'sequelize';
import { User } from "./User";
import { Message } from "./Messages";

 @Table ({
  tableName: 'forum',
  createdAt: false,
  updatedAt: false
 })

export class Forum extends Model {
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
  name: string;

  @BelongsToMany(() => User, 'user_forum', 'forumId', 'userId')
  @Column ({
    type: DataTypes.ARRAY(DataTypes.JSONB)
  })
  users: User[]

  @BelongsToMany(() => Message, 'message_forum', 'forumId', 'messageId')
  @Column ({
    type: DataTypes.ARRAY(DataTypes.JSONB)
  })
  messages: Message[]
}