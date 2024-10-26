"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(__dirname, '../../../assets/images/full');
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(new Error('Only JPEG files are allowed!'));
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter
});
const uploadRouter = express_1.default.Router();
uploadRouter.post('/', upload.single('image'), (req, res) => {
    res.status(200).send('Image uploaded successfully.');
});
exports.default = uploadRouter;
