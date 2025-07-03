//rafc para hacer una plantilla rapida
import { useState } from 'react'
import { SearchBar } from '../Components';
import { OpcionesPedidos } from '../Components';
import { ModalPedidos } from '../Components';
//import Component from './Component'
//import { Outlet } from 'react-router-dom'


const Pedidos =() => {
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <div>
            <p className='titulo'>Pedidos </p>
            <div className='buscador'>
                <button className='btn-agregar'  onClick={() => setModalAbierto(true)}>+Agregar</button>
                {modalAbierto && <ModalPedidos onClose={() => setModalAbierto(false)} />}
                <SearchBar />
            </div>
            <div className='opciones'>
                    <OpcionesPedidos/>
            </div>
        </div>
    )
}

export default Pedidos;