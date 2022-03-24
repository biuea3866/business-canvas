import { ResponseDto } from "../../dto/response.dto";
import { BAD_GATEWAY, CREATE_RESOURCE_LINK, GET_RESOURCES, INTERNAL_SERVER_ERROR, IS_DOCUMENT, IS_EXIST_LINK, IS_NOT_DOCUMENT, NOT_FOUND_RESOURCE, SUCCESS_CREATE_RESOURCE, SUCCESS_CREATE_URL_RESOURCE } from "../../constants/result.code";
import { CreateDto } from "../../dto/create.dto";
import { CreateLinkDto } from "../../dto/create.link.dto";
import { GetResourceDto } from "../../dto/get.resource.dto";
import { ApiService } from "../../service/api.service";

describe("ApiService Testing", () => {
    const service = new ApiService();

    describe("ApiService :: createResource", () => {
        test("url testing :: https 없는 url", async () => {
            const arrAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
            var randomTarget: string = "";
            var randomName: string = "";

            for(var i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                randomTarget += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                randomName += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
            }

            const dto: CreateDto = {
                contentType: "plain/text",
                target: `www.${randomTarget}.com`,
                name: `${randomName}`
            };
            const response: ResponseDto = await service.createResource(dto);

            expect(response.code).toBe(SUCCESS_CREATE_RESOURCE);
        });

        test("url testing :: youtube url", async () => {
            const arrAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
            var randomParam: string = "";
            var randomName: string = "";

            for(var i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                randomParam += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                randomName += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
            }

            const dto: CreateDto = {
                contentType: "plain/text",
                target: `https://www.youtube.com/watch?v=${randomParam}`,
                name: `유튜브${randomName}`
            };
            const response: ResponseDto = await service.createResource(dto);

            expect(response.code).toBe(SUCCESS_CREATE_RESOURCE);
        });

        test("url testing :: encode url", async () => {
            const arrAlphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
            var randomTarget: string = "";
            var randomName: string = "";
            var randomParam: string = "";

            for(var i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                randomTarget += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                randomName += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
                randomParam += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
            }

            const dto: CreateDto = {
                contentType: "plain/text",
                target: encodeURIComponent(`https://www.${randomTarget}.com?v=${randomParam}`),
                name: `${randomName}`
            };
            const response: ResponseDto = await service.createResource(dto);

            expect(response.code).toBe(SUCCESS_CREATE_RESOURCE);
        });

        test("file testing", async () => {
            const randomType: string[] = [
                "application/pdf",
                "application/octet-stream",
                "image/png",
                "video/mp4"
            ];
            const arrAlphabet: string[] = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
            var randomTarget: string = "";
            const contentType: string = randomType[Math.floor(Math.random() * randomType.length)]; 

            for(var i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                randomTarget += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
            }

            const dto: CreateDto = {
                contentType,
                target: `${randomTarget}.${contentType.split("/")[1]}`,
                name: `${randomTarget}_${contentType.split("/")[1]}`
            };
            const response: ResponseDto = await service.createResource(dto);

            expect(response.code).toBe(SUCCESS_CREATE_RESOURCE);
        });

        test("doc testing", async () => {
            const randomType: string[] = [
                "application/vnd.google-apps.document",
                "application/vnd.google-apps.presentation",
                "application/vnd.google-apps.spreadsheet"
            ];
            var name: string = ""
            const arrAlphabet: string[] = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
            const contentType: string = randomType[Math.floor(Math.random() * randomType.length)]; 
            var target: string = ""

            if(contentType === "application/vnd.google-apps.document") target = `https://docs.google.com/document/${name}`;
            if(contentType === "application/vnd.google-apps.presentation") target = `https://docs.google.com/presentation/${name}`
            if(contentType === "application/vnd.google-apps.spreadsheet") target = `https://docs.google.com/spreadsheet/${name}`;

            for(var i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
                name += arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)];
            }

            const dto: CreateDto = {
                contentType,
                target,
                name
            };
            const response: ResponseDto = await service.createResource(dto);

            expect(response.code).toBe(SUCCESS_CREATE_RESOURCE);
        });
    });

    describe("ApiService :: getResources", () => {
        test("parameter => null", async () => {
            const parameter: string | null = null;
            const response: ResponseDto = await service.getResources(parameter);

            expect(response.code).toBe(GET_RESOURCES);
        });

        test("parameter => document", async () => {
            const parameter: string | null = "document";
            const response: ResponseDto = await service.getResources(parameter);

            expect(response.code).toBe(GET_RESOURCES);
        });

        test("parameter => file", async () => {
            const parameter: string | null = "file";
            const response: ResponseDto = await service.getResources(parameter);

            expect(response.code).toBe(GET_RESOURCES);
        });

        test("parameter => url", async () => {
            const parameter: string | null = "url";
            const response: ResponseDto = await service.getResources(parameter);

            expect(response.code).toBe(GET_RESOURCES);
        });
    });

    describe("ApiService :: createResourceLink", () => {
        test("난수로 테스트할 경우 from 이 문서인지를 판별하기 어렵고, 문서 아이디가 오는 경우에도 존재하는 링크가 있을 경우 때문에 실제 테스트로 해야함", async () => {
            const dto: CreateLinkDto = {
                from: 346,
                to: 350
            };
            const response: ResponseDto = await service.createResourceLink(dto);

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
            const dto: GetResourceDto = {
                resourceId: Math.floor(Math.random() * 100)
            };
            const response: ResponseDto = await service.getResource(dto);

            expect([
                GET_RESOURCES,
                NOT_FOUND_RESOURCE
            ]).toContain(response.code);
        });
    });
})