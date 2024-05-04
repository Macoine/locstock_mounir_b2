import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { Button } from "@/components/Button";

const labelStyle = "block font-extrabold text-yellow-300 italic overline";
const contentStyle = "block font-light text-white";


const validationSchema = yup.object({
  nom: yup
    .string()
    .min(3, "Le nom doit avoir au moins 3 caractères")
    .required("Le nom est requis"),
  adresse: yup.object({
    rue: yup
      .string()
      .min(3, "La rue doit avoir au moins 3 caractères")
      .required("La rue est requise"),
    codePostal: yup
      .string()
      .min(3, "Le code postal doit avoir au moins 3 caractères")
      .required("Le code postal est requis"),
    ville: yup
      .string()
      .min(3, "La ville doit avoir au moins 3 caractères")
      .required("La ville est requise"),
    pays: yup
      .string()
      .min(3, "Le pays doit avoir au moins 3 caractères")
      .required("Le pays est requis"),
  }),
  typeDeLieu: yup.object({
    type: yup
      .string()
      .min(3, "Le type de lieu doit avoir au moins 3 caractères")
      .required("Le type de lieu est requis"),
    details: yup.lazy((values) => {
      if (values.type === "park") {
        return yup.object({
          typeOfPark: yup
            .string()
            .min(3, "Le type de parc doit avoir au moins 3 caractères")
            .required("Le type de parc est requis"),
          publicOuPrive: yup
            .string()
            .min(3, "Indiquez s'il s'agit d'un parc public ou privé")
            .required("La spécification public/privé est requise"),
          freeOrNot: yup
            .string()
            .min(3, "Indiquez si le parc est gratuit ou payant")
            .required("Indiquez si le parc est gratuit ou payant"),
          price: yup
            .string()
            .min(3, "Le prix doit avoir au moins 3 caractères")
            .required("Indiquez le prix du parc"),
        });
      } else if (values.type === "bar") {
        return yup.object({
          typeOfBar: yup
            .string()
            .min(3, "Le type de bar doit avoir au moins 3 caractères")
            .required("Le type de bar est requis"),
          price: yup
            .string()
            .min(3, "Le prix doit avoir au moins 3 caractères")
            .required("Indiquez le prix du bar"),
        });
      } else if (values.type === "musee") {
        return yup.object({
          courantArtistique: yup
            .string()
            .min(3, "Le courant artistique doit avoir au moins 3 caractères")
            .required("Le courant artistique est requis"),
          typeArt: yup
            .string()
            .min(3, "Le type d'art doit avoir au moins 3 caractères")
            .required("Le type d'art est requis"),
          freeOrNot: yup
            .string()
            .min(3, "Indiquez si le musée est gratuit ou payant")
            .required("Indiquez si le musée est gratuit ou payant"),
          price: yup
            .string()
            .min(3, "Le prix doit avoir au moins 3 caractères")
            .required("Indiquez le prix du musée"),
        });
      } else if (values.type === "restaurant") {
        return yup.object({
          typeOfRestaurant: yup
            .string()
            .min(3, "Le type de restaurant doit avoir au moins 3 caractères")
            .required("Le type de restaurant est requis"),
          nombreEtoiles: yup
            .string()
            .min(3, "Le nombre d'étoiles doit avoir au moins 3 caractères")
            .required("Indiquez le nombre d'étoiles du restaurant"),
          prixMoyen: yup
            .string()
            .min(3, "Le prix moyen doit avoir au moins 3 caractères")
            .required("Indiquez le prix moyen du restaurant"),
        });
      } else {
        return yup.object();
      }
    }),
  }),
});

const styles = "p-2 m-2 border border-gray-300 rounded-md";


const EditLocation = ({ initialLocation, query }) => {
  const router = useRouter();

  const handleSubmit = async (values) => {
    console.log(values);
    const reponse = await axios.patch(
      `/api/locations/${query.locationid}`,
      values
    );

    reponse.status === 200
      ? router.push(`/locations/${query.locationid}`)
      : alert("Erreur lors de la modification");
  };

  return (
    <div>
      <Formik
        initialValues={initialLocation}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form className="flex flex-col w-1/2 mx-auto gap-4 mt-4">
            <div>
              <label className={labelStyle} htmlFor="nom">Nom:</label>
              <Field type="text" id="nom" name="nom" className={styles} />
              <ErrorMessage name="nom" component="div" />
            </div>
            <div>
              <label className={labelStyle} htmlFor="adresse.rue">Rue:</label>
              <Field
                type="text"
                id="adresse.rue"
                name="adresse.rue"
                className={styles}
              />
              <ErrorMessage name="adresse.rue" component="div" />
            </div>
            <div>
              <label className={labelStyle} htmlFor="adresse.codePostal">Code Postal:</label>
              <Field
                type="text"
                id="adresse.codePostal"
                name="adresse.codePostal"
                className={styles}
              />
              <ErrorMessage name="adresse.codePostal" component="div" />
            </div>
            <div>
              <label className={labelStyle} htmlFor="adresse.ville">Ville:</label>
              <Field
                type="text"
                id="adresse.ville"
                name="adresse.ville"
                className={styles}
              />
              <ErrorMessage name="adresse.ville" component="div" />
            </div>
            <div>
              <label className={labelStyle} htmlFor="adresse.pays">Pays:</label>
              <Field
                type="text"
                id="adresse.pays"
                name="adresse.pays"
                className={styles}
              />
              <ErrorMessage name="adresse.pays" component="div" />
            </div>
            <div>
              <label className={labelStyle} htmlFor="typeDeLieu.type">Type de Lieu:</label>
              <Field
                as="select"
                id="typeDeLieu.type"
                name="typeDeLieu.type"
                className={styles}
              >
                <option value="">Sélectionnez un type de lieu</option>
                <option value="Bar">Bar</option>
                <option value="Parc">Parc</option>
                <option value="Musee">Musée</option>
                <option value="Restaurant">Restaurant</option>
              </Field>
              <ErrorMessage name="typeDeLieu.type" component="div" />
            </div>
            {values.typeDeLieu.type === "Bar" && (
              <div>
                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.typeOfBar">
                    Type de Bar:
                  </label>
                  <Field
                    type="text"
                    id="typeDeLieu.details.typeOfBar"
                    name="typeDeLieu.details.typeOfBar"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.typeOfBar"
                    component="div"
                    className={styles}
                  />
                </div>

                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.price">Prix:</label>
                  <Field
                    type="number"
                    id="typeDeLieu.details.price"
                    name="typeDeLieu.details.price"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.price"
                    component="div"
                  />
                </div>
              </div>
            )}
            {values.typeDeLieu.type === "Parc" && (
              <div>
                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.typeOfPark">
                    Type de Parc:
                  </label>
                  <Field
                    type="text"
                    id="typeDeLieu.details.typeOfPark"
                    name="typeDeLieu.details.typeOfPark"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.typeOfPark"
                    component="div"
                  />
                </div>
                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.publicOuPrive">
                    Public ou Privé:
                  </label>
                  <Field
                    type="text"
                    id="typeDeLieu.details.publicOuPrive"
                    name="typeDeLieu.details.publicOuPrive"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.publicOuPrive"
                    component="div"
                  />
                </div>
              </div>
            )}
            {values.typeDeLieu.type === "Parc" && (
              <div>
                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.freeOrNot">
                    Gratuit ou Payant:
                  </label>
                  <Field
                    type="number"
                    id="typeDeLieu.details.freeOrNot"
                    name="typeDeLieu.details.freeOrNot"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.freeOrNot"
                    component="div"
                  />
                </div>

                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.price">Prix:</label>
                  <Field
                    type="number"
                    id="typeDeLieu.details.price"
                    name="typeDeLieu.details.price"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.price"
                    component="div"
                  />
                </div>
              </div>
            )}
            {values.typeDeLieu.type === "Musee" && (
              <div>
                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.courantArtistique">
                    Courant Artistique:
                  </label>
                  <Field
                    type="text"
                    id="typeDeLieu.details.courantArtistique"
                    name="typeDeLieu.details.courantArtistique"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.courantArtistique"
                    component="div"
                  />
                </div>

                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.typeArt">
                    Type d'Art:
                  </label>
                  <Field
                    type="text"
                    id="typeDeLieu.details.typeArt"
                    name="typeDeLieu.details.typeArt"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.typeArt"
                    component="div"
                  />
                </div>
                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.freeOrNot">
                    Gratuit ou Payant:
                  </label>
                  <Field
                    type="number"
                    id="typeDeLieu.details.freeOrNot"
                    name="typeDeLieu.details.freeOrNot"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.freeOrNot"
                    component="div"
                  />
                </div>
                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.price">Prix:</label>
                  <Field
                    type="number"
                    id="typeDeLieu.details.price"
                    name="typeDeLieu.details.price"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.price"
                    component="div"
                  />
                </div>
              </div>
            )}
            {values.typeDeLieu.type === "Restaurant" && (
              <div>
                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.typeOfRestaurant">
                    Type de Restaurant:
                  </label>
                  <Field
                    type="text"
                    id="typeDeLieu.details.typeOfRestaurant"
                    name="typeDeLieu.details.typeOfRestaurant"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.typeOfRestaurant"
                    component="div"
                  />
                </div>

                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.nombreEtoiles">
                    Nombre d'Étoiles:
                  </label>
                  <Field
                    type="number"
                    id="typeDeLieu.details.nombreEtoiles"
                    name="typeDeLieu.details.nombreEtoiles"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.nombreEtoiles"
                    component="div"
                  />
                </div>

                <div>
                  <label className={contentStyle} htmlFor="typeDeLieu.details.prixMoyen">
                    Prix Moyen:
                  </label>
                  <Field
                    type="number"
                    id="typeDeLieu.details.prixMoyen"
                    name="typeDeLieu.details.prixMoyen"
                    className={styles}
                  />
                  <ErrorMessage
                    name="typeDeLieu.details.prixMoyen"
                    component="div"
                  />
                </div>
              </div>
            )}
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
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

export default EditLocation;
