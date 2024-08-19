const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const funcionarioRoutes = require('./routes/funcionario');
app.use('/api', funcionarioRoutes);

const beneficioRoutes = require('./routes/beneficios');
app.use('/api/beneficios', beneficioRoutes);
 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
