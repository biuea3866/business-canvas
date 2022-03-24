interface IFileMetadata {
    path: string,
    mimeType: string,
    size: string
};

interface IFile {
    resource_id: number,
    name: string,
    metadata?: IFileMetadata,
    file: string
};

export { 
    IFile,
    IFileMetadata
};