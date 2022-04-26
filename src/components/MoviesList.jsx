import React from 'react'
import './MoviesList.css'
import { Link } from 'react-router-dom'


export default function MoviesList({ movies, AddFavourites, addFavouriteMovie }) {
  return (
    <> 
        {movies && movies.map((movie, index) => (
            <div key={index} className='image-container d-flex justify-content-start m-3 movie'>
              <Link to={`/movies/${movie.imdbID}`}>
                <img 
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} 
                    alt="movie" 
                />
              </Link>   
              
                <div 
                   className='overlay d-flex align-items-center justify-content-center'
                   onClick={() => addFavouriteMovie(movie)}
                >
                  <AddFavourites />
                </div>
              
            </div>
        ))}
    </>
  )
}
