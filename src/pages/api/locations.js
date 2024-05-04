import { mw } from "@/api/mw";
import { readLocations, createLocation } from "@/database/crud";

const handle = mw(async (req, res) => {
  if (req.method === "GET") {
    const locations = await readLocations();

    res.send(locations);

    return;
  }

  if (req.method === "POST") {
    const location = req.body.values;
    console.log(location);

    const newLocation = await createLocation(location);
    console.log(newLocation);

    res.status(201).send(newLocation);

    return;
  }

  res.status(404).send({ error: "Not found" });
});

export default handle;
