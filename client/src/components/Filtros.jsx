import Types from './Types'
import '../css/select.css'

const Filtros = ({filtros}) => {
  
  const handleSort = filtros.handleSort
  const filterPokemonsByType = filtros.handleFilteredByType
  const handleFilteredByCreated = filtros.handleFilteredByCreated

  


  // const handled = handleSort.handleSort
  // console.log(handled)


  
  return (
    <div>
    
          
       
        <select onChange={(e) => handleSort(e)} className="selected">
            <option value={"-"}>Nombre/Fuerza</option>
            <option value={'AZ'}>A-Z</option>
            <option value={'ZA'}>Z-A</option>
            <option value={'strong'}>Más fuerza</option>
            <option value={'weak'}>Menos fuerza</option>
        </select>
        <select onChange={(e) => handleFilteredByCreated(e)} className="selected">
            <option value={"-"}>Creados/Originales</option>
            <option value={'original'}>Originales</option>
            <option value={'created'}>Creados</option>
        </select>
        <Types filterPokemonsByType={filterPokemonsByType} />
    </div>
  )
}

export default Filtros


//