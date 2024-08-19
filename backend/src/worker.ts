import { Worker } from "bullmq";
import dotenv from "dotenv";
import { updateLikes } from "./queue";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = parseInt(process.env.REDIS_PORT);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const jobHandlers = {
  updateLikes: updateLikes,
};

const processJob = async (job) => {
  const handler = jobHandlers[job.name];
  if (handler) {
    console.log(`Processing job: ${job.name}`);
    await handler(job);
  }
};

export const setUpWorker = () => {
  const worker = new Worker("likes-queue", processJob, {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    },
  });

  worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`);
  });

  worker.on("failed", (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
  });

  console.log("Worker started");
};

// export const worker = new Worker("likes-queue", processJob, {
//   connection: {
//     host: REDIS_HOST,
//     port: REDIS_PORT,
//     password: REDIS_PASSWORD,
//   },
// });

// worker.on("completed", (job) => {
//   console.log(`${job.id} has completed!`);
// });

// worker.on("failed", (job, err) => {
//   console.log(`${job.id} has failed with ${err.message}`);
// });

// console.log("Worker started!");
