const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {connection} = require("./db")

dotenv.config();



const authRoutes = require('./routes/authRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/calendar', calendarRoutes);



const PORT = process.env.PORT || 8080

app.listen(PORT, async() => {
        try {
          await connection
          console.log("Connected to db")
            console.log(`Server running on ${PORT}`);
            
        } catch (err) {
            console.log(err)
        }
    });
    