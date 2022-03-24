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
exports.ApiService = void 0;
var result_code_1 = require("../constants/result.code");
var api_repository_1 = require("../repository/api.repository");
var resource_util_1 = require("../util/resource.util");
var ApiService = /** @class */ (function () {
    function ApiService() {
        this.resourceUtil = new resource_util_1.ResourceUtil();
        this.apiRepository = new api_repository_1.ApiRepository();
    }
    ApiService.prototype.createResource = function (createDto) {
        return __awaiter(this, void 0, void 0, function () {
            var contentType, target, name, PARAM, isExistResource, resourceType, PARAMS, fileResponse, fileMetaResponse, PARAMS, docResponse, docMetaResponse, PARAMS, urlResponse, urlMetaResponse, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contentType = createDto.contentType, target = createDto.target, name = createDto.name;
                        if ([contentType, target, name].includes(null)) {
                            return [2 /*return*/, {
                                    code: result_code_1.MISSING_REQUIRED_INFORMATION,
                                    message: "Missing Required Information",
                                    payload: null
                                }];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 13, , 14]);
                        PARAM = [name];
                        return [4 /*yield*/, this.apiRepository.isExistResource(PARAM)];
                    case 2: return [4 /*yield*/, (_a.sent())];
                    case 3:
                        isExistResource = _a.sent();
                        if (isExistResource.code === result_code_1.IS_EXIST_RESOURCE) {
                            return [2 /*return*/, isExistResource];
                        }
                        resourceType = this.resourceUtil.checkType(contentType);
                        if (!(resourceType === result_code_1.FILE_TYPE)) return [3 /*break*/, 6];
                        PARAMS = [
                            name,
                            "file",
                            0
                        ];
                        return [4 /*yield*/, this.apiRepository.createResource(PARAMS)];
                    case 4:
                        fileResponse = _a.sent();
                        if (fileResponse.code !== result_code_1.SUCCESS_CREATE_RESOURCE) {
                            return [2 /*return*/, fileResponse];
                        }
                        PARAMS = [
                            this.resourceUtil.makeFilePath(contentType),
                            contentType,
                            Math.floor(Math.random() * 101),
                            fileResponse.payload.resource_id,
                            0
                        ];
                        return [4 /*yield*/, this.apiRepository.createFileMetaResource(PARAMS)];
                    case 5:
                        fileMetaResponse = _a.sent();
                        if (fileMetaResponse.code !== result_code_1.SUCCESS_CREATE_FILE_RESOURCE) {
                            return [2 /*return*/, fileResponse];
                        }
                        return [2 /*return*/, fileResponse];
                    case 6:
                        if (!(resourceType === result_code_1.DOC_TYPE)) return [3 /*break*/, 9];
                        PARAMS = [
                            name,
                            "document",
                            0
                        ];
                        return [4 /*yield*/, this.apiRepository.createResource(PARAMS)];
                    case 7:
                        docResponse = _a.sent();
                        if (docResponse.code !== result_code_1.SUCCESS_CREATE_RESOURCE) {
                            return [2 /*return*/, docResponse];
                        }
                        PARAMS = [
                            this.resourceUtil.makeDocType(contentType),
                            this.resourceUtil.makeRandomString(),
                            this.resourceUtil.makeRandomString(),
                            docResponse.payload.resource_id,
                            0
                        ];
                        return [4 /*yield*/, this.apiRepository.createDocMetaResource(PARAMS)];
                    case 8:
                        docMetaResponse = _a.sent();
                        if (docMetaResponse.code !== result_code_1.SUCCESS_CREATE_DOC_RESOURCE) {
                            return [2 /*return*/, docMetaResponse];
                        }
                        return [2 /*return*/, docResponse];
                    case 9:
                        if (!(resourceType === result_code_1.URL_TYPE)) return [3 /*break*/, 12];
                        PARAMS = [
                            name,
                            "url",
                            0
                        ];
                        return [4 /*yield*/, this.apiRepository.createResource(PARAMS)];
                    case 10:
                        urlResponse = _a.sent();
                        if (urlResponse.code !== result_code_1.SUCCESS_CREATE_RESOURCE) {
                            return [2 /*return*/, urlResponse];
                        }
                        PARAMS = [
                            this.resourceUtil.makeUrlPath(target),
                            0,
                            urlResponse.payload.resource_id
                        ];
                        return [4 /*yield*/, this.apiRepository.createUrlMetaResource(PARAMS)];
                    case 11:
                        urlMetaResponse = _a.sent();
                        if (urlMetaResponse.code !== result_code_1.SUCCESS_CREATE_URL_RESOURCE) {
                            return [2 /*return*/, urlMetaResponse];
                        }
                        return [2 /*return*/, urlResponse];
                    case 12: return [2 /*return*/, {
                            code: result_code_1.INTERNAL_SERVER_ERROR,
                            message: "Error",
                            payload: null
                        }];
                    case 13:
                        e_1 = _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.INTERNAL_SERVER_ERROR,
                                message: JSON.stringify(e_1),
                                payload: null
                            }];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.getResources = function (parameter) {
        return __awaiter(this, void 0, void 0, function () {
            var getAllResponse, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiRepository.getResources(parameter)];
                    case 1:
                        getAllResponse = _a.sent();
                        return [2 /*return*/, getAllResponse];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.INTERNAL_SERVER_ERROR,
                                message: JSON.stringify(e_2),
                                payload: null
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.createResourceLink = function (createLinkDto) {
        return __awaiter(this, void 0, void 0, function () {
            var from, to, PARAMS, isDocResponse, isExistLink, createLinkResponse, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        from = createLinkDto.from, to = createLinkDto.to;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        PARAMS = [to];
                        return [4 /*yield*/, this.apiRepository.isDoc(PARAMS)];
                    case 2:
                        isDocResponse = _a.sent();
                        if (isDocResponse.code === result_code_1.IS_NOT_DOCUMENT) {
                            return [2 /*return*/, isDocResponse];
                        }
                        PARAMS = [from];
                        return [4 /*yield*/, this.apiRepository.isExistLink(PARAMS)];
                    case 3:
                        isExistLink = _a.sent();
                        if (isExistLink.code === result_code_1.IS_EXIST_LINK) {
                            return [2 /*return*/, isExistLink];
                        }
                        PARAMS = [from,
                            to];
                        return [4 /*yield*/, this.apiRepository.createResourceLink(PARAMS)];
                    case 4:
                        createLinkResponse = _a.sent();
                        return [2 /*return*/, createLinkResponse];
                    case 5:
                        e_3 = _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.INTERNAL_SERVER_ERROR,
                                message: JSON.stringify(e_3),
                                payload: null
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.getResource = function (getResourceDto) {
        return __awaiter(this, void 0, void 0, function () {
            var resourceId, PARAMS, getResource, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resourceId = getResourceDto.resourceId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        PARAMS = [resourceId];
                        return [4 /*yield*/, this.apiRepository.getResource(PARAMS)];
                    case 2:
                        getResource = _a.sent();
                        return [2 /*return*/, __assign({}, getResource)];
                    case 3:
                        e_4 = _a.sent();
                        return [2 /*return*/, {
                                code: result_code_1.INTERNAL_SERVER_ERROR,
                                message: JSON.stringify(e_4),
                                payload: null
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map