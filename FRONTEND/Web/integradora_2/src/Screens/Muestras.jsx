import React, {useState}from 'react'
import { SearchBar } from '../Components';

import ModalMuestras from '../Components/muestras/ModalMuestras';
import { OpcionesMuestras } from '../Components';


//import {SearchBar, FilterBar, SampleBoxes} from "../Components";
//import './elementos.css';

const Muestras =() =>{
    const [modalAbierto, setModalAbierto] = useState(false);
    
    return (
        <div>
            <p className='titulo'>Muestras</p>
            <div className='buscador'>
                <button className='btn-agregar'  onClick={() => setModalAbierto(true)}>+Agregar</button>
                {modalAbierto && <ModalMuestras onClose={() => setModalAbierto(false)} />}
                <SearchBar />
            </div>
            <div className='contenedor_pedidos'>
                <div className='opciones'>
                    <OpcionesMuestras />
                </div>
            </div>
        </div>
    )
}

export default Muestras;
//    <SampleModal/>
//    <SampleBox/>
/*
<div>
                <div className='contenedor_pedidos'>
                    <div className='margen'>
                        <div className='Box-muestras'>
                            <div className='scale-up-ver-center'>
                            <ListaMuestras />
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div> */