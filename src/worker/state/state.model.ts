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
  profit: number;

  @HasMany(() => Strategy)
  strategyList: Strategy[];
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

@Table({ tableName: "availableStrategies" })
export class AvailableStrategies extends Model<AvailableStrategies> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  availableStrategyId: number;

  @Column({
    type: DataType.STRING,
  })
  strategyName: string;

  @Column({
    type: DataType.STRING,
  })
  sportName: string;

  @Column({
    type: DataType.STRING,
  })
  league: string;

  @Column({
    type: DataType.STRING,
  })
  bet: string;

  @Column({
    type: DataType.FLOAT,
  })
  marginality: number;

  @Column({
    type: DataType.FLOAT,
  })
  obligation: number;

  @Column({
    type: DataType.INTEGER,
  })
  stackSize: number;
}

@Table({ tableName: "strategy" })
export class Strategy extends Model<Strategy> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  strategyId: number;

  @ForeignKey(() => State)
  @Column({
    type: DataType.INTEGER,
  })
  stateId: number;

  @BelongsTo(() => State)
  state: State;

  @Column({
    type: DataType.STRING,
  })
  strategyName: string;

  @Column({
    type: DataType.STRING,
  })
  status: string;

  @Column({
    type: DataType.STRING,
  })
  sportName: string;

  @Column({
    type: DataType.STRING,
  })
  league: string;

  @Column({
    type: DataType.STRING,
  })
  bet: string;

  @Column({
    type: DataType.FLOAT,
  })
  obligation: number;

  @Column({
    type: DataType.FLOAT,
  })
  marginality: number;

  @Column({
    type: DataType.INTEGER,
  })
  stackSize: number;

  @Column({
    type: DataType.INTEGER,
  })
  stackFilled: number;

  @HasMany(() => Stock)
  stock: Stock[];
}

@Table({ tableName: "stock" })
export class Stock extends Model<Stock> {
  @ForeignKey(() => Strategy)
  @Column({
    type: DataType.INTEGER,
  })
  strategyId: number;

  @BelongsTo(() => Strategy)
  strategy: Strategy;

  @Column({
    type: DataType.STRING,
  })
  result: string;

  @Column({
    type: DataType.FLOAT,
  })
  fonbetCf: number;

  @Column({
    type: DataType.FLOAT,
  })
  bkCf: number;

  @Column({
    type: DataType.FLOAT,
  })
  targetCf: number;

  @Column({
    type: DataType.FLOAT,
  })
  obligationSum: number;

  @Column({
    type: DataType.FLOAT,
  })
  bkSum: number;

  @Column({
    type: DataType.FLOAT,
  })
  potentialBiGain: number;

  @Column({
    type: DataType.FLOAT,
  })
  biGain: number;

  @Column({
    type: DataType.FLOAT,
  })
  bkGain: number;
}
