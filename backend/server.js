import express from "express";
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

import path from "path"
import { fileURLToPath } from "url";
import itemRouter from "./routes/itemRoute.js";
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middlewares
app.use(cors({
    origin:(origin,callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174'
        ];
        if(process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);
        if(process.env.ADMIN_URL) allowedOrigins.push(process.env.ADMIN_URL);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true
})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// Routes
app.use('/api/user',userRouter)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/api/items',itemRouter)
app.use('/api/cart',cartRouter)
app.use('/api/orders',orderRouter)

app.get("/", (req, res) => {
    res.send("API WORKING");
});

if (!process.env.VERCEL) {
    app.listen(port,()=>{
        console.log(`Server started on http://localhost:${port}`);
    })
}

export default app;