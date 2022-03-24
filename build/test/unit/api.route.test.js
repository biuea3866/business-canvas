"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../../app");
var supertest_1 = __importDefault(require("supertest"));
var result_code_1 = require("../../constants/result.code");
describe("Api Routing Test", function () {
    beforeAll(function (done) {
        app_1.app.listen(done);
    });
    beforeAll(function () {
        jest.setTimeout(10000);
    });
    test("Api Routing (url) :: [POST] /resources", function () {
        var createDto = {
            contentType: "plain/text",
            target: "https://naver.com/news/123",
            name: "네이버"
        };
        return (0, supertest_1.default)(app_1.app).post("/resources")
            .send(createDto)
            .then(function (response) {
            expect(response.status).toBe(result_code_1.CREATED || result_code_1.BAD_GATEWAY);
        });
    });
    test("Api Routing :: [GET] /resources", function () {
        return (0, supertest_1.default)(app_1.app).get("/resources")
            .then(function (response) {
            expect(response.status).toBe(result_code_1.OK);
        });
    });
    test("Api Routing :: [POST] /resources/link", function () {
        var dto = {
            from: 350,
            to: 346
        };
        return (0, supertest_1.default)(app_1.app).post("/resources/link")
            .send(dto)
            .then(function (response) {
            expect(response.status).toBe(result_code_1.CREATED || result_code_1.BAD_GATEWAY);
        });
    });
    test("Api Routing :: [GET] /resources/:id", function () {
        var parameter = 350;
        return (0, supertest_1.default)(app_1.app).get("/resources/".concat(parameter))
            .then(function (response) {
            expect(response.status).toBe(result_code_1.OK || result_code_1.BAD_GATEWAY);
        });
    });
});
//# sourceMappingURL=api.route.test.js.map