
import TYPES from "../actions/types";

const initialState = {
    pokemons: [],
    pokemonsCopy: [],
    pokemonsType: [],
    types: [],
    detail: [],
    pokemonsSfilter: [] 
}


function rootReducer (state=initialState, action) {
    switch(action.type){
        
        case TYPES.GET_DETAIL:
            return {
                ...state,
                detail: action.payload 
            }

        case TYPES.GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsCopy: action.payload
            }
        
        case TYPES.GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        
        

        case TYPES.HANDLE_SORT:
            let sortedArray = action.payload === "-" ? state.pokemonsCopy : action.payload  === 'AZ' ? state.pokemons.sort(function(a, b){
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) : action.payload === 'ZA' ? state.pokemons.sort(function(a, b){
                if(b.name > a.name) {
                    return 1;
                }
                if(a.name > b.name) {
                    return -1
                }
                return 0
            }) : action.payload === "weak" ? state.pokemons.sort(function(a, b){
                return a.attack - b.attack
            }) : state.pokemons.sort(function(a, b) {
                return b.attack - a.attack
            })
            return{
                ...state,
                pokemons: sortedArray
            }
        
///////////////////// ESTE FILTRADO YA FUNCIONA AL 100% SOLO         
        case TYPES.FILTERED_BY_TYPE:

        if(!state.pokemonsSfilter || state.pokemonsSfilter.length === 0 ){
             console.log("Aquí entro 1")
            const allPokemonss = state.pokemonsCopy
            const statusFiltered = action.payload === "-" ? allPokemonss : allPokemonss.filter(el => el.type[0] === action.payload || el.type[1] === action.payload)
            return {
                ...state,
                pokemons: statusFiltered,
                pokemonsType: statusFiltered
            }
        } else {
            console.log("entro aquí 3")
            const allPokemonss = state.pokemonsSfilter
            const statusFiltered = action.payload === "-" ? allPokemonss : allPokemonss.filter(el => el.type[0] === action.payload || el.type[1] === action.payload)
            return {
                ...state,
                pokemons: statusFiltered,
                pokemonsType: statusFiltered
            }
        }

///////////////////////////////////////////////////////////////////

        case TYPES.FILTER_BY_CREATED:

        if(!state.pokemonsType){
            console.log("Ya entraste aquí")
            const allPokemonss = state.pokemonsCopy
            const statusFiltered = action.payload === "-" ? allPokemonss : action.payload === "original" ? allPokemonss.filter(el => !el.createdInDB) : allPokemonss.filter(el => el.createdInDB)
            return{
                ...state,
                pokemons: statusFiltered,
                pokemonsSfilter: statusFiltered
            }

        } else {
            const allPokemonss = state.pokemonsType
            const statusFiltered = action.payload === "-" ? allPokemonss : action.payload === "original" ? allPokemonss.filter(el => !el.createdInDB) : allPokemonss.filter(el => el.createdInDB)
            return {
                ...state,
                pokemons: statusFiltered
            }
        }
        
        
        case TYPES.GET_NAME_POKEMON:
            console.log(action.payload)
            return {
                ...state,
                pokemons: action.payload,
            }

        case TYPES.SEARCH_LIVE:
            const filtradoRapido = state.pokemonsCopy.filter(el => el.name.includes(action.payload))
            console.log(filtradoRapido)
            return {
                ...state,
                pokemons: filtradoRapido
            }

        case TYPES.RESET_FILTERS:
            return {
                ...state,
                pokemons: state.pokemonsCopy
            }


            
        case TYPES.POST_POKEMON:
            return {
                ...state,
            }
        
            

            
        
        default:
            return {
                state
            }
    }
}



export default rootReducer;