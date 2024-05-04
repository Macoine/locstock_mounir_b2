import { Button } from "@/components/Button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const labelStyle = "block font-extrabold text-orange-950 italic overline";
const contentStyle = "block font-bold text-teal-900 ";

const location = ({ initialLocation, query }) => {
  const router = useRouter();
  const { nom, adresse, typeDeLieu } = initialLocation;
  const handleDelete = async () => {
    const res = await axios.delete(`/api/locations/${query.locationid}`);
    if (res.status === 204) {
      router.push("/");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="bg-gray-100 p-4 rounded-lg w-[500px]">
        <h2 className={labelStyle}>Nom : </h2>
        <h1 className={contentStyle}>{nom}</h1>
        <p className={labelStyle}>Adresse : </p>
        <p className={contentStyle}>{adresse.rue}</p>
        <p className={contentStyle}>{adresse.ville}</p>
        <p className={contentStyle}>{adresse.codePostal}</p>
        <p className={contentStyle}>{adresse.pays}</p>
        <p className={labelStyle}>Type de lieu : </p>
        <p className={contentStyle}>{typeDeLieu.type}</p>
        {typeDeLieu.type === "Restaurant" && (
          <div>
            <h2 className={labelStyle}>Details : </h2>
            <p className={labelStyle}>Nombre d'étoiles : </p>
            <p className={contentStyle}>{typeDeLieu.details.nombreEtoiles}</p>
            <p className={labelStyle}>Type de restaurant : </p>
            <p className={contentStyle}>{typeDeLieu.details.typeOfRestaurant}</p>
            <p className={labelStyle}>Prix moyen : </p>
            <p className={contentStyle}>{typeDeLieu.details.prixMoyen}</p>
          </div>
        )}
        {typeDeLieu.type === "Musee" && (
          <div>
            <h2 className={labelStyle}>Details</h2>
            <p className={labelStyle}>Courant artistique</p>
            <p className={contentStyle}>{typeDeLieu.details.courantArtistique}</p>
            <p className={labelStyle}>Type d'art</p>
            <p className={contentStyle}>{typeDeLieu.details.typeArt}</p>
            <p className={labelStyle}>Prix</p>
            <p className={contentStyle}>{typeDeLieu.details.price}</p>
          </div>
        )}
        {typeDeLieu.type === "Bar" && (
          <div>
            <h2 className={labelStyle}>Details</h2>
            <p className={labelStyle}>Type de bar</p>
            <p className={contentStyle}>{typeDeLieu.details.typeOfBar}</p>
            <p className={labelStyle}>Prix</p>
            <p className={contentStyle}>{typeDeLieu.details.price}</p>
          </div>
        )}
        {typeDeLieu.type === "Parc" && (
          <div>
            <h2 className={labelStyle}>Details</h2>
            <p className={labelStyle}>Type de parc</p>
            <p className={contentStyle}>{typeDeLieu.details.typeOfParc}</p>
            <p className={labelStyle}>Public ou privé</p>
            <p className={contentStyle}>{typeDeLieu.details.publicOuPrive}</p>
            <p className={labelStyle}>Gratuit ou payant</p>
            <p className={contentStyle}>{typeDeLieu.details.freeOrNot}</p>
            <p className={labelStyle}>Prix</p>
            <p className={contentStyle}>{typeDeLieu.details.price}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-4">
        <Link href={`/locations/${query.locationid}/edit`}>
          <Button variant={"primary"}>Edit</Button>
        </Link>
        <Button variant={"danger"} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </main>
  );
};

export const getServerSideProps = async ({ query }) => {
  const response = await axios.get(
    `http://localhost:3000/api/locations/${query.locationid}`
  );
  const initialLocation = response.data;
  console.log(initialLocation);

  return {
    props: { initialLocation, query },
  };
};

export default location;
