import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { StateCredentials } from "src/worker/worker.model";

interface UserCreationAttrs {
  username: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: "1", description: "ID" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  userId: number;

  @ApiProperty({ example: "123@mail.ru", description: "Email" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @ApiProperty({ example: "*****", description: "Password" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: "false", description: "true/false" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ example: "Some reason", description: "Reason of ban" })
  @Column({
    type: DataType.STRING,
  })
  banReason: string;

  @HasMany(() => Token)
  refreshTokens: Token[];

  @HasMany(() => StateCredentials)
  stateCredentials: StateCredentials[];
}

@Table({ tableName: "tokens" })
export class Token extends Model<Token> {
  @ApiProperty({ example: "1", description: "ID" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  refreshTokenId: number;

  @ForeignKey(() => User)
  @ApiProperty({ example: "*****", description: "Password" })
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  // @ApiProperty({ example: "123@mail.ru", description: "Email" })
  // @Column({
  //   type: DataType.STRING,
  // })
  // useragent: string;

  @ApiProperty({ example: "false", description: "true/false" })
  @Column({
    type: DataType.STRING,
  })
  refreshToken: string;

  @ApiProperty({ example: "false", description: "true/false" })
  @Column({
    type: DataType.DATE,
  })
  expiresAt: Date;
}
