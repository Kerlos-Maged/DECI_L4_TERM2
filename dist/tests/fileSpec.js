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
const file_1 = __importDefault(require("../file"));
const thumbPath = file_1.default.imagesThumbPath;
describe('Image Processing Tests using Sharp Library', () => {
    it('should raise an error for invalid width value', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield file_1.default.createThumb({
            filename: 'doesntexist',
            width: '-100',
            height: '500'
        });
        expect(error).not.toBeNull();
    }));
    it('should raise an error for non-existent filename', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield file_1.default.createThumb({
            filename: 'nonexistent',
            width: '100',
            height: '500'
        });
        expect(error).not.toBeNull();
    }));
    it('should successfully create resized thumbnail for valid inputs', () => __awaiter(void 0, void 0, void 0, function* () {
        const filename = 'fjord';
        const width = '150';
        const height = '165';
        yield file_1.default.createThumb({
            filename,
            width,
            height
        });
        const resizedImagePath = path_1.default.resolve(thumbPath, `${filename}-${width}x${height}.jpg`);
        let errorFile = null;
        try {
            yield fs_1.promises.access(resizedImagePath);
        }
        catch (_a) {
            errorFile = 'Error: File was not created';
        }
        expect(errorFile).toBeNull();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const filename = 'fjord';
    const width = '150';
    const height = '165';
    const resizedImagePath = path_1.default.resolve(thumbPath, `${filename}-${width}x${height}.jpg`);
    try {
        yield fs_1.promises.unlink(resizedImagePath);
    }
    catch (err) {
        console.error('Cleanup error:', err);
    }
}));
