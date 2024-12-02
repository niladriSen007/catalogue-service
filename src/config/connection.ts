import mongoose from 'mongoose';
import { Config } from '.';

export const initializeDatabase = async () => {
    try {
        await mongoose.connect(Config.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to database');
    }
};
