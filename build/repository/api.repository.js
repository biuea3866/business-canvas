"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRepository = void 0;
var result_code_1 = require("../constants/result.code");
var mysql_connection_1 = require("../model/mysql.connection");
var ApiRepository = /** @class */ (function () {
    function ApiRepository() {
    }
    ApiRepository.prototype.isExistResource = function (PARAM) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 8, 9]);
                        SQL = "SELECT resource_id " +
                            "FROM resources " +
                            "WHERE name = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAM)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _b.sent();
                        console.log(results);
                        if (results[0]) {
                            return [2 /*return*/, {
                                    code: result_code_1.IS_EXIST_RESOURCE,
                                    message: "The resource is existed in document's links",
                                    payload: null
                                }];
                        }
                        return [2 /*return*/, {
                                code: result_code_1.IS_NOT_EXIST_RESOURCE,
                                message: "This resource can be to adding to links",
                                payload: null
                            }];
                    case 6:
                        e_1 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_1),
                                payload: null
                            }];
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.createResource = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, entity, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 17, 19, 20]);
                        SQL = "INSERT INTO " +
                            "resources(name, type, resource_id) " +
                            "VALUES(?, ?, ?)";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        if (!!results.insertId) return [3 /*break*/, 6];
                        return [4 /*yield*/, connection.rollback()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.FAILURE_CREATE_RESOURCE,
                                message: "Failed to create file resource",
                                payload: null
                            }];
                    case 6: return [4 /*yield*/, connection.commit()];
                    case 7:
                        _b.sent();
                        if (!(PARAMS[1] === "document")) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.getDocResource(results.insertId)];
                    case 8: return [4 /*yield*/, (_b.sent()).payload];
                    case 9:
                        entity = _b.sent();
                        return [3 /*break*/, 16];
                    case 10:
                        if (!(PARAMS[1] === "file")) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.getFileResource(results.insertId)];
                    case 11: return [4 /*yield*/, (_b.sent()).payload];
                    case 12:
                        entity = _b.sent();
                        return [3 /*break*/, 16];
                    case 13:
                        if (!(PARAMS[1] === "url")) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.getUrlResource(results.insertId)];
                    case 14: return [4 /*yield*/, (_b.sent()).payload];
                    case 15:
                        entity = _b.sent();
                        _b.label = 16;
                    case 16: return [2 /*return*/, {
                            code: result_code_1.SUCCESS_CREATE_RESOURCE,
                            message: "Create a new resource",
                            payload: entity
                        }];
                    case 17:
                        e_2 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 18:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_2),
                                payload: null
                            }];
                    case 19:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.getFileResource = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 7, 8]);
                        SQL = "SELECT * " +
                            "FROM resources " +
                            "WHERE resource_id = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_FILE_RESOURCE,
                                message: "Get file resource",
                                payload: results[0]
                            }];
                    case 6:
                        e_3 = _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_3),
                                payload: null
                            }];
                    case 7:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.createFileMetaResource = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, 10, 11]);
                        SQL = "INSERT INTO " +
                            "file_metadata(path, mime_type, size, resource_id, file_meta_id) " +
                            "VALUES(?, ?, ?, ?, ?)";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        if (!!results.insertId) return [3 /*break*/, 6];
                        return [4 /*yield*/, connection.rollback()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.FAILURE_CREATE_FILE_RESOURCE,
                                message: "Failed to create file resource",
                                payload: null
                            }];
                    case 6: return [4 /*yield*/, connection.commit()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.SUCCESS_CREATE_FILE_RESOURCE,
                                message: "Create a new resource",
                                payload: results.insertId
                            }];
                    case 8:
                        e_4 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 9:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_4),
                                payload: null
                            }];
                    case 10:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.getFileMetadataByResourceId = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 8, 9]);
                        SQL = "SELECT * " +
                            "FROM file_metadata " +
                            "WHERE resource_id = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_FILE_RESOURCE,
                                message: "Get file resource",
                                payload: results[0]
                            }];
                    case 6:
                        e_5 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_5),
                                payload: null
                            }];
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.getDocResource = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 7, 8]);
                        SQL = "SELECT * " +
                            "FROM resources " +
                            "WHERE resource_id = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_DOC_RESOURCE,
                                message: "Get doc resource",
                                payload: results[0]
                            }];
                    case 6:
                        e_6 = _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_6),
                                payload: null
                            }];
                    case 7:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.createDocMetaResource = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, 10, 11]);
                        SQL = "INSERT INTO " +
                            "doc_metadata(type, creator, origin, resource_id, doc_meta_id) " +
                            "VALUES(?, ?, ?, ?, ?)";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        if (!!results.insertId) return [3 /*break*/, 6];
                        return [4 /*yield*/, connection.rollback()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.FAILURE_CREATE_DOC_RESOURCE,
                                message: "Failed to create doc resource",
                                payload: null
                            }];
                    case 6: return [4 /*yield*/, connection.commit()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.SUCCESS_CREATE_DOC_RESOURCE,
                                message: "Create a new resource",
                                payload: results.insertId
                            }];
                    case 8:
                        e_7 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 9:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_7),
                                payload: null
                            }];
                    case 10:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.getDocMetadataByResourceId = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, results, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, 8, 9]);
                        SQL = "SELECT * " +
                            "FROM doc_metadata " +
                            "WHERE resource_id = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        results = (_a.sent())[0];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_DOC_RESOURCE,
                                message: "Get document resource",
                                payload: results[0]
                            }];
                    case 6:
                        e_8 = _a.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_8),
                                payload: null
                            }];
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.getDocLinksByResourceId = function (PARAM) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, linkdata, links, e_9;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, 9, 10]);
                        SQL = "SELECT * " +
                            "FROM doc_links " +
                            "WHERE resource_id = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAM)];
                    case 4:
                        linkdata = (_a.sent())[0];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(linkdata.map(function (link) { return __awaiter(_this, void 0, void 0, function () {
                                var resource, metadata;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getFileResource([link.resource_ids])];
                                        case 1: return [4 /*yield*/, (_a.sent()).payload];
                                        case 2:
                                            resource = _a.sent();
                                            return [4 /*yield*/, this.getFileMetadataByResourceId([link.resource_ids])];
                                        case 3: return [4 /*yield*/, (_a.sent()).payload];
                                        case 4:
                                            metadata = _a.sent();
                                            return [2 /*return*/, __assign(__assign({}, resource), { metadata: metadata })];
                                    }
                                });
                            }); }))];
                    case 6:
                        links = _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_DOC_RESOURCE,
                                message: "Get doc resource",
                                payload: links
                            }];
                    case 7:
                        e_9 = _a.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_9),
                                payload: null
                            }];
                    case 9:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.getUrlResource = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 7, 8]);
                        SQL = "SELECT * " +
                            "FROM resources " +
                            "WHERE resource_id = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_URL_RESOURCE,
                                message: "Get url resource",
                                payload: results[0]
                            }];
                    case 6:
                        e_10 = _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_10),
                                payload: null
                            }];
                    case 7:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.createUrlMetaResource = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, 10, 11]);
                        SQL = "INSERT INTO " +
                            "url_metadata(path, url_meta_id, resource_id) " +
                            "VALUES(?, ?, ?)";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        if (!!results.insertId) return [3 /*break*/, 6];
                        return [4 /*yield*/, connection.rollback()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.FAILURE_CREATE_URL_RESOURCE,
                                message: "Failed to create url resource",
                                payload: null
                            }];
                    case 6: return [4 /*yield*/, connection.commit()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.SUCCESS_CREATE_URL_RESOURCE,
                                message: "Create a new resource",
                                payload: results.insertId
                            }];
                    case 8:
                        e_11 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 9:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_11),
                                payload: null
                            }];
                    case 10:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.getUrlMetadataByResourceId = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, results, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, 8, 9]);
                        SQL = "SELECT * " +
                            "FROM url_metadata " +
                            "WHERE resource_id = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        results = (_a.sent())[0];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_URL_RESOURCE,
                                message: "Get url resource",
                                payload: results[0]
                            }];
                    case 6:
                        e_12 = _a.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_12),
                                payload: null
                            }];
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.getResources = function (parameter) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, returnValue, SQL, _b, results, rows, returnValue, SQL, _c, results, rows, returnValue, SQL, _d, results, rows, returnValue, e_13;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _e.sent();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 23, 25, 26]);
                        if (!(parameter === null || parameter === undefined)) return [3 /*break*/, 7];
                        SQL = "SELECT * " +
                            "FROM resources";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, connection.query(SQL)];
                    case 4:
                        _a = _e.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _e.sent();
                        return [4 /*yield*/, Promise.all(results.map(function (entity) { return __awaiter(_this, void 0, void 0, function () {
                                var PARAM, resource, metadata, links;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            PARAM = [entity.resource_id];
                                            if (!(entity.type === "document")) return [3 /*break*/, 7];
                                            return [4 /*yield*/, this.getDocResource(PARAM)];
                                        case 1: return [4 /*yield*/, (_a.sent()).payload];
                                        case 2:
                                            resource = _a.sent();
                                            return [4 /*yield*/, this.getDocMetadataByResourceId(PARAM)];
                                        case 3: return [4 /*yield*/, (_a.sent()).payload];
                                        case 4:
                                            metadata = _a.sent();
                                            return [4 /*yield*/, this.getDocLinksByResourceId(PARAM)];
                                        case 5: return [4 /*yield*/, (_a.sent()).payload];
                                        case 6:
                                            links = _a.sent();
                                            _a.label = 7;
                                        case 7:
                                            if (!(entity.type === "file")) return [3 /*break*/, 12];
                                            return [4 /*yield*/, this.getFileResource(PARAM)];
                                        case 8: return [4 /*yield*/, (_a.sent()).payload];
                                        case 9:
                                            resource = _a.sent();
                                            return [4 /*yield*/, this.getFileMetadataByResourceId(PARAM)];
                                        case 10: return [4 /*yield*/, (_a.sent()).payload];
                                        case 11:
                                            metadata = _a.sent();
                                            _a.label = 12;
                                        case 12:
                                            if (!(entity.type === "url")) return [3 /*break*/, 17];
                                            return [4 /*yield*/, this.getUrlResource(PARAM)];
                                        case 13: return [4 /*yield*/, (_a.sent()).payload];
                                        case 14:
                                            resource = _a.sent();
                                            return [4 /*yield*/, this.getUrlMetadataByResourceId(PARAM)];
                                        case 15: return [4 /*yield*/, (_a.sent()).payload];
                                        case 16:
                                            metadata = _a.sent();
                                            _a.label = 17;
                                        case 17: return [2 /*return*/, __assign(__assign({}, resource), { metadata: metadata, links: links })];
                                    }
                                });
                            }); }))];
                    case 6:
                        returnValue = _e.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_RESOURCES,
                                message: "Get Resource list",
                                payload: returnValue
                            }];
                    case 7:
                        if (!(parameter === "document")) return [3 /*break*/, 12];
                        SQL = "SELECT * " +
                            "FROM resources " +
                            "WHERE type = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 8:
                        _e.sent();
                        return [4 /*yield*/, connection.query(SQL, parameter)];
                    case 9:
                        _b = _e.sent(), results = _b[0], rows = _b[1];
                        return [4 /*yield*/, connection.commit()];
                    case 10:
                        _e.sent();
                        return [4 /*yield*/, Promise.all(results.map(function (entity) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata, links, response;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getDocMetadataByResourceId(entity.resource_id)];
                                        case 1: return [4 /*yield*/, (_a.sent()).payload];
                                        case 2:
                                            metadata = _a.sent();
                                            return [4 /*yield*/, this.getDocLinksByResourceId(entity.resource_id)];
                                        case 3: return [4 /*yield*/, (_a.sent()).payload];
                                        case 4:
                                            links = _a.sent();
                                            response = __assign(__assign({}, entity), { metadata: metadata, links: links });
                                            return [2 /*return*/, response];
                                    }
                                });
                            }); }))];
                    case 11:
                        returnValue = _e.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_RESOURCES,
                                message: "Get Doc Resource list",
                                payload: returnValue
                            }];
                    case 12:
                        if (!(parameter === "file")) return [3 /*break*/, 17];
                        SQL = "SELECT * " +
                            "FROM resources " +
                            "WHERE type = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 13:
                        _e.sent();
                        return [4 /*yield*/, connection.query(SQL, parameter)];
                    case 14:
                        _c = _e.sent(), results = _c[0], rows = _c[1];
                        return [4 /*yield*/, connection.commit()];
                    case 15:
                        _e.sent();
                        return [4 /*yield*/, Promise.all(results.map(function (entity) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata, response;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getFileMetadataByResourceId(entity.resource_id)];
                                        case 1: return [4 /*yield*/, (_a.sent()).payload];
                                        case 2:
                                            metadata = _a.sent();
                                            response = __assign(__assign({}, entity), { metadata: metadata });
                                            return [2 /*return*/, response];
                                    }
                                });
                            }); }))];
                    case 16:
                        returnValue = _e.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_RESOURCES,
                                message: "Get File Resource list",
                                payload: returnValue
                            }];
                    case 17:
                        if (!(parameter === "url")) return [3 /*break*/, 22];
                        SQL = "SELECT * " +
                            "FROM resources " +
                            "WHERE type = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 18:
                        _e.sent();
                        return [4 /*yield*/, connection.query(SQL, parameter)];
                    case 19:
                        _d = _e.sent(), results = _d[0], rows = _d[1];
                        return [4 /*yield*/, connection.commit()];
                    case 20:
                        _e.sent();
                        return [4 /*yield*/, Promise.all(results.map(function (entity) { return __awaiter(_this, void 0, void 0, function () {
                                var metadata, response;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.getUrlMetadataByResourceId(entity.resource_id)];
                                        case 1: return [4 /*yield*/, (_a.sent()).payload];
                                        case 2:
                                            metadata = _a.sent();
                                            response = __assign(__assign({}, entity), { metadata: metadata });
                                            return [2 /*return*/, response];
                                    }
                                });
                            }); }))];
                    case 21:
                        returnValue = _e.sent();
                        return [2 /*return*/, {
                                code: result_code_1.GET_RESOURCES,
                                message: "Get Url Resource list",
                                payload: returnValue
                            }];
                    case 22: return [2 /*return*/, {
                            code: result_code_1.FAILED_TO_GET_RESOURCES,
                            message: "Wrong parameter",
                            payload: null
                        }];
                    case 23:
                        e_13 = _e.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 24:
                        _e.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_13),
                                payload: null
                            }];
                    case 25:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 26: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.isDoc = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 8, 9]);
                        SQL = "SELECT type " +
                            "FROM resources " +
                            "WHERE resource_id = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _b.sent();
                        if (results[0].type !== "document") {
                            return [2 /*return*/, {
                                    code: result_code_1.IS_NOT_DOCUMENT,
                                    message: "Type is not document",
                                    payload: null
                                }];
                        }
                        return [2 /*return*/, {
                                code: result_code_1.IS_DOCUMENT,
                                message: "Type is document",
                                payload: null
                            }];
                    case 6:
                        e_14 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_14),
                                payload: null
                            }];
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.isExistLink = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 8, 9]);
                        SQL = "SELECT * " +
                            "FROM doc_links " +
                            "WHERE resource_ids = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _b.sent();
                        if (results[0]) {
                            return [2 /*return*/, {
                                    code: result_code_1.IS_EXIST_LINK,
                                    message: "The link is existed",
                                    payload: null
                                }];
                        }
                        return [2 /*return*/, {
                                code: result_code_1.IS_NOT_EXIST_LINK,
                                message: "This link is not exist",
                                payload: null
                            }];
                    case 6:
                        e_15 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_15),
                                payload: null
                            }];
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.createResourceLink = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, e_16;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 8, 9]);
                        SQL = "INSERT INTO " +
                            "doc_links(resource_ids, resource_id) " +
                            "VALUES(?, ?) ";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.CREATE_RESOURCE_LINK,
                                message: "Created resource link",
                                payload: null
                            }];
                    case 6:
                        e_16 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_16),
                                payload: null
                            }];
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ApiRepository.prototype.getResource = function (PARAMS) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, SQL, _a, results, rows, returnValue, e_17;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mysql_connection_1.mysql.getConnection()];
                    case 1:
                        connection = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, 8, 9]);
                        SQL = "SELECT * " +
                            "FROM resources " +
                            "WHERE resource_id = ?";
                        return [4 /*yield*/, connection.beginTransaction()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, connection.query(SQL, PARAMS)];
                    case 4:
                        _a = _b.sent(), results = _a[0], rows = _a[1];
                        return [4 /*yield*/, connection.commit()];
                    case 5:
                        _b.sent();
                        returnValue = results.map(function (entity) { return __awaiter(_this, void 0, void 0, function () {
                            var PARAM, subQuery, metaResult, linkResult, response, subQuery_1, result, response, subQuery_2, result, response;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        PARAM = [entity.resource_id];
                                        if (!(entity.type === "document")) return [3 /*break*/, 7];
                                        subQuery = "SELECT * " +
                                            "FROM doc_metadata " +
                                            "WHERE resource_id = ?";
                                        return [4 /*yield*/, connection.beginTransaction()];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, connection.query(subQuery, PARAM)];
                                    case 2:
                                        metaResult = (_a.sent())[0];
                                        return [4 /*yield*/, connection.commit()];
                                    case 3:
                                        _a.sent();
                                        subQuery = "SELECT * " +
                                            "FROM doc_links " +
                                            "WHERE resource_id = ?";
                                        return [4 /*yield*/, connection.beginTransaction()];
                                    case 4:
                                        _a.sent();
                                        return [4 /*yield*/, connection.query(subQuery, PARAM)];
                                    case 5:
                                        linkResult = (_a.sent())[0];
                                        return [4 /*yield*/, connection.commit()];
                                    case 6:
                                        _a.sent();
                                        response = __assign(__assign({}, entity), { metadata: metaResult[0], links: linkResult[0] });
                                        return [2 /*return*/, response];
                                    case 7:
                                        if (!(entity.type === "file")) return [3 /*break*/, 11];
                                        subQuery_1 = "SELECT * " +
                                            "FROM file_metadata " +
                                            "WHERE resource_id = ?";
                                        return [4 /*yield*/, connection.beginTransaction()];
                                    case 8:
                                        _a.sent();
                                        return [4 /*yield*/, connection.query(subQuery_1, PARAM)];
                                    case 9:
                                        result = (_a.sent())[0];
                                        return [4 /*yield*/, connection.commit()];
                                    case 10:
                                        _a.sent();
                                        response = __assign(__assign({}, entity), { metadata: result[0] });
                                        return [2 /*return*/, response];
                                    case 11:
                                        if (!(entity.type === "url")) return [3 /*break*/, 15];
                                        subQuery_2 = "SELECT * " +
                                            "FROM url_metadata " +
                                            "WHERE resource_id = ?";
                                        return [4 /*yield*/, connection.beginTransaction()];
                                    case 12:
                                        _a.sent();
                                        return [4 /*yield*/, connection.query(subQuery_2, PARAM)];
                                    case 13:
                                        result = (_a.sent())[0];
                                        return [4 /*yield*/, connection.commit()];
                                    case 14:
                                        _a.sent();
                                        response = __assign(__assign({}, entity), { metadata: result[0] });
                                        return [2 /*return*/, response];
                                    case 15: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, {
                                code: result_code_1.GET_RESOURCES,
                                message: "Get Resource list",
                                payload: returnValue
                            }];
                    case 6:
                        e_17 = _b.sent();
                        return [4 /*yield*/, connection.rollback()];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, {
                                code: result_code_1.DATABASE_ERROR,
                                message: JSON.stringify(e_17),
                                payload: null
                            }];
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return ApiRepository;
}());
exports.ApiRepository = ApiRepository;
//# sourceMappingURL=api.repository.js.map