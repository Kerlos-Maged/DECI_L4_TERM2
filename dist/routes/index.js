"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./api/images"));
const upload_1 = __importDefault(require("./api/upload"));
const router = express_1.default.Router();
router.use('/api/images', images_1.default);
router.use('/api/upload', upload_1.default);
router.get('/', (req, res) => {
    res.send(`
    <h2>Welcome to this app</h2>
    <p>Listening at <code><a href="/api/images">/api/images</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p>
    <p>Examples:
      <ul>
        <li><a href="/api/images?filename=fjord">/api/images?filename=fjord</a></li>
        <li><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a></li>
      </ul>
    </p>
  `);
});
exports.default = router;
