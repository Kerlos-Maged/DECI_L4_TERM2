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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const fileHandler_1 = __importDefault(require("../fileHandler"));
const request = (0, supertest_1.default)(index_1.default);
describe('API Endpoint Tests', () => {
    describe('GET /', () => {
        it('should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.status).toBe(200);
        }));
    });
    describe('GET /api/images', () => {
        const basePath = '/api/images';
        it('should return 200 for valid filename', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`${basePath}?filename=fjord`);
            expect(response.status).toBe(200);
        }));
        it('should return 200 for valid filename with width and height', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`${basePath}?filename=fjord&width=195&height=350`);
            expect(response.status).toBe(200);
        }));
        it('should return 200 for invalid width', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`${basePath}?filename=fjord&width=-200&height=6`);
            expect(response.status).toBe(200);
        }));
        it('should return 200 for request without arguments', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(basePath);
            expect(response.status).toBe(200);
        }));
    });
    describe('GET /doesntexist', () => {
        it('should return 404 for non-existing endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/doesntexist');
            expect(response.status).toBe(404);
        }));
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const resizedImagePath = path_1.default.resolve(fileHandler_1.default.imagesThumbPath, 'fjord-195x350.jpg');
    try {
        yield fs_1.promises.unlink(resizedImagePath);
    }
    catch (error) {
        console.error('Error during cleanup:', error);
    }
}));
