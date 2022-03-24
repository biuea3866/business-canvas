import { app } from '../../app';
import request from 'supertest';
import { CreateDto } from '../../dto/create.dto';
import { BAD_GATEWAY, CREATED, OK, SUCCESS_CREATE_DOC_RESOURCE, SUCCESS_CREATE_FILE_RESOURCE, SUCCESS_CREATE_URL_RESOURCE } from '../../constants/result.code';
import { CreateLinkDto } from '../../dto/create.link.dto';

describe("Api Routing Test", () => {
    beforeAll(done => {
        app.listen(done);
    });

    beforeAll(() => {
        jest.setTimeout(10000);
    });

    test("Api Routing (url) :: [POST] /resources", () => {
        const createDto: CreateDto = {
            contentType: "plain/text",
            target: "https://naver.com/news/123",
            name: "네이버"
        };

        return request(app).post("/resources")
                           .send(createDto)
                           .then(response => {
                               expect([CREATED, BAD_GATEWAY]).toContain(response.status);
                           });
    });

    test("Api Routing :: [GET] /resources", () => {
        return request(app).get("/resources")
                           .then(response => {
                               expect(response.status).toBe(OK)
                           });
    });

    test("Api Routing :: [POST] /resources/link", () => {
        const dto: CreateLinkDto = {
            from: 350,
            to: 346
        };

        return request(app).post("/resources/link")
                           .send(dto)
                           .then(response => {
                               expect([CREATED, BAD_GATEWAY]).toContain(response.status);
                           });
    });

    test("Api Routing :: [GET] /resources/:id", () => {
        const parameter = 350;

        return request(app).get(`/resources/${parameter}`)
                           .then(response => {
                               expect(response.status).toBe(OK || BAD_GATEWAY);
                           });
    });
});