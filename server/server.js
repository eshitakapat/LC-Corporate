const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config();

const app = express()

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, 
  { useNewUrlParser: true, useUnifiedTopology: true }  
)

.then(()=> console.log('✅ Connected to MongoDB Atlas!'))
.catch(err => console.log('❌ Connection error:', err));

mongoose.connection.on('connected', () => {
    console.log('📡 Mongoose connected to DB');
});
mongoose.connection.on('error', (err) => {
    console.error('⚠️ Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected');
});

app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB Atlas')
});
app.use('/', urlRoutes);
app.use('/urls', urlRoutes); 

//Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log(`Server running on the port ${PORT}`);
})