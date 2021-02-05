const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');

const cors = require('cors');
const rateLimit = require('express-rate-limit');

const corsWhitlelist = ['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback) {

        if (corsWhitlelist.indexOf(origin) !== -1 || !origin) {
            //Origin is to allow rest tools and server to server communication 
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }

}

const limiter = rateLimit({
    windowMs: 15 * 60 * 60,
    max: 100,
    delayMs: 0
})


app.use(morgan('common'));
app.use(helmet({
    referrerPolicy: false
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use(limiter) //apply to all request 





module.exports = app;