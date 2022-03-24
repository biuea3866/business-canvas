"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var express_1 = __importDefault(require("express"));
var index_1 = require("./routes/index");
var app = (0, express_1.default)();
exports.app = app;
app.use(body_parser_1.default.json());
app.use((0, compression_1.default)());
app.use("/", index_1.router);
//# sourceMappingURL=app.js.map