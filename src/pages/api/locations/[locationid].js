import { mw } from "@/api/mw";
import { getLocation, updateLocation, deleteLocation } from "@/database/crud";

const handle = mw(async (req, res) => {
  const { locationid } = req.query;

  
  if (req.method === "GET") {
    console.log(locationid);
    console.log("locationId");
    const location = await getLocation(locationid);
    console.log(location);

    res.send(location);

    return;
  }

  
  if (req.method === "PATCH") {
    const { nom, adresse, typeDeLieu } = req.body;

    const location = await updateLocation(locationid, {
      nom,
      adresse,
      typeDeLieu,
    });

    if (!location) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.status(200).send(location);

    return;
  }


  if (req.method === "DELETE") {
    const location = await deleteLocation(locationid);

    if (location) {
      res.status(204).send();

      return;
    }

    return res.status(404).send({ error: "Not found" });
  }

  res.status(404).send({ error: "Not found" });
});

export default handle;
