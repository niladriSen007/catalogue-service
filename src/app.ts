import express from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import categoryRouter from './category/router';
const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);
app.use(express.json());
app.use('/api/v1/category', categoryRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.use(globalErrorHandler);

export default app;
