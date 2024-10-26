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
const express_1 = __importDefault(require("express"));
const fileHandler_1 = __importDefault(require("../../fileHandler"));
const validateQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (!query.width && !query.height)
        return null;
    const width = parseInt(query.width || '');
    if (Number.isNaN(width) || width < 1) {
        return "Please provide a positive numerical value for the 'width' query parameter.";
    }
    const height = parseInt(query.height || '');
    if (Number.isNaN(height) || height < 1) {
        return "Please provide a positive numerical value for the 'height' query parameter.";
    }
    return null;
});
const imagesRouter = express_1.default.Router();
imagesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationError = yield validateQuery(req.query);
    if (validationError) {
        res.status(200).send(validationError);
        return;
    }
    let error = null;
    if (!(yield fileHandler_1.default.isThumbAvailable(req.query))) {
        error = yield fileHandler_1.default.createThumb(req.query);
    }
    if (error) {
        res.status(200).send(error);
        return;
    }
    const imagePath = yield fileHandler_1.default.getImagePath(req.query);
    if (imagePath) {
        res.sendFile(imagePath);
    }
    else {
        res.status(200).send('An error occurred while processing your request.');
    }
}));
imagesRouter.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageNames = yield fileHandler_1.default.getAvailableImageNames();
        res.json(imageNames);
    }
    catch (error) {
        res.status(200).send('An error occurred while fetching the image list.');
    }
}));
exports.default = imagesRouter;
