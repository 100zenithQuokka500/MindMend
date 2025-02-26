import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim:true, lowercase:true },
  lastname: { type: String, required: true, trim:true, lowercase:true },
  email: { type: String, required: true, unique: true, trim:true, lowercase:true },
  password: { type: String, required: true },
  role: { type: String, required: true , enum:["Provider" , "Patient"] , default:"Patient"},
});
const User = mongoose.model('User', userSchema);

export default User;
