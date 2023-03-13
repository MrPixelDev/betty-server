"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyStatusEnum = exports.StrategyStatuses = exports.SportNames = void 0;
var SportNames;
(function (SportNames) {
    SportNames["SOCCER"] = "soccer";
})(SportNames = exports.SportNames || (exports.SportNames = {}));
var StrategyStatuses;
(function (StrategyStatuses) {
    StrategyStatuses["FILL"] = "\u0415\u0441\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u0438\u0433\u0440\u044B, \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0441\u0442\u0435\u043A\u0430";
    StrategyStatuses["WAITFORFILL"] = "\u041D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0438\u0433\u0440, \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0441\u0442\u0435\u043A\u0430";
})(StrategyStatuses = exports.StrategyStatuses || (exports.StrategyStatuses = {}));
var StrategyStatusEnum;
(function (StrategyStatusEnum) {
    StrategyStatusEnum["STOPPED"] = "Stopped";
    StrategyStatusEnum["ACTIVE"] = "Active";
    StrategyStatusEnum["PAUSED"] = "Paused";
})(StrategyStatusEnum = exports.StrategyStatusEnum || (exports.StrategyStatusEnum = {}));
//# sourceMappingURL=worker.enum.js.map