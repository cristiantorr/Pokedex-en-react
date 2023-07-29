import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import  PokeballImg  from "../assets/pokeball.png";
import  BulbasourImg  from "../assets/bulbasaur.gif";
import Footer from "../components/Footer";
import styles from "./pokemon.module.css";
import { PokemonDetails } from "../types/types.d";
import { fetchPokemon } from '../api/fetchPokemon';
import { waitFor } from "../utils/utils";

import LoadingScreen from "../components/LoadingScreen";

const Pokemon = () => {
  const [isLoading, setIsloading] = useState(true);

  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<PokemonDetails>();
  
  useEffect(() => {

    async function getPokemon() {
      setIsloading(true);
      await waitFor(1500);

      const fetchedPokemon = await fetchPokemon(name as string);
     setPokemon(fetchedPokemon); 
     setIsloading(false);

    }
    getPokemon();

  }, [name]);
  if( isLoading || !pokemon ) {
    return <LoadingScreen />;
  }

  return ( 
    <>
   <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
    <img className={styles.pokeballImg} src={PokeballImg} alt="Pokeball" />{" "}
    Volver
   </button>
   <div className={styles.pokemon} >
    <main className={styles.pokemonInfo}>
      <div className={styles.pokemonTitle}>{name?.toLocaleUpperCase()}</div>
      <div>Nr. {pokemon?.id}</div>
      <div>
        <img className={styles.pokemonInfoImg} 
        src={pokemon?.imgSrc} 
        alt={pokemon?.name}  />
      </div>
      <div>HP: {pokemon?.hp} </div>
      <div>Attack: {pokemon?.attack} </div>
      <div>Defense:  {pokemon?.defense}</div>
    </main>
   </div>
    <Footer />
    </>
  );
};

export default Pokemon;