"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceUtil = void 0;
var result_code_1 = require("../constants/result.code");
var ResourceUtil = /** @class */ (function () {
    function ResourceUtil() {
    }
    ResourceUtil.prototype.checkType = function (contentType) {
        var fileTypes = [
            "application/pdf",
            "application/octet-stream",
            "image/png",
            "video/mp4"
        ];
        var documentTypes = [
            "application/vnd.google-apps.document",
            "application/vnd.google-apps.presentation",
            "application/vnd.google-apps.spreadsheet"
        ];
        if (fileTypes.includes(contentType)) {
            return result_code_1.FILE_TYPE;
        }
        else if (documentTypes.includes(contentType)) {
            return result_code_1.DOC_TYPE;
        }
        else {
            return result_code_1.URL_TYPE;
        }
    };
    ResourceUtil.prototype.makeFilePath = function (fileType) {
        return "foo/boo/".concat(this.makeRandomString(), ".").concat(fileType.split("/")[1]);
    };
    ResourceUtil.prototype.makeDocType = function (documentType) {
        var docType = documentType.split("/")[1].split(".")[2];
        if (docType === "document") {
            return "doc";
        }
        else if (docType === "presentation") {
            return "presentation";
        }
        else if (docType === "spreadsheet") {
            return "sheet";
        }
    };
    ResourceUtil.prototype.makeUrlPath = function (target) {
        if (target.split("").includes('%')) {
            return decodeURIComponent(target);
        }
        if (target.split(".").includes("youtube")) {
            return "https://youtu.be/embed/".concat(target.split("?")[1].substring(2));
        }
        if (target.substring(0, 3) === "www") {
            return "https://".concat(target);
        }
        if (target.split("//")[0] === "http") {
            return "https://".concat(target.split("//")[1]);
        }
        return target;
    };
    ResourceUtil.prototype.makeRandomString = function () {
        return Math.random().toString(36).substring(2, 11);
    };
    return ResourceUtil;
}());
exports.ResourceUtil = ResourceUtil;
//# sourceMappingURL=resource.util.js.map