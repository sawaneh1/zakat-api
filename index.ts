import express, { Express } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { mainError } from './Middleware/error/handler';
import NotFoundError from './Middleware/error/notfound';
import { authorization } from './Middleware/auth';

import userRoute from './Route/user';
import authRoute from './Route/auth';
import permissionRoute from './Route/permissions';
import roleRoute from './Route/role';
import zakatRoute from './Route/zakat';
import categoryRoute from './Route/categories'; 
import donationRoute from './Route/donations'; 
import nisabRoute from './Route/nisab'; 
import mosqueRoute from './Route/masjids'
import helpRequestRoute from './Route/request'; 
import activityRoute from './Route/activties'; 

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:',
});

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'keyboard cat',
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRoute);

app.use(authorization);

app.use('/api/users', userRoute);
app.use('/api/permissions', permissionRoute);
app.use('/api/roles', roleRoute);

// Add the new routes
app.use('/api/zakats', zakatRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/donations', donationRoute);
app.use('/api/nisabs', nisabRoute);
app.use('/api/masjids', mosqueRoute);
app.use('/api/help-requests', helpRequestRoute);
app.use('/api/activities', activityRoute);

app.use(mainError);
app.use(NotFoundError);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
