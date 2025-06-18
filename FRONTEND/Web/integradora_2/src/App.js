// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles.css';
import './Dash.css'
import './plantilla.css'
import './elementos.css'
import './nav.css'
import './FormLg.css';

import Component from './Screens/Component.jsx';
//import Recuperacion from './Screens/Recuperacion.jsx';
import Dashboard from './Screens/Dashboard.jsx';
import Pacientes from './Screens/Pacientes.jsx';
import  Muestras  from './Screens/Muestras.jsx';
//import Login from './Screens/Login.jsx';
import Pedidos from './Screens/Pedidos.jsx';
import Analisis from './Screens/Analisis.jsx';
import { RegistrarPaceinte, SampleBox } from './Components/index.js';
//import AgregarMuestra from './Components/muestras/AgregarMuestra.jsx';
//import NuevoAnalisisForm from './Screens/NuevoAnalisis.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* Layout principal
        <Route path="/login" element={<Login />}>

          Páginas que usan ese layout
        <Route path="/Login" element={<Login />} />
        <Route path="/Recuperacion" element={<Recuperacion />} />
        <Route path='/Nuevo-Analisis' element={<NuevoAnalisisForm/>} />
        <Route path='/Agregar-muestra' element={<AgregarMuestra />}/>
        */}
          <Route path="/" element={<Component />} >
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Pacientes" element={<Pacientes />} />
          <Route path="/Pedidos" element={<Pedidos />} />
          <Route path="/Muestras" element={<Muestras />} />
          <Route path='/Analisis' element={<Analisis />} />
          <Route path='/Registrar-paciente' element={<RegistrarPaceinte />} />
          
          <Route path='/SampleBox' element={<SampleBox/>}/>
          
          
          </Route>
        {/*</Route>*/}
      </Routes>
    </Router>
  );
}

export default App;