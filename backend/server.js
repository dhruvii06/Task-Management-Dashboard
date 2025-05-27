const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//MIDDLEWARE
app.use(cors()); // Enable CORS (must be before routes)
app.use(express.json()); // Parse JSON request bodies

//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

//ROUTES
app.use('/api/tasks', require('./routes/taskRoutes')); // <-- ADD THIS HERE

//START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
