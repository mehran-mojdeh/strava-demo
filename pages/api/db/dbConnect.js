import getConfig from 'next/config';
import mongoose from 'mongoose'

const { serverRuntimeConfig } = getConfig();

const MONGODB_URI = process.env.MONGODB_URI || serverRuntimeConfig.connectionString

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}
console.log('connecting to db...');
mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;
console.log('db connected');
