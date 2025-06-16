import React from 'react'; 
import { Link } from 'react-router-dom';

const SampleBox = ({ id, type, name, technician }) => {
  const getIcon = () => {
    switch (type.toLowerCase()) {
      case 'biometria hematica':
        return  './bioHem.png'; // Icono para Biometría Hemática
      case 'quimica sanguinea':
        return './quimica.png';
      default:
        return './bioHem.png'; // Valor por defecto
    }
  };

  return (
    <div className="sample-box">
      <img src={getIcon()} alt={`${type} icon`} className="sample-icon" />
      <div className="sample-info">
        <h3>{id}</h3>
        <p>{type}</p>
        <p>{technician}</p>
      </div>
      <div className="sample-actions">  
        <button className="action-btn"><Link to="/Detalles:{id}" ></Link><img src="./icons/edit.png" alt="Edit" /></button>
        <button className="action-btn"><img src="./icons/refresh.png" alt="Refresh" /></button>
        <button className="action-btn"><img src="./icons/view.png" alt="View" /></button>
        <button className="action-btn"><img src="./icons/delete.png" alt="Delete" /></button>
      </div>
    </div>
  );
};

const SampleBoxes = ({ samples }) => {
  return (
    <div className="sample-boxes">
      {samples.map((sample, index) => (
        <SampleBox
          key={index}
          id={sample.id}
          type={sample.type}
          technician={sample.technician}
        />
      ))}
    </div>
  );
};

export default SampleBoxes;