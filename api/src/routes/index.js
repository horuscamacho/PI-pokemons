const { Router } = require('express');
const axios = require('axios')
const { Pokemon, Types} = require('../db');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const URL = "https://pokeapi.co/api/v2/pokemon"





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getDataAPI = async () => {
    const received = await axios(URL)
    const data = await received.data
    const results = await data.results  //Tenemos los primero 20
    const next = await axios(data.next)
    const resultsNext = await next.data.results  //Tenemos los segundos 20
    const allData = await results.concat(resultsNext)
    const links = await allData.map(el => el.url) //Tenemos el link de 40 Pokemons como lo pide el PI
    
    const allPokemons = await axios.all(links.map((li) => axios.get(li))).then(    
        (data) => data
    )
    const allPokemonsData = await allPokemons.map(el => {       //AQUI los tenemos todos en un solo array
        return el.data
    })
    
    const eachPokemon = await allPokemonsData.map(el =>{
        return {
        id: el.id,
        name: el.name,
        type: el.types.map(el => el.type.name),
        life: el.stats[0].base_stat,
        attack: el.stats[1].base_stat,
        defense: el.stats[2].base_stat,
        velocity: el.stats[5].base_stat,
        height: el.height,
        weight: el.weight,
        image: el.sprites.other.home.front_default
        } 
    })
    return eachPokemon
}


const getDBinfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Types,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}


const getAllPokemons = async () => {
    const apiInfo = await getDataAPI()
    const DBinfo = await getDBinfo()
    const infoTotal = await apiInfo.concat(DBinfo)
    return await infoTotal
}



//################  CONFIGURANDO        RUTAS       GET     ##################################################

router.get("/pokemons", async (req, res) => {
    const name = req.query.name
    const pokemonsTotal = await getAllPokemons()
    
    if(name) {
        let pokemonName = await pokemonsTotal.filter(el => el.name.toLowerCase().includes(name.toLocaleLowerCase()))
        pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send("No esta el pokemón que buscas en la pokedex")
    } else {
        res.status(200).send(pokemonsTotal)
    }
})


router.get('/types', async (req, res) => {
    const typeApi = await axios.get('https://pokeapi.co/api/v2/type');
    const typeApiData = typeApi.data;
    const typeResults = typeApiData.results
    const typesName = typeResults.map(el => el.name)

    typesName.forEach(el => {
        Types.findOrCreate({
            where: { name: el }
        })
    })

    const allTypes = await Types.findAll();
    res.send(allTypes)

})


router.get('/pokemons/:id', async (req, res) => {
    const id = req.params.id
    const pokemonsTotal = await getAllPokemons()
    
    if(id) {
        let pokemonId = await pokemonsTotal.filter(el => el.id == id)
        pokemonId.length ?
        res.status(200).send(pokemonId) : res.status(404).send('Lo sentimos este pokemon no esta en la pokedex')
    }
})







//################  CONFIGURANDO        RUTAS       POST     ##################################################

router.post('/pokemons', async (req, res) => {
    let {name, life, image, type, height, weight, defense, velocity, attack, createdInDB} = req.body
    let pokemonCreated = await Pokemon.create({name, life, image, type, height, weight, defense, velocity, attack, createdInDB})

    let typesInDB = await Types.findAll({where: {name: type}})

    pokemonCreated.addTypes(typesInDB)
    res.send('Pokemón creado correctamente')
})




module.exports = router;
