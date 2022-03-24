import { IFile } from './file.interface'
import { IUrl } from './url.interface';

interface IDocMetadata {
    doctype: string,
    creator: string,
    origin: string
};

interface IDocument {
    type: string,
    name: string,
    metadata?: IDocMetadata,
    resource_id: number,
    links?: [IFile | IUrl]
};

export { 
    IDocument,
    IDocMetadata
};