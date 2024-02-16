const mng = require('mongoose')

function connectToMongoDB() {
    const mongoDBUrl = "mongodb://localhost:28015";
    
    mng.connect(mongoDBUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, error => {
        if (!error) {
            console.log('Connected to MongoDB');
        } else {
            console.log('Error in connecting to MongoDB', error);
        }
    });


    const db = mng.connection;

    db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });

    db.once('open', () => {
        console.log('MongoDb connected!');
    });
}
connectToMongoDB();