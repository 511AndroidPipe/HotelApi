import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  role:{
    type: [String], // Ejemplo: ['cliente', 'admin']
    default: ['client']
  },
  password:{
    type: String,
    required: true
  }

})

const User = mongoose.model('User', userSchema, 'users');
export default User;