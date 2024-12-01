import app from './app';
import { Config } from './config';
import { logger } from './config/logger';
const { NODE_ENV, PORT } = Config;

const startServer = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on ${NODE_ENV} port ${PORT}`);
        });
    } catch (err) {
        if (err instanceof Error) {
            logger.error('Failed to connect to database:', err);
            logger.on('finish', () => process.exit(1));
        }
    }
};

startServer();
