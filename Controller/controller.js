import mongoose from "mongoose";
import jokes from "../models/jokes.js";
import config from "../config.js";
// import router from "../routes/jokes.js";
// import app from "../app.js";

mongoose.connect(
  config.databaseURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB!")
);

export async function createJoke(name, setup, punchline) {
  const jokeSetup = await jokes.findOne().where("setup").equals(setup).exec();
  const jokePunchline = await jokes.findOne().where("punchline").equals(punchline).exec();
  if (!jokeSetup && !jokePunchline) {
    return await jokes.create({
      name,
      setup,
      punchline,
    });
  }
}

// createJoke(
//   "Patrick - Kongen af far humor",
//   "Hvad kalder man to lamaer, der spiser hestenes hø?",
//   "Ballamaere"
// );

export function getJokes() {
  return jokes.find().exec();
}
