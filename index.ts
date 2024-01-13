import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";


import userRoute from './Route/user';
import permissionRoute from './Route/permissions';
import roleRoute from './Route/role';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "keyboard cat",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoute);
app.use('/api/permissions', permissionRoute);
app.use('/api/roles', roleRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
