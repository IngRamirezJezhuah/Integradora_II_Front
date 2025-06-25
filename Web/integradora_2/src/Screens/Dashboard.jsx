//rafc para hacer una plantilla rapida
import React from 'react'
import { MuestrasHechas, SampleChart } from '../Components';
import { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard=()=> {
    

    const [ldrData, setLdrData] = useState(null)
    useEffect(() => {
        axios
        .get('https://8d5e-189-197-191-34.ngrok-free.app/ldr/esp32c3_001')
        .then((res) => {
            setLdrData(res.data)
        })
        .catch((err) => {
            console.error('Error al obtener datos:', err)
        }) 
    }, [])

    const getLdrStatus = (ldr) => {
        if (ldr <= 600) return { estado: 'En peligro', clase: 'div-muestra-3' }
        if (ldr <= 1500) return { estado: 'Protegida', clase: 'div-muestra-4' }
        return { estado: 'Echada a perder', clase: 'div-muestra-dañada' }
    }

    if (!ldrData) {
        return <p>Cargando datos del sensor...</p>
    }

    const status = getLdrStatus(ldrData.ldr)
    /*
    */
    return (
    <div>
        <h1>Dashboard </h1>
        <div className='margen'>
            <div>
                <div className='div-graficas'>
                    <p>Temperatura del Laboratorio</p>
                    <p>25% c</p>
                    <div className='div-grafica'>
                        < MuestrasHechas/>
                    </div>
                </div>
                <div className='div-graficas'>
                    <p>Humedad del Laboratorio</p>
                    <p>25% c</p>
                    <div className='div-grafica'>
                        <SampleChart/>
                    </div>
                </div>
            </div>
            <div>
            <div className='div-muestra'>
                <p className='centrar'>Pedidos Pendientes</p>
                <p className='titulo'>12</p>
            </div>
            <div className='div-muestra-2'>
                <p className='centrar'>muestras en preocesamiento</p>
                <p className='titulo'>15</p>
            </div>
                <div className={status.clase}>
                    <p className='centrar'>Contenedor esp32c3_001{ldrData.id}</p>
                    <p className='centrar'>{status.estado}</p>
                    <p className='titulo'>LDR:{ldrData.ldrMax}</p>
                    <p className='titulo'>LDR:{ldrData.getLdrMin}</p>
                </div>
            </div>
        </div>
    </div>
    )
}   

export default Dashboard;
