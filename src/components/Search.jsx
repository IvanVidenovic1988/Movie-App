import React from 'react'

export default function Search({ searchTitle, setSearchTitle}) {
  return (
    <div className="col col-sm-4">
        <input 
            className='form-control'
            placeholder='search' 
            value={searchTitle}  
            onChange={(e) => setSearchTitle(e.target.value)}     
        />
    </div>
  )
}
