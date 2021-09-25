import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as cors from 'cors'

import { sequelize } from './instances/sequalize'
import { appRouter } from './routes';
import { errorHandler } from './utils/middlewares';

const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(errorHandler);

sequelize;
appRouter(app);

try {
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`)
    });
} catch (e) {
    console.log(`Error raised : ${e}`);
}