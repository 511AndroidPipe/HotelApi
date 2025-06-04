import express from 'express';
import bodyParser from 'body-parser';
import Service from '../models/service.js';

const router = express.Router();

router.use(bodyParser.json());

// Get all services
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).send(error);
    }
});

// Get a service by ID
router.get('/services/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).send(error);
    }
});

// ...existing code...

// Crear un nuevo servicio
router.post('/services', async (req, res) => {
    const { img, name, price, description } = req.body;

    try {
        const newService = new Service({ img, name, price, description });
        await newService.save();
        res.status(201).json({ message: 'Service successfully created.', service: newService });
    } catch (error) {
        console.error("Error creating service:", error);
        res.status(500).json({ message: 'Internal server error while creating service.' });
    }
});

// ...existing code...

// Actualizar un servicio
router.put('/services/:id', async (req, res) => {
    try {
        const { img, name, price, description } = req.body;
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            { img, name, price, description },
            { new: true, runValidators: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(updatedService);
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).send(error);
    }
});

// ...existing code...

// // Delete a service
// router.delete('/services/:id', async (req, res) => {
//     try {
//         const result = await Service.deleteOne({ _id: req.params.id });
//         if (result.deletedCount === 0) {
//             return res.status(404).json({ message: 'Service not found' });
//         }
//         res.json({ message: 'Service successfully deleted' });
//     } catch (error) {
//         console.error("Error deleting service:", error);
//         res.status(500).send(error);
//     }
// });

export default router;
