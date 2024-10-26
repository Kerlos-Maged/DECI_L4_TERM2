"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const imgResizing_1 = __importDefault(require("./imgResizing"));
class FileHandler {
    static getImagePath(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename)
                return null;
            const filee = params.width && params.height
                ? path_1.default.resolve(FileHandler.imagesThumbPath, params.filename + "-" + params.width + "x" + params.height + ".jpg")
                : path_1.default.resolve(FileHandler.imagesFullPath, params.filename + `.jpg`);
            try {
                yield fs_1.promises.access(filee);
                return filee;
            }
            catch (_a) {
                return null;
            }
        });
    }
    static getAvailableImageNames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = yield fs_1.promises.readdir(FileHandler.imagesFullPath);
                return files.map(file => path_1.default.parse(file).name);
            }
            catch (_a) {
                return [];
            }
        });
    }
    static isThumbAvailable(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename || !params.width || !params.height)
                return false;
            const thumbPath = path_1.default.resolve(FileHandler.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`);
            try {
                yield fs_1.promises.access(thumbPath);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static isImageAvailable(filename = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename)
                return false;
            try {
                const files = yield fs_1.promises.readdir(FileHandler.imagesFullPath);
                return files.some(file => path_1.default.parse(file).name === filename);
            }
            catch (_a) {
                return false;
            }
        });
    }
    static createThumbPath() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(FileHandler.imagesThumbPath);
            }
            catch (_a) {
                yield fs_1.promises.mkdir(FileHandler.imagesThumbPath, { recursive: true });
            }
        });
    }
    static createThumb(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.filename || !params.width || !params.height)
                return null;
            const fullImagePath = path_1.default.resolve(FileHandler.imagesFullPath, `${params.filename}.jpg`);
            const thumbImagePath = path_1.default.resolve(FileHandler.imagesThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`);
            try {
                yield (0, imgResizing_1.default)(fullImagePath, thumbImagePath, parseInt(params.width), parseInt(params.height));
                return null;
            }
            catch (error) {
                return error.message;
            }
        });
    }
}
exports.default = FileHandler;
FileHandler.imagesFullPath = path_1.default.resolve(__dirname, '../assets/images/full');
FileHandler.imagesThumbPath = path_1.default.resolve(__dirname, '../assets/images/thumb');
