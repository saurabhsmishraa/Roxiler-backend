// mongoConnect.js
import pkg from 'mongoose';
import dotenv from 'dotenv';

const { connect, connection, disconnect } = pkg;
dotenv.config();
const mongoURI = process.env.MONGO_URI;

const mongoConnect = () => {
    connect(mongoURI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });

    connection.on('connected', () => {
        console.log('Mongoose connected to MongoDB');
    });

    connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });

    connection.on('disconnected', () => {
        console.log('Mongoose disconnected from MongoDB');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
        console.log('SIGINT signal received: closing MongoDB connection');
        await disconnect();
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        console.log('SIGTERM signal received: closing MongoDB connection');
        await disconnect();
        process.exit(0);
    });
};

// Function to close the MongoDB connection
const mongoDisconnect = async () => {
    try {
        await disconnect();
        console.log('MongoDB connection closed successfully');
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
    }
};

export { mongoConnect, mongoDisconnect };
