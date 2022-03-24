import { DOC_TYPE, FILE_TYPE, URL_TYPE } from "../constants/result.code";

class ResourceUtil {
    public checkType(contentType: string): number {
        const fileTypes = [
            "application/pdf",
            "application/octet-stream",
            "image/png",
            "video/mp4"
        ];
        const documentTypes = [
            "application/vnd.google-apps.document",
            "application/vnd.google-apps.presentation",
            "application/vnd.google-apps.spreadsheet"
        ];

        if(fileTypes.includes(contentType)) {
            return FILE_TYPE;
        } else if(documentTypes.includes(contentType)) {
            return DOC_TYPE;
        } else {
            return URL_TYPE;
        }
    }

    public makeFilePath(fileType: string): string {
        return `foo/boo/${this.makeRandomString()}.${fileType.split("/")[1]}`;
    }

    public makeDocType(documentType: string): string {
        const docType: string = documentType.split("/")[1].split(".")[2];

        if(docType === "document") { 
            return "doc";
        } else if(docType === "presentation") {
            return "presentation";
        } else if(docType === "spreadsheet") {
            return "sheet";
        }
    }

    public makeUrlPath(target: string): string {
        if(target.split("").includes('%')) {
            return decodeURIComponent(target);
        }

        if(target.split(".").includes("youtube")) {
            return `https://youtu.be/embed/${target.split("?")[1].substring(2)}`;
        }

        if(target.substring(0, 3) === "www") {
            return `https://${target}`
        }

        if(target.split("//")[0] === "http") {
            return `https://${target.split("//")[1]}`;
        }

        return target;
    }

    public makeRandomString(): string {
        return Math.random().toString(36).substring(2, 11);
    }
}

export { ResourceUtil };