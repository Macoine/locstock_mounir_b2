import mongoose from "mongoose";

export const mw = (handle) => async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017"
    );

    await handle(req, res);
  } finally {
    await mongoose.disconnect();
  }
};
