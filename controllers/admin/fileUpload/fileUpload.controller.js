const createError = require('http-errors');


exports.fileUpload = async (req, res, next) => {
    try {
        console.log('hit admin upload file');

        const filePath = `${req.file.destination}/${req.file.filename}`;
        if (!filePath) return next(createError(400, 'Please provide the file'));

        return res.status(200).json({
            filePath
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errorName: error.name,
            message: error.message
        })
    }
}
