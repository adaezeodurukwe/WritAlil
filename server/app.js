import '@babel/polyfill/noConflict';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

// Instantiate express app
const app = express();

// Enable cors
app.use(cors());

// Enable logger
app.use(logger('combined'));

// Parse POST data
app.use(bodyParser.json());

// Set up index route
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Wanna write a little?'
  });
});

app.use('/api/v1', routes);

const port = process.env.PORT;

if (process.env.NODE_ENV !== 'test') app.listen(port);

export default app;
