import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    datetimeArrive:{
        type: Date,
        required: true
    },
    datetimeDeparture:{
        type: Date,
        required: true
    },
    idRoom:{
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    idUser:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    idServices: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }]
})

const Reservation = mongoose.model('Reservation', userSchema, 'reservations');
export default Reservation;