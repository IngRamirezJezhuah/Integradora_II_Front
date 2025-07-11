import { MuestrasHechas, SampleChart } from '../Components';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import { CargaBolita } from '../Components';

const Dashboard=()=> {
    const [ldrData, setLdrData] = useState(null);
    const [tempData, setTempData] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : {};
        //este es para le lDR
        axios
        .get(`${apiUrl}/ldr/esp32c3_001`, {headers})
        .then((res) => setLdrData(res.data))
        .catch((err) => {console.error('Error al obtener LDR:', err)}) 
        //Esta es para la de Temperatuea y Humedad
        axios
        .get(`${apiUrl}/tempwet/tempWetController_001`, {headers})
        .then((res) => setTempData(res.data))
        .catch((err) => {console.error('Error al obtener LDR:', err)})
        
    }, [apiUrl]);

    const getLdrStatus = (ldr) => {
        if (ldr <= 600) return { estado: 'En peligro', clase: 'div-muestra-3' }
        if (ldr <= 1500) return { estado: 'Protegida', clase: 'div-muestra-4' }
        return { estado: 'Echada a perder', clase: 'div-muestra-dañada' }
    }

    const handleEasterEgg = () => {
        Swal.fire({
            title: "Easter egg",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                left top
                no-repeat
            `
    });
    }
    if (!ldrData || !tempData) {
        return (
        <div>
            <p className='titulo'>Dashboard </p>
            <div className='contenedor_pedidos'>
                <div className='scale-in-hor-center'>
                    
                    <div className='div-graficas'>
                        <p>Temperatura del Laboratorio</p>
                        <p>25% c</p>
                        <div className='div-grafica'>
                            
                                <CargaBolita/>  
                        </div>
                    </div>
                    <div className='div-graficas'>
                        <p>Humedad del Laboratorio</p>
                        <p>25% c</p>
                        <div className='div-grafica'>
                            <CargaBolita/>  
                        </div>
                    </div>
                </div>
                <div className='scale-up-center'>
                    <div onClick={handleEasterEgg}>

                        <div className='div-muestra'>
                            <p className='centrar'>Pedidos Pendientes</p>
                            <br /><br />
                        <CargaBolita/> 
                        </div>
                    </div>
                    <div className='div-muestra-2'>
                        <p className='centrar'>muestras en preocesamiento</p>
                        <br /><br />
                        <CargaBolita/> 
                    </div>
                    <div className='div-muestra-3'>
                        <p className='centrar'>Contenedor esp32c3_001</p>
                        <br /><br />
                        <CargaBolita/>  
                    </div>
                </div>
            </div>
    </div>
    )
    }
    const status = getLdrStatus(ldrData.ldr)
    return (
    <div>
        <p className='titulo'>Dashboard </p>
        <div className='margen'>
            <div>
                <div className='div-graficas'>
                    <p>Temperatura del Laboratorio</p>
                    <p>{tempData.dht11_temp}°C</p>
                    <div className='div-grafica'>
                        < MuestrasHechas tempData={tempData}/>
                    </div>
                </div>
                <div className='div-graficas'>
                    <p>Humedad del Laboratorio</p>
                    <p>{tempData.dht11_hum}%</p>
                    <div className='div-grafica'>
                        <SampleChart tempData={tempData}/>
                    </div>
                </div>
            </div>
            <div>
                <div onClick={handleEasterEgg}>
                    <div className='div-muestra'>
                        <p className='centrar'>Pedidos Pendientes</p>
                        <p className='texto-dash'>12</p>
                    </div>
                </div>
                <div className='div-muestra-2'>
                    <p className='centrar'>muestras en preocesamiento</p>
                    <p className='texto-dash'>15</p>
                </div>
                <div className={status.clase}>
                    <p className='centrar'>Contenedor {ldrData.id}</p>
                    <p className='centrar'>{status.estado}</p>
                    <p className='texto-dash'>LDR:{ldrData.ldr}</p>
                </div>
            </div>
        </div>
    </div>
    )
}   

export default Dashboard;
