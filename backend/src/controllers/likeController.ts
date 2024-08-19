import { Request, Response } from "express";
import LikeService from "../services/likeServise";

const getLikes = async (req: Request, res: Response) => {
  LikeService.getLikesCount()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const updateLikes = (req: Request, res: Response) => {
  LikeService.updateLikesCount()
    .then(() => {
      res.status(200).send("ok");
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

export default {
  getLikes: getLikes,
  updateLikes: updateLikes,
};
