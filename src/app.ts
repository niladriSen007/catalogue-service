import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import categoryRouter from './category/router';
import productRouter from './product/router';
import cookieParser from 'cookie-parser';
const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.use(globalErrorHandler);

export default app;
