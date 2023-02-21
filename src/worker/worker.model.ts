import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";

@Table({ tableName: "states" })
export class State extends Model<State> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  stateId: number;

  @Column({
    type: DataType.INTEGER,
  })
  status: number;

  @Column({
    type: DataType.FLOAT,
  })
  biBalance: number;

  @Column({
    type: DataType.FLOAT,
  })
  bkBalance: number;

  @Column({
    type: DataType.FLOAT,
  })
  betSum: number;

  @Column({
    type: DataType.INTEGER,
  })
  stackSize: number;

  @Column({
    type: DataType.INTEGER,
  })
  stackFilled: number;

  @Column({
    type: DataType.FLOAT,
  })
  profit: number;
}

@Table({ tableName: "stateCredentials" })
export class StateCredentials extends Model<StateCredentials> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  stateCredentialsId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User, "userId")
  user: User;

  @Column({
    type: DataType.STRING,
  })
  biName: string;

  @Column({
    type: DataType.STRING,
  })
  biLogin: string;

  @Column({
    type: DataType.STRING,
  })
  biPassword: string;

  @Column({
    type: DataType.STRING,
  })
  bkName: string;

  @Column({
    type: DataType.STRING,
  })
  bkLogin: string;

  @Column({
    type: DataType.STRING,
  })
  bkPassword: string;

  @ForeignKey(() => State)
  @Column({
    type: DataType.INTEGER,
  })
  stateId: number;

  @BelongsTo(() => State, "stateId")
  state: State;
}
