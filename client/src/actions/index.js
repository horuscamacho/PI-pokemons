import axios from 'axios';
import TYPES from './types';


const urlServer = "http://localhost:3001/pokemons"
const urlTypes = "http://localhost:3001/types"



//####################      FUNCIÓN PARA BUSCAR POKEMONS


export function getNamePokemon(name) {
    return async function (dispatch) {
            var json = await axios.get(`${urlServer}?name=${name}`)
            return dispatch({
                type: TYPES.GET_NAME_POKEMON,
                payload: json.data
            })
    }
}

//##################   FUNCIÓN OBTENER TODOS LOS POKEMONS 
export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get(urlServer);
        return dispatch({
            type: TYPES.GET_POKEMONS,
            payload: json.data
        })
    }
}

//##################   FUNCIÓN OBTENER TODOS LOS TIPOS 
export function getTypes() {
    return async function(dispatch) {
        var json = await axios.get(urlTypes)
        return dispatch({
            type: TYPES.GET_TYPES,
            payload: json.data
        })
    }
}

//##################   FUNCIÓN OBTENER USUARIO 

export function getUser(name){
    return async function(dispatch){
        var usuario = [{
            name: name
        }]
        return dispatch({
            type: TYPES.GET_USER,
            payload: usuario
        })
    } 
}

//##################   FUNCIÓN DE ORDENAMIENTO


export function orderByName(payload){
    return {
        type: TYPES.HANDLE_SORT,
        payload
    }
}

//##################   FUNCIÓN DE FILTRADO POR ORIGINALES/CREADOS

export function filterCreated(payload){
    return {
        type: TYPES.FILTER_BY_CREATED,
        payload
    }
}

//##################   FUNCIÓN DE FILTRADO POR TYPE


export function filterPokemonsByType(payload){
    return {
        type: TYPES.FILTERED_BY_TYPE,
        payload
    }
}




//###################   FUNCIÓN PARA MOSTRAR LOS DETALLES DEL POKEMON

export function getDetail(id) {
    return async function (dispatch){
       if(id){
        try {
            var json = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: TYPES.GET_DETAIL,
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
       } else {
        return dispatch({
            type: TYPES.GET_DETAIL,
            payload: []
        })
       }
        
    }
}




export function postPokemon(payload){
    return async function (){
        const json = await axios.post('http://localhost:3001/pokemons', payload)
        console.log(json)
        return json
    }
}