import express from 'express';
import { ResponseDto } from '../constants/response.dto';
import { BAD_GATEWAY, CREATED, DATABASE_ERROR, FAILED_TO_GET_RESOURCES, INTERNAL_SERVER_ERROR, IS_DOCUMENT, IS_EXIST_LINK, IS_EXIST_RESOURCE, NOT_FOUND_RESOURCE, OK } from '../constants/result.code';
import { CreateDto } from '../dto/create.dto';
import { CreateLinkDto } from '../dto/create.link.dto';
import { GetResourceDto } from '../dto/get.resource.dto';
import { ApiService } from '../service/api.service';

class ApiController {
    private apiService: ApiService;

    constructor() {
        this.apiService = new ApiService();
    }

    public async createResource(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const createDto: CreateDto = request.body;
            const createResponse: ResponseDto = await this.apiService.createResource(createDto);

            if(createResponse.code === INTERNAL_SERVER_ERROR || createResponse.code === DATABASE_ERROR) {
                return response.status(INTERNAL_SERVER_ERROR)
                               .json(createResponse.message);
            }

            if((createResponse.code === IS_EXIST_RESOURCE)) {
                return response.status(BAD_GATEWAY)
                               .json(createResponse.message);
            }
            
            return response.status(CREATED)
                           .json(createResponse.payload);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }

    public async getResources(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const parameter: any = request.query.type;
            const getAllResponse: ResponseDto = await this.apiService.getResources(parameter);

            if(
                (getAllResponse.code === FAILED_TO_GET_RESOURCES) || 
                (getAllResponse.code === DATABASE_ERROR)
            ) {
                return response.status(BAD_GATEWAY)
                               .json(getAllResponse.message);
            }

            return response.status(OK)
                           .json(getAllResponse.payload);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }

    public async createResourceLink(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const createLinkDto: CreateLinkDto = request.body;
            const createLinkResponse: ResponseDto = await this.apiService.createResourceLink(createLinkDto);

            if(createLinkResponse.code === INTERNAL_SERVER_ERROR || createLinkResponse.code === DATABASE_ERROR) {
                return response.status(INTERNAL_SERVER_ERROR)
                               .json(createLinkResponse.message);
            }

            if(createLinkResponse.code === IS_DOCUMENT || createLinkResponse.code === IS_EXIST_LINK) {
                return response.status(BAD_GATEWAY)
                               .json(createLinkResponse.message);
            }

            return response.status(CREATED)
                           .json(createLinkResponse.message);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }

    public async getResource(
        request: express.Request,
        response: express.Response
    ): Promise<express.Response> {
        try {
            const getResourceDto: GetResourceDto = { resourceId: parseInt(request.params.id) };
            const getResourceResponse: ResponseDto = await this.apiService.getResource(getResourceDto);

            if(getResourceResponse.code === NOT_FOUND_RESOURCE) {
                return response.status(BAD_GATEWAY)
                               .json(getResourceResponse.message);
            }

            if(getResourceResponse.code === INTERNAL_SERVER_ERROR || getResourceResponse.code === DATABASE_ERROR) {
                return response.status(INTERNAL_SERVER_ERROR)
                               .json(getResourceResponse.message);
            }

            return response.status(OK)
                           .json(getResourceResponse.payload);
        } catch(e) {
            return response.status(INTERNAL_SERVER_ERROR)
                           .json(e);
        }
    }
}

export { ApiController };