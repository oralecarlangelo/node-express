import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));

    app.get(/.*/, (req: Request, res: Response) => res.sendFile(__dirname + '/public/index.html'));
}

const port: string | number = process.env.PORT || 6000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
