const ErrorResponse = require('../util/ErrorResponse');
const mongoose = require('mongoose');

const errorHanlder = (err, req, res, next) => {

    let error = { ...err };
    error.message = err.message;

    if (error.kind === "ObjectId") {
        const message = `No User is found for the id  ${err.value}`;
        error = new ErrorResponse(message, 404);

    }


    if (err instanceof mongoose.Error) {

        const message = mongooseError(err.name, error)

        error = new ErrorResponse(message, 400);

    }

    return res.status(error.statusCode || 500).json({ message: [{ error: error.message || 'Server Error ' }] });

}


const mongooseError = (errorClass, error) => {


    switch (errorClass) {

        case "ValidationError":
            const message = {
                message: error._message,
                details: error.message
            }

            return message;
        case "CastError":
            return;
    }



}






module.exports = errorHanlder;