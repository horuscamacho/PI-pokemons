import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNamePokemon } from '../actions'
import '../css/searchBar.css'


const SearchBar = ({setCurrentPage}) => {
    
    

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        setName(e.target.value)
        if(e.target.value.length === 0){
            document.body.className = "general"
        }
       
    }

    function handleSubmit(e){
        e.target.value = ""
        e.preventDefault()

        dispatch(getNamePokemon(name))
        setCurrentPage(1)
        
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