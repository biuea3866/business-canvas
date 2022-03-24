"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysql = void 0;
var mysql2_1 = __importDefault(require("mysql2"));
var env_variable_1 = require("../config/env.variable");
var pool = mysql2_1.default.createPool({
    host: env_variable_1.MYSQL_HOST,
    port: env_variable_1.MYSQL_PORT,
    user: env_variable_1.MYSQL_USER,
    password: env_variable_1.MYSQL_PASSWORD,
    database: env_variable_1.MYSQL_DATABASE
});
var mysql = pool.promise();
exports.mysql = mysql;
//# sourceMappingURL=mysql.connection.js.map