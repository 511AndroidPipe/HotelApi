import mongoose from 'mongoose';
const { Schema } = mongoose;

const roomSchema = new Schema({
  type:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true,
    enum: ['available', 'occupied', 'maintenance']
  },
  price:{
    type: Number,
    required: true
  }
})

const Room = mongoose.model('Room', roomSchema, 'rooms');
export default Room;