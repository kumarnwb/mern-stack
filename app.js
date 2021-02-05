const app = require('./middleware/reqConfig');
const errorHanlder = require('./middleware/error');




//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profile', require('./routes/profile'));


app.use(errorHanlder);

module.exports = app;