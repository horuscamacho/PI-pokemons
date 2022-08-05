import React from "react";


export default function Type({type}){
   if(type.length === 1){
    return (
        <span className="pokemon-type-electric">{type[0]}</span>
    )
   }
   if(type.length === 2){
    return (
        <>
        <span className="pokemon-type-electric">{type[0]}  {type[1]}</span>
        </>
    )
   }
} 