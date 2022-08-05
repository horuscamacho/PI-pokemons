import React from 'react'
import { useSelector } from 'react-redux'

const Types = (filterPokemonsByType) => {

const functionFilter = filterPokemonsByType.filterPokemonsByType
const types = useSelector((state) => state.types)

return (

    <select onChange={(e) => functionFilter(e)} className="selected">
            <option value={"-"}>Tipo</option>
            {
                types?.map((t) => {
                    return (
                        <option value={t.name} key={t.id + t.name}>{t.name}</option>
                    )
                })
            }
    </select>
  )
}

export default Types