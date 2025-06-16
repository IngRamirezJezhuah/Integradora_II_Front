import React from 'react'
import {SearchBar, FilterBar, SampleBoxes} from "../Components";
import './elementos.css';

const Muestras =() =>{
    return (
        <div className='margen'>
            <SearchBar placeholder="Buscar Muestra" />
            <button onClick={'/agregarMuestra'}>Agregar</button>
            <FilterBar buttonLabels={['En proceso', 'Completadas']} />
            <div className='Box-muestras'>
                <SampleBoxes/>
            </div>
        </div>
    )
}

export default Muestras;