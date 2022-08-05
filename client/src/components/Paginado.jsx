import React from 'react'
import "../css/pagination.css"

const Paginado = ({ pokemonsPerPage, allPokemons, paginado }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className='first'>
           
                {pageNumbers &&
                    pageNumbers.map(number => (  
                            <a className='aas' onClick={() => paginado(number)} key={number + 100}  >{number} </a>
                    ))}
           
        </div>
    )
}

export default Paginado