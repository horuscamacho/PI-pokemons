import React from 'react'
import Type from './Home/Type'



const Card = ({ id, name, type, image, createdInDB }) => {

   
        
        return (
            <div className="tarjetas" key={id}>
                <div className={`pokemon-card-container-${type[0]} textoTipo`}>
                    <div className={`pokemon-card-${type[0]}`}>
                        <div className={`background-${type[0]}`}>
                            <img className="image-fire" src={image} alt={`${name}.jpg`} />
                        </div>
                        <div className={`content-${type[0]} textName`}>
                            
                            <Type type={type} />
                            <div className={`pokemon-stats-${type[0]}`}>
                            </div>
                            <h1 className={`pokemon-name-${type[0]} textName`}>{name}</h1>
                        </div>
                    </div>
                </div>
    
            </div>
        )
    }




    


export default Card