import { User } from './server/models/user.schema'
import mongoose from 'mongoose'

async function checkUser() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school-db')
  const user = await User.findOne({ username: 'amin' })
  console.log('User amin:', user)
  process.exit()
}

checkUser()
