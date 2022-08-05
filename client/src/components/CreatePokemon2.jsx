import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from "../actions";


function validate(input) {
    let errors = {}
    if (input.name.length < 4 || input.name.length > 10 || !input.name) {
        errors.name = "Se requiere un nombre, debe contener entre 4 y 10 caracteres"
    }
    if (!input.type || input.type.length < 1 || input.type.length > 2) {
        errors.type = "Solo puedes agregar 1 o 2 tipos de pokemón"
    }
    if (!input.life || input.life < 20 || input.life > 150) {
        errors.life = "El mínimo de vida es de 20 y el máximo es de 150"
    }
    if (!input.velocity || input.velocity < 10 || input.velocity > 100) {
        errors.velocity = "La velocidad máxima es de 100 y la mínima de 10"
    }
    if (!input.attack || input.attack < 30 || input.attack > 100) {
        errors.attack = "El máximo de ataque es 100 y el mínimo de 30"
    }
    if (!input.weight || input.weight < 10 || input.weight > 200) {
        errors.weight = "El mínimo de peso es 10 y el máximo es de 200"
    }
    if (!input.height || input.height < 60 || input.height > 200) {
        errors.height = "La altura mínima es de 60 y la máxima es de 200"
    }
    if (input.image && input.image.length > 150) {
        errors.image = "Solo se permiten 150 caracteres como máximo"
    }
    if (!input.defense || input.defense < 60 || input.defense > 200) {
        errors.defense = "El mínimo de defensa es de 60 y el máximo es de 200"
    }
    return errors;
}


const CreatePokemon2 = () => {

    const dispatch = useDispatch()
    const history = useHistory()



    const types = useSelector((state) => state.types)

    const [errors, setErrors] = useState({})


    const [form, setForm] = useState({
        email: "",
        name: "",
        password: ""
    })


    const [input, setInput] = useState({
        name: "",
        type: [],
        life: 0,
        attack: 0,
        defense: 0,
        velocity: 0,
        height: 0,
        weight: 0,
        image: ""
    })

    const [count, setCount] = useState(1)

    const updateInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    function handleSelect(e) {
        if (input.type.length < 2) {
            setInput({
                ...input,
                type: [...input.type, e.target.value]
            })
        } else {
            alert("Solo puedes agregar 2 tipos")
        }
    }


    function handleSubmit(e) {
        if (input.name.length < 4 || input.name > 12 ||
            input.life < 20 || input.life > 150 ||
            input.attack < 30 || input.attack > 100 ||
            input.defense < 60 || input.defense > 200 ||
            input.velocity < 10 || input.velocity > 100 ||
            input.height < 60 || input.height > 200 ||
            input.weight < 10 || input.weight > 200 ||
            input.type.length < 1) {
            alert("ALguno de los datos ingresados es incorrecto, revisa el formulario e inténtalo de nuevo")
        } else {
            e.preventDefault()
            console.log(input)
            dispatch(postPokemon(input))
            alert("Pokemon creado")
            setInput({
                name: "",
                type: [],
                life: "",
                attack: "",
                defense: "",
                velocity: "",
                height: "",
                weight: "",
                image: ""
            })
            history.push('/home')
        }

    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])



    function handleSelect(e) {
        if (input.type.length < 2) {
            setInput({
                ...input,
                type: [...input.type, e.target.value]
            })
        } else {
            alert("Solo puedes agregar 2 tipos")
        }
    }

    function handleDelete(e) {
        setInput({
            ...input,
            type: input.type.filter(type => type !== e)
        })
    }

    return (
        <div className='form-create'>
            <form  >
                {count === 1 ? (
                    <div>
                        <label>Nombre</label>
                        <input className='controls-create'
                            placeholder='Nombre'
                            type="text"
                            name="name"
                            onChange={(e) => updateInput(e)}
                            value={input.name}
                        />
                        {errors.name && (
                            <p className='errores'>{errors.name}</p>
                        )}
                    </div>
                ) : null}
                {count === 2 ? (
                    <div>
                        <label>Vida</label>
                        <input className='controls-create'

                            type="number"
                            name="life"
                            onChange={(e) => updateInput(e)}
                            value={input.life}
                        />
                        {errors.life && (
                            <p className='errores'>{errors.life}</p>
                        )}
                    </div>
                ) : null}
                {count === 3 ? (
                    <div>
                        <label>Ataque</label>
                        <input className='controls-create'
                            type="number"
                            name="attack"
                            onChange={(e) => updateInput(e)}
                            value={input.attack}
                        />
                        {errors.attack && (
                            <p className='errores'>{errors.attack}</p>
                        )}
                    </div>
                ) : null}
                {count === 4 ? (
                    <div>
                        <label>Defensa</label>
                        <input className='controls-create'
                            type="number"
                            name="defense"
                            onChange={(e) => updateInput(e)}
                            value={input.defense}
                        />
                        {errors.defense && (
                            <p className='errores'>{errors.defense}</p>
                        )}
                    </div>
                ) : null}
                {count === 5 ? (
                    <div>
                        <label>Velocidad</label>
                        <input className='controls-create'
                            type="number"
                            name="velocity"
                            onChange={(e) => updateInput(e)}
                            value={input.velocity}
                        />
                        {errors.velocity && (
                            <p className='errores'>{errors.velocity}</p>
                        )}
                    </div>
                ) : null}
                {count === 6 ? (
                    <div>
                        <label>Altura</label>
                        <input className='controls-create'
                            type="number"
                            name="height"
                            onChange={(e) => updateInput(e)}
                            value={input.height}
                        />
                        {errors.height && (
                            <p className='errores'>{errors.height}</p>
                        )}
                    </div>
                ) : null}
                {count === 7 ? (
                    <div>
                        <label>Peso</label>
                        <input className='controls-create'
                            type="number"
                            name="weight"
                            onChange={(e) => updateInput(e)}
                            value={input.weight}
                        />
                        {errors.weight && (
                            <p className='errores'>{errors.weight}</p>
                        )}
                    </div>
                ) : null}
                {count === 8 ? (
                    <div>
                        <label>Selecciona un tipo de pokemón</label>
                        <select className='selected' onChange={(e) => handleSelect(e)}>
                            {types?.map(el => { return (<option value={el.name} key={el.id}>{el.name}</option>) })}
                        </select>
                        <div>
                            {input.type.map(el =>
                                <div key={el}>
                                    <p>{el} <button onClick={() => handleDelete(el)}>x</button></p>
                                </div>)
                            }
                            {errors.type && (
                                <p className='errores'>{errors.type}</p>
                            )}

                        </div>
                    </div>
                ) : null}
                {count === 9 ? (
                    <input className="controls-create" placeholder="Imagen URL:" type="url" value={input.image} name="image" />
                ) : null}

                <div>
                    <button className='booton' onClick={(e) => handleSubmit(e)} type='submit' >Enviar</button>
                </div>

            </form>





            <div>

                <button className='booton' onClick={() => setCount(count - 1)} disabled={count < 2}>Atrás</button>
                <button className='booton' onClick={() => setCount(count + 1)} disabled={count === 9}>Siguiente</button>
                <Link to="/home"><button className='booton'>Regresar a inicio</button></Link>
            </div>
        </div>
    )
}

export default CreatePokemon2