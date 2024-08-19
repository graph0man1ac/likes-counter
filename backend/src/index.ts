import express, { Router } from "express";
import cors from "cors";
import body from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { routes } from "./routes";

import { connectToMongoDb, getLikes } from "./db/likes";
import { createQueue } from "./queue";
import { setUpWorker } from "./worker";

dotenv.config();

async function start() {
  try {
    const API_PORT = process.env.API_PORT || 3000;
    const DB_URL = process.env.DB_URL;

    const app = express();

    app.use(cors());
    app.use(
      body.json({
        limit: "500kb",
      })
    );

    app.use("/", routes);

    app.listen(API_PORT, () => {
      console.log(`Server is running on port on ${API_PORT}`);
    });

    await connectToMongoDb(DB_URL);
    createQueue();
    setUpWorker();
  } catch (e) {
    console.log(e);
  }
}

start();
