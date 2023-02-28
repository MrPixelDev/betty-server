"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = exports.Strategy = exports.StateCredentials = exports.State = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("../../users/users.model");
let State = class State extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], State.prototype, "stateId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], State.prototype, "biBalance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], State.prototype, "bkBalance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], State.prototype, "profit", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Strategy),
    __metadata("design:type", Array)
], State.prototype, "strategyList", void 0);
State = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "states" })
], State);
exports.State = State;
let StateCredentials = class StateCredentials extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], StateCredentials.prototype, "stateCredentialsId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], StateCredentials.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, "userId"),
    __metadata("design:type", users_model_1.User)
], StateCredentials.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StateCredentials.prototype, "biName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StateCredentials.prototype, "biLogin", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StateCredentials.prototype, "biPassword", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StateCredentials.prototype, "bkName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StateCredentials.prototype, "bkLogin", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], StateCredentials.prototype, "bkPassword", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => State),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], StateCredentials.prototype, "stateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => State, "stateId"),
    __metadata("design:type", State)
], StateCredentials.prototype, "state", void 0);
StateCredentials = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "stateCredentials" })
], StateCredentials);
exports.StateCredentials = StateCredentials;
let Strategy = class Strategy extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Strategy.prototype, "strategyId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => State),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Strategy.prototype, "stateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => State),
    __metadata("design:type", State)
], Strategy.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Strategy.prototype, "strategyName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Strategy.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Strategy.prototype, "sportName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Strategy.prototype, "league", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Strategy.prototype, "leagueEvent", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Strategy.prototype, "bet", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Strategy.prototype, "obligation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Strategy.prototype, "marginality", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Strategy.prototype, "stackSize", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Strategy.prototype, "stackFilled", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Stock),
    __metadata("design:type", Array)
], Strategy.prototype, "stock", void 0);
Strategy = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "strategy" })
], Strategy);
exports.Strategy = Strategy;
let Stock = class Stock extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Strategy),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Stock.prototype, "strategyId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Strategy),
    __metadata("design:type", Strategy)
], Stock.prototype, "strategy", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Stock.prototype, "result", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Stock.prototype, "fonbetCf", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Stock.prototype, "bkCf", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Stock.prototype, "targetCf", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Stock.prototype, "obligationSum", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Stock.prototype, "bkSum", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Stock.prototype, "potentialBiGain", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Stock.prototype, "biGain", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
    }),
    __metadata("design:type", Number)
], Stock.prototype, "bkGain", void 0);
Stock = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "stock" })
], Stock);
exports.Stock = Stock;
//# sourceMappingURL=state.model.js.map