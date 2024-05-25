"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + '.jpg';
        console.log("Generated filename: " + filename);
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            console.log('No file uploaded.');
            return res.status(400).send({ message: 'No file uploaded.' });
        }
        console.log("File path: " + req.file.path);
        const fileUrl = `http://localhost:3000/${req.file.path}`;
        res.status(200).send({ url: fileUrl });
    }
    catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=file_route.js.map