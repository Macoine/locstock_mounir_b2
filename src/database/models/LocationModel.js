import mongoose from "mongoose"
import { LocationSchema } from "../schemas/LocationSchema"

export const LocationModel =
  mongoose.models.Location || mongoose.model("Location", LocationSchema)
