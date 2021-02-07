const app = require('./middleware/reqConfig');
const errorHanlder = require('./middleware/error');

app.set('trust proxy', true);

app.get('/', async (req, res) => res.send({ message: 'working' }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profile', require('./routes/profile'));

app.use(errorHanlder);

module.exports = app;
