import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import '../css/detail.css'
import imageDef from "../css/images/quienes.png"



export default function Detail(props) {

  function changingBackground (nombre) {
    document.body.className = nombre
}

  
  changingBackground("detail-page")




  const dispatch = useDispatch()
  let id = props.match.params.id
  useEffect(() => {
    dispatch(getDetail(id))

    return () => dispatch(getDetail())
  }, [dispatch])
  const myPokemon = useSelector((state) => state.detail)
  const pokemon = myPokemon ? myPokemon[0] : console.log(myPokemon)


  return (
    <>
       <Link to="/home"><button type='submit'  className="booton">Regresar a página principal</button></Link>
      {
        pokemon && !pokemon.createdInDB ? 
          <div className='body-detail'>
            <div className='card-detail'>
              <img className='img-detail' src={pokemon.image }></img>
              <h5 className='h5-id-detail'>ID: {pokemon.id}</h5>
              <h4 className='h3-name-detail'>NOMBRE: {pokemon.name}</h4>
              <h4 className='h3-life-detail'>Vida: {pokemon.life}</h4>
              <h4 className='h3-attack-detail'>Ataque: {pokemon.attack}</h4>
              <h4 className='h3-deffense-detail'>Defensa: {pokemon.defense}</h4>
              <h4 className='h3-velocity-detail'>Velocidad: {pokemon.velocity}</h4>
              <h4 className='h3-height-detail'>Altura: {pokemon.height}</h4>
              <h4 className='h3-weight-detail'>Peso: {pokemon.weight}</h4>
              {
                pokemon.type.length === 1 ? <h4 className='h3-type-detail'>Tipo: {pokemon.type[0]}</h4> :
                <h4 className='h3-type-detail'>Tipos: {pokemon.type[0]}, {pokemon.type[1]} </h4>
              }
            </div>
          </div> : pokemon && pokemon.createdInDB ? 
          <div className='body-detail'>
            <div className='card-detail'>
              <img className='img-detail' src={pokemon.image ? pokemon.image : imageDef}></img>
              <h5 className='h5-id-detail'>ID: {pokemon.id}</h5>
              <h4 className='h3-name-detail'>NOMBRE: {pokemon.name}</h4>
              <h4 className='h3-life-detail'>Vida: {pokemon.life}</h4>
              <h4 className='h3-attack-detail'>Ataque: {pokemon.attack}</h4>
              <h4 className='h3-deffense-detail'>Defensa: {pokemon.defense}</h4>
              <h4 className='h3-velocity-detail'>Velocidad: {pokemon.velocity}</h4>
              <h4 className='h3-height-detail'>Altura: {pokemon.height}</h4>
              <h4 className='h3-weight-detail'>Peso: {pokemon.weight}</h4>
              <h3>ELIMINAR</h3>
              {
                pokemon.type.length === 1 ? <h4 className='h3-type-detail'>Tipo: {pokemon.type[0]}</h4> :
                <h4 className='h3-type-detail'>Tipos: {pokemon.type[0]}, {pokemon.type[1]} </h4>
              }
            </div>
          </div>
           :<h2>Cargando...</h2>
      }
    </>
  )
}

