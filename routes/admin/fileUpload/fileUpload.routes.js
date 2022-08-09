const express = require('express');
const router = express.Router();

const createError = require('http-errors')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/audios')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]);
    }
  })
  
  const upload = multer({ storage: storage,
    fileFilter: function (req, file, callback) {
        console.log(file);
        const ext = file.mimetype.split('/')[0]
        if(ext !== 'audio') {
            return callback(createError(400,'Only audios are allowed'))
        }
        callback(null, true)
    }
})

const { adminAuthMiddleware } = require('../../../middlewares/jwt');

const {fileUpload} = require('../../../controllers/admin/fileUpload/fileUpload.controller')

router.route('/admin/file-upload').post(adminAuthMiddleware,upload.single('audio'),fileUpload)

module.exports = router;
