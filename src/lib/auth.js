import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("petAdoption");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  
  emailAndPassword: {
    enabled: true,
  },


  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },


  baseURL: "http://localhost:3000/api/auth", 
  secret: process.env.BETTER_AUTH_SECRET,
});