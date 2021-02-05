const ErrorResponse = require('../util/ErrorResponse');

const errorHanlder = (err, req, res, next) => {

    let error = { ...err };
    error.message = err.message;



    res.status(error.statusCode || 500).json({ message: [{ error: error.message || 'Server Error ' }] });

}



module.exports = errorHanlder;