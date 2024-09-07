const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cert_authentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());

// Define a schema and model for certificates
const certificateSchema = new mongoose.Schema({
  name: String,
  course: String,
  email: String,
  ipfsHash: String, // This field can be used if you want to keep IPFS integration as an option
});

const Certificate = mongoose.model('Certificate', certificateSchema);

// Routes
app.post('/api/certificates', async (req, res) => {
  try {
    const { name, course, email, ipfsHash } = req.body;
    const newCertificate = new Certificate({ name, course, email, ipfsHash });
    await newCertificate.save();
    // Send the certificate ID and other details in the response
    res.status(201).send({ _id: newCertificate._id, message: 'Certificate created successfully', data: newCertificate });
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).send({ message: 'Error creating certificate' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
