import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import MoviesList from "./components/MoviesList";
import MovieHeading from "./components/MovieHeading";
import Search from "./components/Search";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (title) => {
    const url = "http://www.omdbapi.com/?apikey=dec402dc";

    const response = await fetch(`${url}&s=${title}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchTitle);
  }, [searchTitle]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const zoran = favourites.filter(
      (favourite) => favourite.imdbID === movie.imdbID
    );

    if (zoran.length > 0) {
      return;
    }

    const newFavouriteList = [...favourites, movie];

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const RemoveFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <BrowserRouter>
        
          <div className="row d-flex align-items-center mt-4 mb-4">
            <MovieHeading heading="Movies" />

            <Search searchTitle={searchTitle} setSearchTitle={setSearchTitle} />
          </div>

        <Route exact path="/">
          <div className="red">
            <MoviesList
              movies={movies}
              AddFavourites={AddFavourites}
              addFavouriteMovie={addFavouriteMovie}
            />
          </div>

          <div className="row d-flex align-items-center mt-4 mb-4">
            <MovieHeading heading="Favourites" />
          </div>

          <div className="red">
            <MoviesList
              movies={favourites}
              AddFavourites={RemoveFavourites}
              addFavouriteMovie={RemoveFavouriteMovie}
            />
          </div>
        </Route>

        <Route path="/movies/:imdbId">
          <MovieDetails />
        </Route>

      </BrowserRouter>
    </div>
  );
}

export default App;
