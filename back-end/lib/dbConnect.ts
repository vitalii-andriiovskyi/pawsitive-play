import CONFIG from "@/config/config";
import mongoose from "mongoose";

const MONGODB_URI = CONFIG.db.mongodbUri;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = { conn: null, promise: null };

async function dbConnect() {

  if (cached?.conn) {
    return cached?.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log("Db connected");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached?.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached?.conn;
}

export default dbConnect;
