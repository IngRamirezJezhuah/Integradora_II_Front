import React from 'react'
import { Link } from 'react-router-dom';
import { SearchBar } from '../Components';

const Analisis=()=> {
    const Pruebas= [
        "Quimica Sanguinea",
        "BIometrica Hepatica"
    ]
    return (
        <div className='margen'>
            <div className='buscador'>
                <Link to='/Nuevo-Analisis'>
                <button className='btn-agregar'>+Agregar</button>
                </Link>
                <SearchBar/>
            </div>
            <div className='scale-up-ver-center'>
                <div className='caja_1'>
                    <h1 className='titulo'>Pruebas</h1>
                    
                        {/*
                        
                        <img src="/prueba-de-sangre.png" alt="prueba imagen" className='imagen-prueba' />
                        <p className='prueba-name'>Quimica Sangiunea</p>
                        <div  className='acomodar-iconos'>
                            <img src="/basura.png" alt="Borrar" className='iconos' />
                        </div>
                        <div className='acomodar-iconos-2'>
                            <Link to='/Editar-Analisis'>
                            <img src="/ajustes.png" alt="ajustes" className='iconos' />
                            </Link>
                        </div>
                        */}
                        {Pruebas.map((prueba,index) => (
                            <div key={index} className='prueba_tabla'>
                                <div className='icono'>
                                    <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                                </div>
                                <p className='prueba-name'>{prueba}</p>
                                <div className='acomodar-iconos'>
                                    <img src="/sobre-mas.png" alt="editar" className='iconos' />
                                </div>
                                <div className='acomodar-iconos-2'>
                                <Link to='/Editar-Analisis'>
                                <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            </div>
                        ))}
                    <div className='prueba_tabla'>
                    </div>
                    <hr />
                </div>
            </div>
            <div className='scale-up-ver-center'>
            <div className='caja_2'>
                <h1 className='titulo'>Detalles</h1>
                <p className='detall-tex'>Quimica sanguinea</p>
                <h2 className='prueba-name'>Titulo</h2>
                <p className='detall-tex'>305.00$ pesos</p>
                <h2 className='prueba-name'>Costos</h2>
                <p className='detall-tex'>5 dias</p>
                <h2 className='prueba-name'>Dias de espera</h2>
                <h2 className='prueba-name'>Descripcion</h2>
                <text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita facilis fugit inventore laborum suscipit architecto ullam ab vero et quisquam labore magni nobis aspernatur molestias ipsam, dignissimos perspiciatis temporibus soluta.
                Suscipit quo corrupti illum a sed quas eius incidunt corporis at soluta totam, amet modi qui libero odio voluptatem nihil debitis, obcaecati ab minus animi illo eos! Mollitia, rem quod.
                Nisi quae veritatis inventore sapiente harum porro at odit quis repudiandae enim, sit nostrum facere ea eveniet et magni aspernatur veniam? Reprehenderit eligendi porro ratione earum dignissimos iure repellat necessitatibus.
                Totam minima culpa alias quisquam suscipit hic reiciendis eos, ullam obcaecati optio tempora sequi aperiam vero. Expedita ea aut voluptatum molestiae beatae dolores, illo eum eveniet ex est, porro nesciunt?
                Blanditiis nulla ex, maxime perferendis dolore voluptas nisi asperiores ratione quos ipsum repellendus ut pariatur. Adipisci delectus blanditiis error quibusdam voluptas, hic, tempore deleniti deserunt ullam esse sunt ipsam aliquid!
                </text>
            </div>
            </div>
        </div>
    )
}

export default Analisis;
