const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

export const storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        cb(null, uuidv4().toString() + "_" + file.originalname);
    }
});