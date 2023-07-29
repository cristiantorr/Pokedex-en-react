import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemons } from "../api/fetchPokemons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Pokemon } from "../types/types.d";
import { waitFor } from "../utils/utils";
import styles from "./pokemons.module.css";
import LoadingScreen from "../components/LoadingScreen";

const Pokemons = () => {
  const [isLoading, setIsloading] = useState(true);
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
  useEffect(() => {
    const fetchAllPokemons = async () => {
      setIsloading(true);
      await waitFor(1500);
      const allPokemons = await fetchPokemons();
      setPokemons(allPokemons);
      setIsloading(false);
    };
    fetchAllPokemons();
  }, []);

  if( isLoading || !pokemons ) {
    return <LoadingScreen />;
  }

  const filteredPokemons = pokemons?.slice(0, 151).filter((pokemon) => {
    return pokemon.name.toLowerCase().match(query.toLocaleLowerCase());
  })

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main>
        <nav>
          {filteredPokemons?.slice(0, 151).map((pokemon) => (
            <Link
              key={pokemon.id}
              className={styles.listItem}
              to={`/pokemon/${pokemon.name.toLowerCase()}`}
            >
              <img
                className={styles.listItemIcon}
                src={pokemon.imgSrc}
                alt={pokemon.name}
              />
              <div className={styles.listItemText}>
                <span>{pokemon.name}</span>
                <span>{pokemon.id}</span>
              </div>
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
};


export default Pokemons;

function awaitFor(arg0: number) {
  throw new Error("Function not implemented.");
}
