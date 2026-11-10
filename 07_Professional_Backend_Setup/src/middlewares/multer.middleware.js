import multer from "multer";

const storage = multer.diskStorage({ // diskStorage() method is used to configure how files are stored on disk
    destination: function (req, file, cb) {
      cb(null, "./public/temp") // Tell multer to save files in our public/temp directory, cb = callback
    },
    filename: function (req, file, cb) {
      // In production, we usually append random numbers to the filename to avoid overriding files with the same name.
      // But for this project, keeping the original name is fine since it stays on our server for only a few milliseconds.
      cb(null, file.originalname) 
    }
})
  
export const upload = multer({ 
    storage, 
})