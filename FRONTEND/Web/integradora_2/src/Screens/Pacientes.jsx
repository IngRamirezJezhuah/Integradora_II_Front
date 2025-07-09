import { SearchBar } from '../Components';
import { OpcionesPaciente } from '../Components';
import { ModalPaciente } from '../Components';
import {  useState } from 'react';

const Pacientes =() => {
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
            <div>
                <p className='titulo'>Pacientes </p>
                <div className='buscador'>
                    <button className='btn-agregar' onClick={() => setModalAbierto(true)}>+Agregar</button>
                    {modalAbierto && <ModalPaciente onClose={() => setModalAbierto(false)} />}
                    < SearchBar />
                </div>
                <div className='contenedor_pedidos'>
                    <div className='opciones'>
                        <OpcionesPaciente/>
                    </div>
                </div>
            </div>
    )
}
export default Pacientes;
/* 
en consola da un error para recibir n el back 
main.ff0e15bcc3380cc32ddd.hot-update.js:49 error al obtener pacientes SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
*/