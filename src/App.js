import React, { useState, useEffect } from "react";
import "./App.css";
import { getAllPokemonData, getPokemon } from "./services/pokemon";
import Card from "./component/card/card";
import Navbar from "./component/navbar/navbar";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemonData(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemonData(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };
  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemonData(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    let _pokemon = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemon);
  };
  console.log(pokemonData);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Navbar />
          <div className="btn">
            <button className="pointer" onClick={prev}>
              Prev
            </button>
            <button className="pointer" onClick={next}>
              next
            </button>
          </div>
          <div className="grid-container">
            {pokemonData.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
