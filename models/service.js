import mongoose from 'mongoose';
const { Schema } = mongoose;

const serviceSchema = new Schema({
  img:{
    type:String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  }

})

const Service = mongoose.model('Service', serviceSchema, 'services');
export default Service;