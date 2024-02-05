import express from 'express';
import colors from "colors";
import dotenv from 'dotenv';
import morgon from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import cors from 'cors';
//configure env
dotenv.config()

//database config
connectDB();

// rest object 
const app = express();

//rest api
app.get('/',(req,res)=>{
    res.send('<h1>welcome to e-commerce app...</h1>')
})

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgon('dev'))

//routes
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//Port
const PORT = process.env.PORT || 8080 ;

// run listen
app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})