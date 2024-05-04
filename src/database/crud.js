import { LocationModel } from "@/database/models/LocationModel";

export const readLocations = async () => await LocationModel.find();

export const createLocation = async (location) => {
  const newLocation = new LocationModel(location);

  await newLocation.save();

  return newLocation;
};

export const getLocation = async (locationId) =>
  await LocationModel.findById(locationId);

export const updateLocation = async (
  locationId,
  { nom, adresse, typeDeLieu }
) => {
  const input = {
    nom,
    adresse,
    typeDeLieu,
  };
  const locationUpdated = await LocationModel.findByIdAndUpdate(
    locationId,
    input,
    {
      returnDocument: "after",
    }
  );

  console.log(locationUpdated);
  return locationUpdated;
};

export const deleteLocation = async (locationId) => {
  const locationDeleted = await LocationModel.findByIdAndDelete(locationId);

  return locationDeleted;
};
