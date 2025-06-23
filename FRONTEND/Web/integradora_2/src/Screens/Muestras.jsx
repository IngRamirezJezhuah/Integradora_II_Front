import React from 'react'
import { FilterBar, SampleBox, SampleModal, SearchBar } from '../Components';
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

            <div className='caja_1'>
                <SampleModal/>
                <SampleBox/>
            </div>
            */}
            <div className='buscador'>
                <Link to="/AgregarMuestras">
                        <button className='btn-agregar'>+Agregar</button>
                </Link>
                <SearchBar />
            </div>
            <div className='Box-muestras'>
                <FilterBar/>
                <div className='caja_1'>
                <SampleModal/>
                <SampleBox/>
            </div>
            </div>
        </div>
    )
}

export default Muestras;