import { PoolConnection } from "mysql2/promise";
import { ResponseDto } from "../dto/response.dto";
import { CREATE_RESOURCE_LINK, DATABASE_ERROR, FAILED_TO_GET_RESOURCES, FAILURE_CREATE_DOC_RESOURCE, FAILURE_CREATE_FILE_RESOURCE, FAILURE_CREATE_RESOURCE, FAILURE_CREATE_URL_RESOURCE, GET_DOC_RESOURCE, GET_FILE_RESOURCE, GET_RESOURCES, GET_URL_RESOURCE, IS_DOCUMENT, IS_EXIST_LINK, IS_EXIST_RESOURCE, IS_NOT_DOCUMENT, IS_NOT_EXIST_LINK, IS_NOT_EXIST_RESOURCE, NOT_FOUND_RESOURCE, SUCCESS_CREATE_DOC_RESOURCE, SUCCESS_CREATE_FILE_RESOURCE, SUCCESS_CREATE_RESOURCE, SUCCESS_CREATE_URL_RESOURCE } from "../constants/result.code";
import { IDocMetadata, IDocument } from "../interface/document.interface";
import { IFile, IFileMetadata } from "../interface/file.interface";
import { IUrl, IUrlMetadata } from "../interface/url.interface";
import { mysql } from "../model/mysql.connection";

class ApiRepository {
    public async isExistResource(PARAM: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT resource_id " +
                                "FROM resources " +
                                "WHERE name = ?";

            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(
                SQL,
                PARAM
            );

            await connection.commit();

            if(results[0]) {
                return {
                    code: IS_EXIST_RESOURCE,
                    message: "The resource is existed in document's links",
                    payload: null
                };
            }

            return {
                code: IS_NOT_EXIST_RESOURCE,
                message: "This resource can be to adding to links",
                payload: null
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async createResource(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "INSERT INTO " +
                                "resources(name, type, resource_id) " +
                                "VALUES(?, ?, ?)";
            
            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(
                SQL,
                PARAMS
            );

            if(!results.insertId) {
                await connection.rollback();

                return {
                    code: FAILURE_CREATE_RESOURCE,
                    message: "Failed to create file resource",
                    payload: null
                };
            }

            await connection.commit();

            var entity: IFile | IDocument | IUrl;

            if(PARAMS[1] === "document") {
                entity = await (await this.getDocResource(results.insertId)).payload;
            } else if(PARAMS[1] === "file") {
                entity = await (await this.getFileResource(results.insertId)).payload;
            } else if(PARAMS[1] === "url") {
                entity = await (await this.getUrlResource(results.insertId)).payload;
            }

            return {
                code: SUCCESS_CREATE_RESOURCE,
                message: "Create a new resource",
                payload: entity
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async getFileResource(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT * " +
                                "FROM resources " +
                                "WHERE resource_id = ?";

            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(
                SQL,
                PARAMS
            );

            await connection.commit();

            return {
                code: GET_FILE_RESOURCE,
                message: "Get file resource",
                payload: results[0]
            };
        } catch(e) {
            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async createFileMetaResource(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "INSERT INTO " +
                                "file_metadata(path, mime_type, size, resource_id, file_meta_id) " +
                                "VALUES(?, ?, ?, ?, ?)";
            
            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(
                SQL,
                PARAMS
            );

            if(!results.insertId) {
                await connection.rollback();

                return {
                    code: FAILURE_CREATE_FILE_RESOURCE,
                    message: "Failed to create file resource",
                    payload: null
                };
            }

            await connection.commit();

            return {
                code: SUCCESS_CREATE_FILE_RESOURCE,
                message: "Create a new resource",
                payload: results.insertId
            };
        } catch(e) {
            await connection.rollback();
            
            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        } 
    }

    public async getFileMetadataByResourceId(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT * " +
                                "FROM file_metadata " +
                                "WHERE resource_id = ?";

            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(SQL, PARAMS);

            await connection.commit();

            return {
                code: GET_FILE_RESOURCE,
                message: "Get file resource",
                payload: results[0]
            };
        } catch(e) {
            await connection.rollback();
            
            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async getDocResource(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT * " +
                                "FROM resources " +
                                "WHERE resource_id = ?";

            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(
                SQL,
                PARAMS
            );

            await connection.commit();
            
            return {
                code: GET_DOC_RESOURCE,
                message: "Get doc resource",
                payload: results[0]
            };
        } catch(e) {
            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async createDocMetaResource(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "INSERT INTO " +
                                "doc_metadata(type, creator, origin, resource_id, doc_meta_id) " +
                                "VALUES(?, ?, ?, ?, ?)";

            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(
                SQL,
                PARAMS
            );

            if(!results.insertId) {
                await connection.rollback();

                return {
                    code: FAILURE_CREATE_DOC_RESOURCE,
                    message: "Failed to create doc resource",
                    payload: null
                };
            }

            await connection.commit();

            return {
                code: SUCCESS_CREATE_DOC_RESOURCE,
                message: "Create a new resource",
                payload: results.insertId
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async getDocMetadataByResourceId(PARAMS: number[]): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT * " +
                                "FROM doc_metadata " +
                                "WHERE resource_id = ?";
                            
            await connection.beginTransaction();

            const [results]: any = await connection.query(SQL, PARAMS);

            await connection.commit();

            return {
                code: GET_DOC_RESOURCE,
                message: "Get document resource",
                payload: results[0]
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async getDocLinksByResourceId(PARAM: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT * " +
                                "FROM doc_links " +
                                "WHERE resource_id = ?";
            
            await connection.beginTransaction();

            const [linkdata]: any = await connection.query(
                SQL, 
                PARAM
            );
            
            await connection.commit();
            
            const links: (IFile | IUrl)[] = await Promise.all(linkdata.map(async link => {
                var resource: IFile | IUrl = await (await this.getFileResource([link.resource_ids])).payload;
                var metadata: IFileMetadata | IUrlMetadata = await (await this.getFileMetadataByResourceId([link.resource_ids])).payload;

                return {
                    ...resource,
                    metadata
                };
            }));

            return {
                code: GET_DOC_RESOURCE,
                message: "Get doc resource",
                payload: links
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async getUrlResource(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT * " +
                                "FROM resources " +
                                "WHERE resource_id = ?";

            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(
                SQL,
                PARAMS
            );

            await connection.commit();
            
            return {
                code: GET_URL_RESOURCE,
                message: "Get url resource",
                payload: results[0]
            };
        } catch(e) {
            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async createUrlMetaResource(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "INSERT INTO " +
                                "url_metadata(path, url_meta_id, resource_id) " +
                                "VALUES(?, ?, ?)";

            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(
                SQL,
                PARAMS
            );

            if(!results.insertId) {
                await connection.rollback();

                return {
                    code: FAILURE_CREATE_URL_RESOURCE,
                    message: "Failed to create url resource",
                    payload: null
                };
            }

            await connection.commit();

            return {
                code: SUCCESS_CREATE_URL_RESOURCE,
                message: "Create a new resource",
                payload: results.insertId
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async getUrlMetadataByResourceId(PARAMS: number[]): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT * " +
                                "FROM url_metadata " +
                                "WHERE resource_id = ?";

            await connection.beginTransaction();

            const [results]: any = await connection.query(
                SQL, 
                PARAMS
            );

            await connection.commit();

            return {
                code: GET_URL_RESOURCE,
                message: "Get url resource",
                payload: results[0]
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async getResources(parameter: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            if(parameter === null || parameter === undefined) { 
                const SQL: string = "SELECT * " +
                                    "FROM resources";

                await connection.beginTransaction();

                const [results, rows]: any = await connection.query(SQL);

                await connection.commit();

                const returnValue: any = await Promise.all(results.map(async entity => {
                    const PARAM: number[] = [entity.resource_id];
                    var resource: IDocument | IUrl | IFile;
                    var metadata: IDocMetadata | IUrlMetadata | IFileMetadata;
                    var links: (IUrl | IFile)[];

                    if(entity.type === "document") {
                        resource = await (await this.getDocResource(PARAM)).payload;
                        metadata = await (await this.getDocMetadataByResourceId(PARAM)).payload;
                        links = await (await this.getDocLinksByResourceId(PARAM)).payload;
                    }

                    if(entity.type === "file") {
                        resource = await (await this.getFileResource(PARAM)).payload;
                        metadata = await (await this.getFileMetadataByResourceId(PARAM)).payload;
                    }

                    if(entity.type === "url") {
                        resource = await (await this.getUrlResource(PARAM)).payload;
                        metadata = await (await this.getUrlMetadataByResourceId(PARAM)).payload;
                    }

                    return {
                        ...resource,
                        metadata,
                        links
                    };
                }));

                return {
                    code: GET_RESOURCES,
                    message: "Get Resource list",
                    payload: returnValue
                };
            } else if(parameter === "document") {
                const SQL: string = "SELECT * " +
                                    "FROM resources " +
                                    "WHERE type = ?";

                await connection.beginTransaction();

                const [results, rows]: any = await connection.query(SQL, parameter);

                await connection.commit();

                const returnValue: any = await Promise.all(results.map(async entity => {
                    const metadata: IDocMetadata = await (await this.getDocMetadataByResourceId(entity.resource_id)).payload;
                    const links: (IUrl | IFile)[] = await (await this.getDocLinksByResourceId(entity.resource_id)).payload;
                    const response: IDocument = {
                        ...entity,
                        metadata,
                        links
                    };

                    return response;
                }));

                return {
                    code: GET_RESOURCES,
                    message: "Get Doc Resource list",
                    payload: returnValue
                };
            } else if(parameter === "file") {
                const SQL: string = "SELECT * " +
                                    "FROM resources " +
                                    "WHERE type = ?";

                await connection.beginTransaction();

                const [results, rows]: any = await connection.query(
                    SQL, 
                    parameter
                );

                await connection.commit();

                const returnValue: any = await Promise.all(results.map(async entity => {
                    const metadata: IFile = await (await this.getFileMetadataByResourceId(entity.resource_id)).payload;

                    const response: IDocument = {
                        ...entity,
                        metadata
                    };

                    return response;
                }));

                return {
                    code: GET_RESOURCES,
                    message: "Get File Resource list",
                    payload: returnValue
                };
            } else if(parameter === "url") {
                const SQL: string = "SELECT * " +
                                    "FROM resources " +
                                    "WHERE type = ?";

                await connection.beginTransaction();

                const [results, rows]: any = await connection.query(SQL, parameter);

                await connection.commit();

                const returnValue: any = await Promise.all(results.map(async entity => {
                    const metadata: IUrl = await (await this.getUrlMetadataByResourceId(entity.resource_id)).payload;
                    const response: IDocument = {
                        ...entity,
                        metadata
                    };

                    return response;
                }));

                return {
                    code: GET_RESOURCES,
                    message: "Get Url Resource list",
                    payload: returnValue
                };
            }

            return {
                code: FAILED_TO_GET_RESOURCES,
                message: "Wrong parameter",
                payload: null
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async isDoc(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT type " +
                                "FROM resources " +
                                "WHERE resource_id = ?";
            
            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(SQL, PARAMS);

            await connection.commit();

            if(results[0].type !== "document") {
                return {
                    code: IS_NOT_DOCUMENT,
                    message: "Type is not document",
                    payload: null
                };
            }

            return {
                code: IS_DOCUMENT,
                message: "Type is document",
                payload: null
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async isExistLink(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT * " +
                                "FROM doc_links " +
                                "WHERE resource_ids = ?";

            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(
                SQL,
                PARAMS
            );

            await connection.commit();

            if(results[0]) {
                return {
                    code: IS_EXIST_LINK,
                    message: "The link is existed",
                    payload: null
                };
            }

            return {
                code: IS_NOT_EXIST_LINK,
                message: "This link is not exist",
                payload: null
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async createResourceLink(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "INSERT INTO " +
                                "doc_links(resource_ids, resource_id) " +
                                "VALUES(?, ?) ";

            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(SQL, PARAMS);

            await connection.commit();

            return {
                code: CREATE_RESOURCE_LINK,
                message: "Created resource link",
                payload: null
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }

    public async getResource(PARAMS: any): Promise<ResponseDto> {
        const connection: PoolConnection = await mysql.getConnection();

        try {
            const SQL: string = "SELECT * " +
                                "FROM resources " +
                                "WHERE resource_id = ?";
                    
            await connection.beginTransaction();

            const [results, rows]: any = await connection.query(SQL, PARAMS);

            await connection.commit();

            if(!results[0]) {
                return {
                    code: NOT_FOUND_RESOURCE,
                    message: "Not found resource",
                    payload: null
                };
            }

            const returnValue: any = results.map(async entity => {
                const PARAM: string[] = [entity.resource_id];

                if(entity.type === "document") {
                    var subQuery: string = "SELECT * " +
                                           "FROM doc_metadata " +
                                           "WHERE resource_id = ?";
    
                    await connection.beginTransaction();

                    const [metaResult]: any = await connection.query(subQuery, PARAM);

                    await connection.commit();
                    
                    subQuery = "SELECT * " +
                               "FROM doc_links " +
                               "WHERE resource_id = ?";
                    
                    await connection.beginTransaction();

                    const [linkResult]: any = await connection.query(subQuery, PARAM);

                    await connection.commit();

                    const response: IDocument = {
                        ...entity,
                        metadata: metaResult[0],
                        links: linkResult[0]
                    };

                    return response;
                } else if(entity.type === "file") {
                    const subQuery: string = "SELECT * " +
                                             "FROM file_metadata " +
                                             "WHERE resource_id = ?";
    
                    await connection.beginTransaction();

                    const [result]: any = await connection.query(subQuery, PARAM);

                    await connection.commit();
                    
                    const response: IFile = {
                        ...entity,
                        metadata: result[0]
                    };

                    return response;
                } else if(entity.type === "url") {
                    const subQuery: string = "SELECT * " +
                                             "FROM url_metadata " +
                                             "WHERE resource_id = ?";
    
                    await connection.beginTransaction();

                    const [result]: any = await connection.query(subQuery, PARAM);

                    await connection.commit();
                    
                    const response: IUrl = {
                        ...entity,
                        metadata: result[0]
                    };

                    return response;
                }
            });
            
            return {
                code: GET_RESOURCES,
                message: "Get Resource list",
                payload: returnValue
            };
        } catch(e) {
            await connection.rollback();

            return {
                code: DATABASE_ERROR,
                message: JSON.stringify(e),
                payload: null
            };
        } finally {
            connection.release();
        }
    }
}

export { ApiRepository };