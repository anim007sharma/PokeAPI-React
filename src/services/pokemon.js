export async function getAllPokemonData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        resolve(data);
      });
  });
}

export async function getPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        resolve(data);
      });
  });
}
