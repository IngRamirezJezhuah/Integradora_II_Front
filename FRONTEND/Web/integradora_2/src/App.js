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
import Login from './Screens/Login.jsx';
import Recuperacion from './Screens/Recuperacion.jsx';
import Dashboard from './Screens/Dashboard.jsx';
import Pacientes from './Screens/Pacientes.jsx';
import  Muestras  from './Screens/Muestras.jsx';
import Pedidos from './Screens/Pedidos.jsx';
import Analisis from './Screens/Analisis.jsx';
//import { AgregarMuestra, EditarAnalisisForm, NuevoAnalisisForm, NuevoPaciente, RegistrarPaceinte, SampleBox, SampleModal } from './Components/index.js';
import { AgregarMuestra, EditarAnalisisForm, NuevoAnalisisForm, NuevoPaciente, RegistrarPaceinte, SampleBox, SampleModal } from './Components/index.ts';
//import AgregarMuestra from './Components/muestras/AgregarMuestra.jsx';
//import NuevoAnalisisForm from './Screens/NuevoAnalisis.jsx';


function App() {
  return (
    <Router>
      <Routes>
        {/* Layout principal
        <Route path="/login" element={<Login />}>
        
        Páginas que usan ese layout
        <Route path='/Nuevo-Analisis' element={<NuevoAnalisisForm/>} />
        <Route path='/Agregar-muestra' element={<AgregarMuestra />}/>
        */}
        
        <Route path="/Recuperacion" element={<Recuperacion />} />
        <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Component /> } >
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Pacientes" element={<Pacientes />} />
          <Route path='/Registrar-paciente' element={<RegistrarPaceinte />} />
          
          <Route path="/Pedidos" element={<Pedidos />} />
          
          <Route path="/Muestras" element={<Muestras />} />
          <Route path='/AgregarMuestras' element={<AgregarMuestra/>} />
          
          <Route path='/Analisis' element={<Analisis />} />
          <Route path='/Nuevo-Analisis' element={<NuevoAnalisisForm/>} />
          <Route path='/Editar-Analisis' element={<EditarAnalisisForm/>} />
          
          <Route path='/SampleBox' element={<SampleBox/>}/>
          <Route path='/SampleModal' element={<SampleModal/>}/>
          <Route path='/Nuevo-Paciente-Form' element={<NuevoPaciente/>}/>
          
          {/**/}
          </Route>
        {/*</Route> */}
      </Routes>
    </Router>
  );
}

export default App;