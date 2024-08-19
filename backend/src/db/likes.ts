import mongoose from "mongoose";

const LikesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true, default: 0 },
});

export const LikesModel = mongoose.model("Likes", LikesSchema);

export const connectToMongoDb = async (connectionString: string) => {
  try {
    const connection = await mongoose.connect(connectionString);
    console.log(
      `Connected to MongoDB database: ${connection.connection.host}:${connection.connection.port}`
    );
  } catch (e) {
    console.log("Error connection to MongoDB", e);
  }
};

export const getLikes = () => LikesModel.find();
export const updateLikesCount = () => LikesModel.updateOne({ name: "counter" }, { $inc: { value: 1 } });
