"use strict";
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
exports.ApiController = void 0;
var result_code_1 = require("../constants/result.code");
var api_service_1 = require("../service/api.service");
var ApiController = /** @class */ (function () {
    function ApiController() {
        this.apiService = new api_service_1.ApiService();
    }
    ApiController.prototype.createResource = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var createDto, createResponse, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        createDto = request.body;
                        return [4 /*yield*/, this.apiService.createResource(createDto)];
                    case 1:
                        createResponse = _a.sent();
                        if (createResponse.code === result_code_1.INTERNAL_SERVER_ERROR || createResponse.code === result_code_1.DATABASE_ERROR) {
                            return [2 /*return*/, response.status(result_code_1.INTERNAL_SERVER_ERROR)
                                    .json(createResponse.message)];
                        }
                        if ((createResponse.code === result_code_1.IS_EXIST_RESOURCE)) {
                            return [2 /*return*/, response.status(result_code_1.BAD_GATEWAY)
                                    .json(createResponse.message)];
                        }
                        return [2 /*return*/, response.status(result_code_1.CREATED)
                                .json(createResponse.payload)];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, response.status(result_code_1.INTERNAL_SERVER_ERROR)
                                .json(e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getResources = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, getAllResponse, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        parameter = request.query.type;
                        return [4 /*yield*/, this.apiService.getResources(parameter)];
                    case 1:
                        getAllResponse = _a.sent();
                        if ((getAllResponse.code === result_code_1.FAILED_TO_GET_RESOURCES) ||
                            (getAllResponse.code === result_code_1.DATABASE_ERROR)) {
                            return [2 /*return*/, response.status(result_code_1.BAD_GATEWAY)
                                    .json(getAllResponse.message)];
                        }
                        return [2 /*return*/, response.status(result_code_1.OK)
                                .json(getAllResponse.payload)];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, response.status(result_code_1.INTERNAL_SERVER_ERROR)
                                .json(e_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.createResourceLink = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var createLinkDto, createLinkResponse, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        createLinkDto = request.body;
                        return [4 /*yield*/, this.apiService.createResourceLink(createLinkDto)];
                    case 1:
                        createLinkResponse = _a.sent();
                        if (createLinkResponse.code === result_code_1.INTERNAL_SERVER_ERROR || createLinkResponse.code === result_code_1.DATABASE_ERROR) {
                            return [2 /*return*/, response.status(result_code_1.INTERNAL_SERVER_ERROR)
                                    .json(createLinkResponse.message)];
                        }
                        if (createLinkResponse.code === result_code_1.IS_DOCUMENT || createLinkResponse.code === result_code_1.IS_EXIST_LINK) {
                            return [2 /*return*/, response.status(result_code_1.BAD_GATEWAY)
                                    .json(createLinkResponse.message)];
                        }
                        return [2 /*return*/, response.status(result_code_1.CREATED)
                                .json(createLinkResponse.message)];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, response.status(result_code_1.INTERNAL_SERVER_ERROR)
                                .json(e_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getResource = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var getResourceDto, getResourceResponse, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        getResourceDto = { resourceId: parseInt(request.params.id) };
                        return [4 /*yield*/, this.apiService.getResource(getResourceDto)];
                    case 1:
                        getResourceResponse = _a.sent();
                        if (getResourceResponse.code === result_code_1.INTERNAL_SERVER_ERROR || getResourceResponse.code === result_code_1.DATABASE_ERROR) {
                            return [2 /*return*/, response.status(result_code_1.INTERNAL_SERVER_ERROR)
                                    .json(getResourceResponse.message)];
                        }
                        return [2 /*return*/, response.status(result_code_1.OK)
                                .json(getResourceResponse.payload)];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, response.status(result_code_1.INTERNAL_SERVER_ERROR)
                                .json(e_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ApiController;
}());
exports.ApiController = ApiController;
//# sourceMappingURL=api.route.js.map