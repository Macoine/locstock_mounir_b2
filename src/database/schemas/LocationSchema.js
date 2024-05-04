import { Schema } from "mongoose";

export const LocationSchema = new Schema({
  nom: {
    type: String,
    required: true,
  },
  adresse: {
    rue: {
      type: String,
      required: true,
    },
    ville: {
      type: String,
      required: true,
    },
    pays: {
      type: String,
      required: true,
    },
    codePostal: {
      type: String,
      required: true,
    },
  },
  typeDeLieu: {
    type: {
      type: String,
      enum: ["Restaurant", "Musee", "Bar", "Parc"],
      required: true,
    },
    details: {
      typeOfParc: {
        type: String,
        function(value) {
          if (this.typeDeLieu.type === "Parc") {
            return value;
          }
        },
      },
      publicOuPrive: {
        type: String,
        function(value) {
          if (this.typeDeLieu.type === "Parc") {
            return value;
          }
        },
      },
      freeOrNot: {
        type: Number,
        function(value) {
          if (this.typeDeLieu.type === "Parc") {
            return value;
          }
        },
      },
      price: {
        type: Number,
        function(value) {
          if (this.typeDeLieu.type === "Parc") {
            return value;
          }
        },
      },
      typeOfRestaurant: {
        type: String,
        function(value) {
          if (this.typeDeLieu.type === "Restaurant") {
            return value;
          }
        },
      },
      nombreEtoiles: {
        type: Number,
        function(value) {
          if (this.typeDeLieu.type === "Restaurant") {
            return value;
          }
        },
      },
      prixMoyen: {
        type: Number,
        function(value) {
          if (this.typeDeLieu.type === "Restaurant") {
            return value;
          }
        },
      },
      courantArtistique: {
        type: String,
        function(value) {
          if (this.typeDeLieu.type === "Musee") {
            return value;
          }
        },
      },
      typeArt: {
        type: String,
        function(value) {
          if (this.typeDeLieu.type === "Musee") {
            return value;
          }
        },
      },
      freeOrNot: {
        type: Number,
        function(value) {
          if (this.typeDeLieu.type === "Musee") {
            return value;
          }
        },
      },
      price: {
        type: Number,
        function(value) {
          if (this.typeDeLieu.type === "Musee") {
            return value;
          }
        },
      },
      typeOfBar: {
        type: String,
        function(value) {
          if (this.typeDeLieu.type === "Bar") {
            return value;
          }
        },
      },
      price: {
        type: Number,
        function(value) {
          if (this.typeDeLieu.type === "Bar") {
            return value;
          }
        },
      },
    },
  },
});
