import { LikesModel, getLikes } from "../db/likes";
import { addJob } from "../queue";

const getLikesCount = async () => {
  return new Promise((resolve, reject) => {
    try {
      const data = getLikes();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const updateLikesCount = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await addJob({ name: "updateLikes" });
      resolve("ok");
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  getLikesCount: getLikesCount,
  updateLikesCount: updateLikesCount,
};
