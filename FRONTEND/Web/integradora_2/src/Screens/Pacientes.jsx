import { SearchBar } from '../Components';
import { OpcionesPaciente } from '../Components';
import { ModalPaciente } from '../Components';
import {  useState } from 'react';

const Pacientes =() => {
    const [modalAbierto, setModalAbierto] = useState(false);

    
    /*Verison con servidor
    const [pacientes, setPacientes] = useState([]);
    useEffect(() => {
        const getPacientes = async () => {
            try {
                const res = await fetch("https://8d5e-189-197-191-34.ngrok-free.app/usuarios", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Respuesta del servidor inválida: ${res.status} - ${errorText}`);
                }
                const data = await res.json();
                console.log("Pacientes desde backend:", data);
                setPacientes(data.usuarios);
            } catch (error) {
                console.error("Error al obtener pacientes:", error);
            }
        };
        getPacientes();
    }, []);*/

    return (
            <div>
                <p className='titulo'>Pacientes </p>
                <div className='buscador'>
                    <button className='btn-agregar' onClick={() => setModalAbierto(true)}>+Agregar</button>
                    {modalAbierto && <ModalPaciente onClose={() => setModalAbierto(false)} />}
                    < SearchBar />
                </div>
                    <div className='opciones'>
                    <OpcionesPaciente/>
                    </div>
            </div>
    )
}
export default Pacientes;
/* 
en consola da un error para recibir n el back 
main.ff0e15bcc3380cc32ddd.hot-update.js:49 error al obtener pacientes SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
*/