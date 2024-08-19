import { Queue } from "bullmq";
import dotenv from "dotenv";
import { updateLikesCount } from "./db/likes";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = parseInt(process.env.REDIS_PORT);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

let queue;

export const updateLikes = async () => {
  await updateLikesCount();
};

export const createQueue = () => {
  queue = new Queue("likes-queue", {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    },
  });
  console.log("Queue created");
};

export async function addJob(job) {
  await queue.add(job.name, job);
}
