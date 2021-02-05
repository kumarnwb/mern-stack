const app = require('./app');
const connectDB = require('./repository/db');


//Connect to MongoDB Cluster 
connectDB();


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log('Server started ');
})


