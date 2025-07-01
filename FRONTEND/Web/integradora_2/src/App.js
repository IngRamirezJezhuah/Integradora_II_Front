// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*__________Estiloss__________*/
import './Themes/App.css';import './Themes/styles.css';
import './Themes/Dash.css';import './Themes/plantilla.css';
import './Themes/elementos.css';import './Themes/nav.css';
import './Themes/FormLg.css';import './Themes/loginPage.css';
import './Themes/imagenes-estilos.css';import './Themes/modal.css';
import './Themes/textos.css';import './Themes/Animaciones.css';


/*__________Componentes__________*/
import Component from './Screens/Component.jsx';
import Login from './Screens/Login.jsx';
import Recuperacion from './Screens/Recuperacion.jsx';
import Dashboard from './Screens/Dashboard.jsx';
import Pacientes from './Screens/Pacientes.jsx';
import  Muestras  from './Screens/Muestras.jsx';
import Pedidos from './Screens/Pedidos.jsx';
import Analisis from './Screens/Analisis.jsx';
import { AgregarMuestra, EditarAnalisisForm, NuevoAnalisisForm, NuevoPaciente, RegistrarPaceinte, SampleBox, SampleModal } from './Components/index.ts';
import { ReciboPedidos } from './Components/index.js';
import PerfilPaciente from './Screens/PerfilPaciente.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Recuperacion" element={<Recuperacion />} />
        <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Component /> } >
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Pacientes" element={<Pacientes />} />
            <Route path='/EditarInfoPaciente' element={<RegistrarPaceinte />} />
            
            <Route path="/Pedidos" element={<Pedidos />} />
            <Route path="/RecibosPedidos" element={<ReciboPedidos/>} />
            
            <Route path="/Muestras" element={<Muestras />} />
            <Route path='/AgregarMuestras' element={<AgregarMuestra/>} />
            
            <Route path='/Analisis' element={<Analisis />} />
            <Route path='/Nuevo-Analisis' element={<NuevoAnalisisForm/>} />
            <Route path='/Editar-Analisis' element={<EditarAnalisisForm/>} />
            
            <Route path='/SampleBox' element={<SampleBox/>}/>
            <Route path='/SampleModal' element={<SampleModal/>}/>
            <Route path='/Nuevo-Paciente-Form' element={<NuevoPaciente/>}/>
            <Route path='/Perfil' element={<PerfilPaciente/>}/>
          </Route>
      </Routes>
    </Router>
  );
}
//
export default App;