import React from 'react'
import { FilterBar, SampleBox, SampleModal, SearchBar } from '../Components';
import { Link } from 'react-router-dom';

//import {SearchBar, FilterBar, SampleBoxes} from "../Components";
//import './elementos.css';

const Muestras =() =>{
    return (
        <div>
            <h1>Muestras</h1>
            <div className='buscador'>
                <Link to="/AgregarMuestras">
                        <button className='btn-agregar'>+Agregar</button>
                </Link>
                <SearchBar />
            </div>
            <div className='margen'>
                <div className='Box-muestras'>
                    <FilterBar/>
                    <div className='caja_1'>
                        <SampleModal/>
                        <SampleBox/>
                    </div>
                </div>
                <div className='scale-up-ver-center'>
                <div className='pedidos-form'>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Muestras;