import "reflect-metadata";
import * as express from "express";

import "./database";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export default app;
