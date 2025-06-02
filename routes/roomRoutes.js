import express from 'express';
import bodyParser from 'body-parser';
import Room from '../models/room.js';

const router = express.Router();

router.use(bodyParser.json());

// Get all rooms
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).send(error);
    }
});

// Get a room by ID
router.get('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        console.error("Error fetching room:", error);
        res.status(500).send(error);
    }
});

// Create a new room
// Create one or multiple rooms
router.post('/rooms', async (req, res) => {
    const rooms = Array.isArray(req.body) ? req.body : [req.body];

    try {
        const insertedRooms = await Room.insertMany(rooms);
        res.status(201).json({ message: 'Rooms successfully created.', rooms: insertedRooms });
    } catch (error) {
        console.error("Error creating rooms:", error);
        res.status(500).json({ message: 'Internal server error while creating rooms.' });
    }
});


// Update a room
router.put('/rooms/:id', async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.json(updatedRoom);
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).send(error);
    }
});

// Delete a room
router.delete('/rooms/:id', async (req, res) => {
    try {
        const result = await Room.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room successfully deleted' });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).send(error);
    }
});

export default router;
