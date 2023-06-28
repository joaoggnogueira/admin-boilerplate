import '../schemas'
import mongoose from 'mongoose';

async function connectDatabase() {
  const dbConnection: string = process.env[process.env.DB_CONNECTION_STRING]
  console.log("[DB] 🔄 CONNECTING TO", dbConnection)
  await mongoose.connect(dbConnection, {})
  console.log("[DB] ✔️  CONNECTED")
}

export default connectDatabase;