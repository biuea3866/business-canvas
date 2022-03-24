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
var result_code_1 = require("../../constants/result.code");
var api_service_1 = require("../../service/api.service");
describe("ApiService Testing", function () {
    var service = new api_service_1.ApiService();
    describe("ApiService :: createResource", function () {
        test("url testing :: https 없는 url", function () { return __awaiter(void 0, void 0, void 0, function () {
            var arrAlphabet, randomTarget, randomName, i, dto, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
                        randomTarget = "";
                        randomName = "";
                        for (i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                            randomTarget += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                            randomName += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                        }
                        dto = {
                            contentType: "plain/text",
                            target: "www.".concat(randomTarget, ".com"),
                            name: "".concat(randomName)
                        };
                        return [4 /*yield*/, service.createResource(dto)];
                    case 1:
                        response = _a.sent();
                        expect(response.code).toBe(result_code_1.SUCCESS_CREATE_RESOURCE);
                        return [2 /*return*/];
                }
            });
        }); });
        test("url testing :: youtube url", function () { return __awaiter(void 0, void 0, void 0, function () {
            var arrAlphabet, randomParam, randomName, i, dto, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
                        randomParam = "";
                        randomName = "";
                        for (i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                            randomParam += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                            randomName += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                        }
                        dto = {
                            contentType: "plain/text",
                            target: "https://www.youtube.com/watch?v=".concat(randomParam),
                            name: "\uC720\uD29C\uBE0C".concat(randomName)
                        };
                        return [4 /*yield*/, service.createResource(dto)];
                    case 1:
                        response = _a.sent();
                        expect(response.code).toBe(result_code_1.SUCCESS_CREATE_RESOURCE);
                        return [2 /*return*/];
                }
            });
        }); });
        test("url testing :: encode url", function () { return __awaiter(void 0, void 0, void 0, function () {
            var arrAlphabet, randomTarget, randomName, randomParam, i, dto, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
                        randomTarget = "";
                        randomName = "";
                        randomParam = "";
                        for (i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                            randomTarget += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                            randomName += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                            randomParam += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                        }
                        dto = {
                            contentType: "plain/text",
                            target: encodeURIComponent("https://www.".concat(randomTarget, ".com?v=").concat(randomParam)),
                            name: "".concat(randomName)
                        };
                        return [4 /*yield*/, service.createResource(dto)];
                    case 1:
                        response = _a.sent();
                        expect(response.code).toBe(result_code_1.SUCCESS_CREATE_RESOURCE);
                        return [2 /*return*/];
                }
            });
        }); });
        test("file testing", function () { return __awaiter(void 0, void 0, void 0, function () {
            var randomType, arrAlphabet, randomTarget, contentType, i, dto, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        randomType = [
                            "application/pdf",
                            "application/octet-stream",
                            "image/png",
                            "video/mp4"
                        ];
                        arrAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
                        randomTarget = "";
                        contentType = randomType[Math.floor(Math.random() * randomType.length)];
                        for (i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                            randomTarget += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                        }
                        dto = {
                            contentType: contentType,
                            target: "".concat(randomTarget, ".").concat(contentType.split("/")[1]),
                            name: "".concat(randomTarget, "_").concat(contentType.split("/")[1])
                        };
                        return [4 /*yield*/, service.createResource(dto)];
                    case 1:
                        response = _a.sent();
                        expect(response.code).toBe(result_code_1.SUCCESS_CREATE_RESOURCE);
                        return [2 /*return*/];
                }
            });
        }); });
        test("doc testing", function () { return __awaiter(void 0, void 0, void 0, function () {
            var randomType, name, arrAlphabet, contentType, target, i, dto, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        randomType = [
                            "application/vnd.google-apps.document",
                            "application/vnd.google-apps.presentation",
                            "application/vnd.google-apps.spreadsheet"
                        ];
                        name = "";
                        arrAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
                        contentType = randomType[Math.floor(Math.random() * randomType.length)];
                        target = "";
                        if (contentType === "application/vnd.google-apps.document")
                            target = "https://docs.google.com/document/".concat(name);
                        if (contentType === "application/vnd.google-apps.presentation")
                            target = "https://docs.google.com/presentation/".concat(name);
                        if (contentType === "application/vnd.google-apps.spreadsheet")
                            target = "https://docs.google.com/spreadsheet/".concat(name);
                        for (i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                            name += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                        }
                        dto = {
                            contentType: contentType,
                            target: target,
                            name: name
                        };
                        return [4 /*yield*/, service.createResource(dto)];
                    case 1:
                        response = _a.sent();
                        expect(response.code).toBe(result_code_1.SUCCESS_CREATE_RESOURCE);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("ApiService :: getResources", function () {
        test("parameter => null", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parameter, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = null;
                        return [4 /*yield*/, service.getResources(parameter)];
                    case 1:
                        response = _a.sent();
                        expect(response.code).toBe(result_code_1.GET_RESOURCES);
                        return [2 /*return*/];
                }
            });
        }); });
        test("parameter => document", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parameter, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = "document";
                        return [4 /*yield*/, service.getResources(parameter)];
                    case 1:
                        response = _a.sent();
                        expect(response.code).toBe(result_code_1.GET_RESOURCES);
                        return [2 /*return*/];
                }
            });
        }); });
        test("parameter => file", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parameter, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = "file";
                        return [4 /*yield*/, service.getResources(parameter)];
                    case 1:
                        response = _a.sent();
                        expect(response.code).toBe(result_code_1.GET_RESOURCES);
                        return [2 /*return*/];
                }
            });
        }); });
        test("parameter => url", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parameter, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameter = "url";
                        return [4 /*yield*/, service.getResources(parameter)];
                    case 1:
                        response = _a.sent();
                        expect(response.code).toBe(result_code_1.GET_RESOURCES);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=api.service.test.js.map