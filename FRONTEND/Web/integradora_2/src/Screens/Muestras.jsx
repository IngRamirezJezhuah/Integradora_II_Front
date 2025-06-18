import React from 'react'
import { FilterBar, SearchBar } from '../Components';
import { Link } from 'react-router-dom';

//import {SearchBar, FilterBar, SampleBoxes} from "../Components";
//import './elementos.css';

const Muestras =() =>{
    return (
        <div className='margen'>
            {/*
            
            <SearchBar placeholder="Buscar Muestra" />
            <button onClick={'/agregarMuestra'}>Agregar</button>
            <FilterBar buttonLabels={['En proceso', 'Completadas']} />
            <div className='Box-muestras'>
                <SampleBoxes/>
            </div>
            */}
            <div className='buscador'>
                < SearchBar />
                <Link to="/Agregar-muestra">
                <button className='btn-agregar'>+Agregar</button>
                </Link>
            </div>
            <FilterBar/>
            <div className='Box-muestras'>

            </div>
        </div>
    )
}

export default Muestras;