import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNamePokemon, searchLive } from '../actions'
import '../css/searchBar.css'


const SearchBar = ({setCurrentPage}) => {
    
    

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        setName(e.target.value)
        if(e.target.value.length === 0){
            document.body.className = "general"
        }
        dispatch(searchLive(e.target.value))
        setCurrentPage(1)
       
    }

    function handleSubmit(e){
        
        e.preventDefault()

        dispatch(getNamePokemon(name))
        setCurrentPage(1)
        e.target.value = ""
    }


  return (
    <div className="mainSeacrhBar">
        <input  className='iinpuut'
        type="text"
        placeholder='Buscar Pokemón'
        onChange={(e) => handleInputChange(e)}/>
        <button type='submit' onClick={(e) => handleSubmit(e)} className="booton">go</button>
    </div>
  )
}

export default SearchBar