import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { getPokemons, getTypes, getUser, orderByName, filterPokemonsByType, filterCreated } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import '../css/card.css'
import '../css/home.css'
import '../css/home2.css'
import Filtros from "./Filtros";
import SearchBar from "./SearchBar";
import imageDef from "../css/images/quienes.png"


 


export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage,] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (PageNumber) => {
        setCurrentPage(PageNumber)
    }


    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
        changingBackground("general")
    }, [dispatch])

   
   

    function handleSort(e) {
        console.log(orden)
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function changingBackground (nombre) {
        document.body.className = nombre
    }


    function handleFilteredByType(e) {
        dispatch(filterPokemonsByType(e.target.value))
        setCurrentPage(1)
        console.log(e.target.value)
        changingBackground(e.target.value)
    }


    function handleFilteredByCreated (e) {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
        
    }

    

        return (
            <div className="maestroPokemon">
                <h2>Bienvenido a la POKEDEX de HENRY </h2>
                <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons?.length} paginado={paginado} />
                <div>
                    <Link to="/pokemons"><button className="booton">Crear un Pokemón</button></Link>
                </div>
                <div >
                    <SearchBar setCurrentPage={setCurrentPage}/>
                </div>
                <div >
                    <button onClick={() => window.location.reload()} className="booton">Reestablecer todos los filtros</button>
                </div>
                <Filtros filtros = {{handleSort, handleFilteredByType, handleFilteredByCreated}}/>
                {
                    currentPokemons?.map((p) => {
                        console.log(p.type)
                        return (
                            <div key={p.id} className="bckgrndImg">
                                <Link to={"/pokemons/" + p.id}  >
                                    <Card name={p.name} image={p.image ? p.image : imageDef } type={p.type} key={p.id} createdInDB={p.createdInDB}/>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }









