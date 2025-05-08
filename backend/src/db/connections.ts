import { connect , disconnect } from 'mongoose'; 

async function connectDB() {
    try {
        await connect(process.env.MONGODB_URL)
    }   
        catch (error) {
        console.log(error);
        throw new Error('Error connecting to database');
    }
}
async function disconnectDB() {
    try {
        await disconnect()
    }   
        catch (error) {
        console.log(error);
        throw new Error('Error disconnecting from database');
    }
}
export { connectDB, disconnectDB };