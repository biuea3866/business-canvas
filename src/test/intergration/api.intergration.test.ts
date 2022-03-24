import { app } from '../../app';
import request from 'supertest';
import { CreateDto } from '../../dto/create.dto';
import { BAD_GATEWAY, CREATED, GET_RESOURCES, OK } from '../../constants/result.code';
import { ApiService } from '../../service/api.service';
import { CreateLinkDto } from '../../dto/create.link.dto';
import { GetResourceDto } from '../../dto/get.resource.dto';
import { ResponseDto } from '../../dto/response.dto';

describe("Api Routing Test", () => {
    const service = new ApiService();

    beforeAll(done => {
        app.listen(done);
    });

    describe("http://localhost:3000/resources [POST] testing", () => {
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

            return request(app).post("/resources")
                               .send(dto)
                               .then(response => {
                                   expect(CREATED).toBe(response.status);
                               });
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

            return request(app).post("/resources")
                               .send(dto)
                               .then(response => {
                                   expect(response.status).toBe(CREATED);
                               });
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

            return request(app).post("/resources")
                               .send(dto)
                               .then(response => {
                                   expect(response.status).toBe(CREATED);
                               });
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

            return request(app).post("/resources")
                               .send(dto)
                               .then(response => {
                                   expect(response.status).toBe(CREATED);
                               });
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

            return request(app).post("/resources")
                               .send(dto)
                               .then(response => {
                                   expect(response.status).toBe(CREATED);
                               });
        });

        test("중복 데이터", async () => {
            const dto: CreateDto = {
                contentType: "plain/text",
                target: "https://naver.com/news/123",
                name: "네이버"
            };

            return request(app).post("/resources")
                               .send(dto)
                               .then(response => {
                                   expect(response.status).toBe(BAD_GATEWAY);
                               });
        });
    });

    describe("http://localhost:3000/resources [GET] testing", () => {
        test("parameter => null", async () => {
            return request(app).get(`/resources`)
                               .then(response => {
                                   expect(response.status).toBe(OK);
                               });
        });

        test("parameter => document", async () => {
            const parameter: string | null = "document";

            return request(app).get(`/resources?type=${parameter}`)
                               .then(response => {
                                   expect(response.status).toBe(OK);
                               });
        });

        test("parameter => file", async () => {
            const parameter: string | null = "file";

            return request(app).get(`/resources?type=${parameter}`)
                               .then(response => {
                                   expect(response.status).toBe(OK);
                               });
        });

        test("parameter => url", async () => {
            const parameter: string | null = "url";

            return request(app).get(`/resources?type=${parameter}`)
                               .then(response => {
                                   expect(response.status).toBe(OK);
                               });
        });
    });

    describe("http://localhost:3000/resources/link [POST] testing", () => {
        test("난수로 테스트할 경우 from 이 문서인지를 판별하기 어렵고, 문서 아이디가 오는 경우에도 존재하는 링크가 있을 경우 때문에 실제 테스트로 해야함", () => {
            const dto: CreateLinkDto = {
                from: 350,
                to: 346
            };

            return request(app).post("/resources/link")
                               .send(dto)
                               .then(response => {
                                   expect([
                                       CREATED, 
                                       BAD_GATEWAY
                                   ]).toContain(response.status);
                               });
        });
    });

    describe("http://localhost:3000/resources/:id [GET] testing", () => {
        test("난수로 테스트할 경우 존재하는 아이디 혹은 존재하지 않은 아이디로 테스트를 진행하기 때문에 실제 테스트 필요", async () => {
            const dto: GetResourceDto = {
                resourceId: Math.floor(Math.random() * 100)
            };
            
            return request(app).get(`/resources/${dto.resourceId}`)
                               .then(response => {
                                   expect([
                                       CREATED, 
                                       BAD_GATEWAY
                                   ]).toContain(response.status);
                               });
        });
    });
});