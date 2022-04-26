import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { Link } from "react-router-dom"


export default function MovieDetails() {

  const { imdbId } = useParams();
  
  const url = `http://www.omdbapi.com/?apikey=dec402dc&i=${imdbId}`
  const { data: movie, isPending, error } = useFetch(url)

  return (
    <div>
        {isPending && <div className='loading'>Loading...</div>}
        {error && <div className='error'>{error}</div>} 
        {movie && (
            <>
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt="zoran" />
            </>
            
        )}
          <Link to='/'>
            <button className='btn'>back</button>
          </Link>

    </div>
  )
}
