interface IUrlMetadata {
    path: string
};

interface IUrl {
    resource_id: number,
    name: string,
    metadata?: IUrlMetadata,
    type: string
};

export { 
    IUrl,
    IUrlMetadata
};