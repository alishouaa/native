import express from 'express';
import morgan from 'morgan';
import router from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import exprssValidator  from 'express-Validator'

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(exprssValidator ());

app.use('/', router)

app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

export default app;