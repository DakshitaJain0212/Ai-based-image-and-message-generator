import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import ChatGpt from "./routes/ChatGpt.js";


dotenv.config();

const app = express();
app.use(cors());

// Enable JSON parsing middleware with a 50MB limit of request body size
app.use(express.json({limit: '50mb'}));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/chatResponse', ChatGpt);


app.get('/', async (req,res) => {
    res.send('Hello from Dall E !')
})

const startServer = async() => {

    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(process.env.PORT, () =>{
            console.log('Server has started on port');
        })
    }
    catch(err){
        console.log(err);
    }
}

startServer();