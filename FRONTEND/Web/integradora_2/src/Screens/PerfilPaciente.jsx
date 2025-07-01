import React from 'react'
import { SearchBar } from '../Components'
import { Link } from 'react-router-dom'

const PerfilPaciente = () => {
    return (
        <div>
            <SearchBar/>
            <Link to='/login'>
                <div>
                    <img src="/salida.png" alt="" />
                </div>
            </Link>
            <h1>perfil</h1>
            <p>Mario ALberto Lira Zamora</p>
            <p>09/12/2004</p>
            <p>mario_3141230104@utd.edu.mx</p>
            <button className='btn'>Editar</button>
        </div>
    )
}

export default PerfilPaciente