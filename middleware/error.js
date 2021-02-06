const ErrorResponse = require('../util/ErrorResponse');

const errorHanlder = (err, req, res, next) => {

    let error = { ...err };
    error.message = err.message;

    if (error.kind === "ObjectId") {
        const message = `No User is found for the id  ${err.value}`;
        error = new ErrorResponse(message, 404);

    }

    return res.status(error.statusCode || 500).json({ message: [{ error: error.message || 'Server Error ' }] });

}



module.exports = errorHanlder;