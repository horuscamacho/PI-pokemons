import React from "react";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import '../css/home.css'
import '../css/landing.css'

export default function LandingPage() {
    useEffect(() => {
        document.body.className = "landing"
    }, [])
    return (
        <div className="divGeneral">

            <div className="divSuperior">
                <h1 className="mensajeBienvenida">Bienvenido a la Pokedex de HENRY</h1>
            </div>



            <div className="divInferior">
                <Link to='/home'>
                    <div className="pokeball">
                        <div className="botonn"></div>
                    </div>
                </Link>
            </div>



        </div>
    )
}



/*

export default function LandingPage() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])


    function handleOnChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(e.target.value)
    }

    function handleSubmit(e) {
        dispatch(getUser(name))
    }

    return (
        <div>
            <h1>Bienvenidos a la Pokedex</h1>
            <div>
                <h4>Ingresar como Maestro Pokemón</h4>
                <input type="text" onChange={(e) => handleOnChange(e)} />
                <Link to="/home">
                    <button type="submit" onClick={(e) => handleSubmit(name)} >Bienvenido Maestro</button>
                </Link>
            </div>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}
 */