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
    return (
    <div>
        <h1>Dashboard </h1>
        <div className='margen'>
            <div>
                <div className='div-graficas'>
                    <h2>Temperatura del Laboratorio</h2>
                    <p>25% c</p>
                    <div className='div-grafica'>
                        < MuestrasHechas/>
                    </div>
                </div>
                <div className='div-graficas'>
                    <h2>Humedad del Laboratorio</h2>
                    <p>25% c</p>
                    <div className='div-grafica'>
                        <SampleChart/>
                    </div>
                </div>
            </div>
            <div>
            <div className='div-muestra'>
                <h2 className='centrar'>Pedidos Pendientes</h2>
                <h1 className='centrar'>12</h1>
            </div>
            <div className='div-muestra-2'>
                <h2 className='centrar'>muestras en preocesamiento</h2>
                <h1 className='centrar'>15</h1>
            </div>
                <div className={status.clase}>
                    <h2 className='centrar'>Contenedor esp32c3_001{ldrData.id}</h2>
                    <h1 className='centrar'>{status.estado}</h1>
                    <h4 className='centrar'>LDR:{ldrData.ldr}</h4>
                </div>
            </div>
        </div>
    </div>
    )
}   

export default Dashboard;

/*
<div className='div-muestra-3'>
                <h2 className='centrar'>contenedor #id</h2>
                <h1 className='centrar'>precaucion</h1>
            </div>
            <div className='div-muestra-4'>
                <h2 className='centrar'>contenedor #id</h2>
                <h1 className='centrar'>muestra protegida</h1>
            </div>
*/