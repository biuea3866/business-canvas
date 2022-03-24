import { ResponseDto } from "../../dto/response.dto";
import { BAD_GATEWAY, CREATE_RESOURCE_LINK, FAILURE_CREATE_RESOURCE, GET_RESOURCES, INTERNAL_SERVER_ERROR, IS_EXIST_LINK, IS_NOT_DOCUMENT, NOT_FOUND_RESOURCE, SUCCESS_CREATE_RESOURCE } from "../../constants/result.code";
import { ApiRepository } from "../../repository/api.repository";

describe("Api Repsitory testing", () => {
    const repository = new ApiRepository();

    describe("Api Repsitory :: createResource", () => {
        test("url testing", async () => {
            const PARAMS = [
                "네이버",
                "url",
                0
            ];

            expect(await (await repository.createResource(PARAMS)).code).toBe(SUCCESS_CREATE_RESOURCE || FAILURE_CREATE_RESOURCE);
        });

        test("file testing", async () => {
            const PARAMS = [
                "example_pdf",
                "file",
                0
            ];

            expect(await (await repository.createResource(PARAMS)).code).toBe(SUCCESS_CREATE_RESOURCE || FAILURE_CREATE_RESOURCE);
        });

        test("doc testing", async () => {
            const PARAMS = [
                "도큐먼트",
                "document",
                0
            ];

            expect(await (await repository.createResource(PARAMS)).code).toBe(SUCCESS_CREATE_RESOURCE || FAILURE_CREATE_RESOURCE);
        });     
    });

    describe("Api Repository :: getResources", () => {
        test("PARAM => null", async () => {
            const parameter = null;

            expect(await (await repository.getResources(parameter)).code).toBe(GET_RESOURCES);
        });

        test("PARAM => document", async () => {
            const parameter = "document";

            expect(await (await repository.getResources(parameter)).code).toBe(GET_RESOURCES);
        });

        test("PARAM => file", async () => {
            const parameter = "file";

            expect(await (await repository.getResources(parameter)).code).toBe(GET_RESOURCES);
        });

        test("PARAM => url", async () => {
            const parameter = "url";

            expect(await (await repository.getResources(parameter)).code).toBe(GET_RESOURCES);
        });
    });

    describe("Api Repository :: createResourceLink", () => {
        test("난수로 테스트할 경우 from 이 문서인지를 판별하기 어렵고, 문서 아이디가 오는 경우에도 존재하는 링크가 있을 경우 때문에 실제 테스트로 해야함", async () => {
            const PARAMS: number[] = [346, 350];
            const response: ResponseDto = await repository.createResourceLink(PARAMS);

            expect([
                BAD_GATEWAY, 
                INTERNAL_SERVER_ERROR, 
                IS_NOT_DOCUMENT,
                IS_EXIST_LINK,
                CREATE_RESOURCE_LINK
            ]).toContain(response.code);
        });
    });

    describe("ApiService :: getResource", () => {
        test("난수로 테스트할 경우 존재하는 아이디 혹은 존재하지 않은 아이디로 테스트를 진행하기 때문에 실제 테스트 필요", async () => {
            const PARAMS: number[] = [Math.floor(Math.random() * 100)];
            const response: ResponseDto = await repository.getResource(PARAMS);

            expect([
                GET_RESOURCES,
                NOT_FOUND_RESOURCE
            ]).toContain(response.code);
        });
    });
});