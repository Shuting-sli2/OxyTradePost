import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, 
    // by setting timestamp to true, it adds two more attributes
    // created time + updated time
  }
);
const User = mongoose.model('User', userSchema);
export default User;