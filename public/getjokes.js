//* Henter hjemmesiden
async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200) {
    throw new Error(respons.status);
  }
  return await respons.json();
}

async function getText(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    // OK
    throw new Error(respons.status);
  return await respons.text();
}

async function generateJokes(jokes) {
  let template = await getText("./api/jokes.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

async function getJokes() {
  try {
    respons = await get("./api/jokes");
    console.log("getJokes()");
    document.getElementById("joke-container").innerHTML = await generateJokes(
      respons
    );
    console.log(respons);
  } catch (error) {
    console.log(error);
  }
}
getJokes();
