import { loadEnv } from "vite";
import { MongoClient } from "mongodb";

const env = loadEnv("development", process.cwd(), 'NODE');

export async function con() {
    try {
        const uri = `mongodb+srv://${env.NODE_ATLAS_USER}:${env.NODE_ATLAS_PASSWORD}@cluster0.ayssvt3.mongodb.net/${env.NODE_ATLAS_DB}`;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        const client = await MongoClient.connect(uri, options);
        return client.db();
    } catch (error) {
        return {status: 500, message: error};
    }
}