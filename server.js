require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const routes = require('./routes');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout", 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false    
    });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected To Database'));

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}/`);
});