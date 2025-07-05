//rafc para hacer una plantilla rapida
import React from 'react'
import { MuestrasHechas, SampleChart } from '../Components';
import { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard=()=> {
    

    const [ldrData, setLdrData] = useState(null)
    useEffect(() => {
        axios
        .get('https://bb1f-189-197-191-34.ngrok-free.app/ldr/esp32c3_001')
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
        return (
        <div>
            <p className='titulo'>Dashboard </p>
            <div className='contenedor_pedidos'>
                <div>
                    <div className='div-graficas'>
                        <p>Temperatura del Laboratorio</p>
                        <p>25% c</p>
                        <div className='div-grafica'>
                            
                            <div class="cargando">
                                <div class="pelotas"></div>
                                <div class="pelotas"></div>
                                <div class="pelotas"></div>
                                <span class="texto-cargando">Cargando...</span>
                            </div>
                            
                        </div>
                    </div>
                    <div className='div-graficas'>
                        <p>Humedad del Laboratorio</p>
                        <p>25% c</p>
                        <div className='div-grafica'>
                            <div class="cargando">
                                <div class="pelotas"></div>
                                <div class="pelotas"></div>
                                <div class="pelotas"></div>
                                <span class="texto-cargando">Cargando...</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='div-muestra'>
                        <p className='centrar'>Pedidos Pendientes</p>
                        
                    </div>
                    <div className='div-muestra-2'>
                        <p className='centrar'>muestras en preocesamiento</p>
                    </div>
                    <div className='div-muestra-3'>
                        <p className='centrar'>Contenedor esp32c3_001</p>
                        <br /><br />
                        <div class="cargando">
                            <div class="pelotas"></div>
                            <div class="pelotas"></div>
                            <div class="pelotas"></div>
                            <span class="texto-cargando">Cargando...</span>
                        </div>
                    </div>
                </div>
            </div>
    </div>
        
    )
    }

    const status = getLdrStatus(ldrData.ldr)
    /*
    */
    return (
    <div>
        <p className='titulo'>Dashboard </p>
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
                    <p className='texto-dash'>12</p>
                </div>
                <div className='div-muestra-2'>
                    <p className='centrar'>muestras en preocesamiento</p>
                    <p className='texto-dash'>15</p>
                </div>
                <div className={status.clase}>
                    <p className='centrar'>Contenedor esp32c3_001{ldrData.id}</p>
                    <p className='centrar'>{status.estado}</p>
                    <p className='texto-dash'>LDR:{ldrData.ldrMax}</p>
                    <p className='texto-dash'>LDR:{ldrData.getLdrMin}</p>
                </div>
            </div>
        </div>
    </div>
    )
}   

export default Dashboard;
