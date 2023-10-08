import { useState } from "react";

export const BuscadorPeliculas = () => {
  const urlBase = "https://api.themoviedb.org/3/search/movie";

  const APY_KEY = "8de45dbb525b73036fea05445d67597e";
  const [busqueda, setBusqueda] = useState("");

  const [peliculas, setPeliculas] = useState([]);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${busqueda}&api_key=${APY_KEY}`
      );
      const data = await response.json();

      // Verificar si 'results' es un array antes de actualizar el estado
      if (Array.isArray(data.results)) {
        setPeliculas(data.results);
      } else {
        console.error(
          "La respuesta de la API no contiene un array de películas: ",
          data
        );
      }
    } catch (error) {
      console.error("Ha ocurrido un error: ", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de películas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribí una película"
          value={busqueda}
          onChange={handleInputChange}
        ></input>

        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
              alt={pelicula.title}
            />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
