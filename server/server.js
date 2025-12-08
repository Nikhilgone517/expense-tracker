import express from 'express';
import nodemon from 'nodemon';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5004;
const MONGO_URI = process.env.MONGO_URI ;
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



// sample get route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
 
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});