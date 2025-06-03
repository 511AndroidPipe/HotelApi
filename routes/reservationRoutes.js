import express from 'express';
import bodyParser from 'body-parser';
import Reservation from '../models/reservation.js';

const router = express.Router();
router.use(bodyParser.json());

// Get all reservations
router.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('idRoom')
            .populate('idUser')
            .populate('idServices');
        res.json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get reservation by ID
router.get('/reservations/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('idRoom')
            .populate('idUser')
            .populate('idServices');

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.json(reservation);
    } catch (error) {
        console.error("Error fetching reservation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Crear una nueva reserva
router.post('/reservations', async (req, res) => {
    const { datetimeArrive, datetimeDeparture, idRoom, idUser, idServices } = req.body;

    try {
        const newReservation = new Reservation({
            datetimeArrive,
            datetimeDeparture,
            idRoom,
            idUser,
            idServices
        });

        await newReservation.save();

        res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Actualizar una reserva
router.put('/reservations/:id', async (req, res) => {
    try {
        const { datetimeArrive, datetimeDeparture, idRoom, idUser, idServices } = req.body;

        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { datetimeArrive, datetimeDeparture, idRoom, idUser, idServices },
            { new: true, runValidators: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.json({ message: 'Reservation updated successfully', reservation: updatedReservation });
    } catch (error) {
        console.error("Error updating reservation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a reservation
router.delete('/reservations/:id', async (req, res) => {
    try {
        const result = await Reservation.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
