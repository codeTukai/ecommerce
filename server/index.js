import dotenv from 'dotenv';
dotenv.config(); // Load env variables

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import connectDB from './config/connectDB.js'; // ✅ DB connection
import userRouter from './route/user.route.js'; // ✅ User routes
import categoryRouter from './route/category.route.js'; // ✅ Category routes
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import myListRouter from './route/myList.route.js';
import homeSliderRouter from './route/homeSlider.route.js';




const app = express();

// ✅ Allow frontend (React) to access API with cookies/tokens


app.use(cors({
  origin: "http://localhost:5173", // ✅ your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // ✅ needed if using cookies or Authorization header
}));


// ✅ Security headers (disable CSP if needed)
app.use(helmet({
  contentSecurityPolicy: false,
}));

// ✅ Parse cookies & JSON
app.use(cookieParser());
app.use(express.json());

// ✅ Logger
app.use(morgan('dev'));

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.send("API is working ✅");
});

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/myList',myListRouter);
app.use('/api/homeSlides',homeSliderRouter);

// ✅ Connect DB and start server
import CategoryModel from './models/category.model.js'; // Adjust path if needed


const PORT = process.env.PORT || 8000;
connectDB()
  .then(async () => {
    console.log("✅ MongoDB connected");

    // 🔄 One-time index sync (important after schema change)
    await CategoryModel.syncIndexes();
    console.log("✅ Category indexes synced");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
  });

