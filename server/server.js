const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apiRouter = require('./routes');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));