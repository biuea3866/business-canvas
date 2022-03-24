import { ResponseDto } from "../constants/response.dto";
import { DOC_TYPE, FILE_TYPE, INTERNAL_SERVER_ERROR, IS_EXIST_LINK, IS_EXIST_RESOURCE, IS_NOT_DOCUMENT, MISSING_REQUIRED_INFORMATION, SUCCESS_CREATE_DOC_RESOURCE, SUCCESS_CREATE_FILE_RESOURCE, SUCCESS_CREATE_RESOURCE, SUCCESS_CREATE_URL_RESOURCE, URL_TYPE } from "../constants/result.code";
import { CreateDto } from "../dto/create.dto";
import { CreateLinkDto } from "../dto/create.link.dto";
import { GetResourceDto } from "../dto/get.resource.dto";
import { ApiRepository } from "../repository/api.repository";
import { ResourceUtil } from "../util/resource.util";

class ApiService {
    private resourceUtil: ResourceUtil;
    private apiRepository: ApiRepository;

    constructor() {
        this.resourceUtil = new ResourceUtil();
        this.apiRepository = new ApiRepository();
    }

    public async createResource(createDto: CreateDto): Promise<ResponseDto> {
        const { 
            contentType,
            target,
            name
        } = createDto;

        if([contentType, target, name].includes(null)) {
            return {
                code: MISSING_REQUIRED_INFORMATION,
                message: "Missing Required Information",
                payload: null
            };
        }

        try {
            var PARAM: any = [name]
            const isExistResource: ResponseDto = await(await this.apiRepository.isExistResource(PARAM));

            if(isExistResource.code === IS_EXIST_RESOURCE) {
                return isExistResource;
            }

            const resourceType: number = this.resourceUtil.checkType(contentType);

            if(resourceType === FILE_TYPE) {
                var PARAMS: any = [
                    name,
                    "file",
                    0
                ];

                const fileResponse: ResponseDto = await this.apiRepository.createResource(PARAMS);
                
                if(fileResponse.code !== SUCCESS_CREATE_RESOURCE) {
                    return fileResponse;
                }

                PARAMS = [
                    this.resourceUtil.makeFilePath(contentType),
                    contentType,
                    Math.floor(Math.random() * 101),
                    fileResponse.payload.resource_id,
                    0
                ];

                const fileMetaResponse: ResponseDto = await this.apiRepository.createFileMetaResource(PARAMS);

                if(fileMetaResponse.code !== SUCCESS_CREATE_FILE_RESOURCE) {
                    return fileResponse;
                }

                return fileResponse;
            }

            if(resourceType === DOC_TYPE) {
                var PARAMS: any = [
                    name,
                    "document",
                    0
                ];

                const docResponse: ResponseDto = await this.apiRepository.createResource(PARAMS);

                if(docResponse.code !== SUCCESS_CREATE_RESOURCE) {
                    return docResponse;
                }

                PARAMS = [
                    this.resourceUtil.makeDocType(contentType),
                    this.resourceUtil.makeRandomString(),
                    this.resourceUtil.makeRandomString(),
                    docResponse.payload.resource_id,
                    0
                ];

                const docMetaResponse: ResponseDto = await this.apiRepository.createDocMetaResource(PARAMS);
                
                if(docMetaResponse.code !== SUCCESS_CREATE_DOC_RESOURCE) {
                    return docMetaResponse;
                }

                return docResponse;
            }

            if(resourceType === URL_TYPE) {
                var PARAMS: any = [
                    name,
                    "url",
                    0
                ];

                const urlResponse: ResponseDto = await this.apiRepository.createResource(PARAMS);

                if(urlResponse.code !== SUCCESS_CREATE_RESOURCE) {
                    return urlResponse;
                }

                PARAMS = [
                    this.resourceUtil.makeUrlPath(target),
                    0,
                    urlResponse.payload.resource_id
                ];

                const urlMetaResponse: ResponseDto = await this.apiRepository.createUrlMetaResource(PARAMS);

                if(urlMetaResponse.code !== SUCCESS_CREATE_URL_RESOURCE) {
                    return urlMetaResponse;
                }

                return urlResponse;
            }

            return {
                code: INTERNAL_SERVER_ERROR,
                message: "Error",
                payload: null
            };
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        }
    }

    public async getResources(parameter: any): Promise<ResponseDto> {
        try {
            const getAllResponse: ResponseDto = await this.apiRepository.getResources(parameter);
            
            return getAllResponse;
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        }
    }

    public async createResourceLink(createLinkDto: CreateLinkDto): Promise<ResponseDto> {
        const {
            from,
            to
        } = createLinkDto;

        try {
            var PARAMS: any = [to];
            const isDocResponse: ResponseDto = await this.apiRepository.isDoc(PARAMS);

            if(isDocResponse.code === IS_NOT_DOCUMENT) {
                return isDocResponse;
            }

            PARAMS = [from];
            const isExistLink: ResponseDto = await this.apiRepository.isExistLink(PARAMS);

            if(isExistLink.code === IS_EXIST_LINK) {
                return isExistLink;
            }

            PARAMS = [from, 
                      to];
            const createLinkResponse: ResponseDto = await this.apiRepository.createResourceLink(PARAMS);

            return createLinkResponse;
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        }
    }

    public async getResource(getResourceDto: GetResourceDto): Promise<ResponseDto> {
        const { resourceId } = getResourceDto;

        try {
            const PARAMS: any = [resourceId];
            const getResource: ResponseDto = await this.apiRepository.getResource(PARAMS);

            return { ...getResource };
        } catch(e) {
            return {
                code: INTERNAL_SERVER_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        }
    }
}

export { ApiService };